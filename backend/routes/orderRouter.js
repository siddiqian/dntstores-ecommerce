import express from 'express'
import Order from '../models/orderModels.js'
import Product from '../models/productModels.js'
import { isAdmin, isAuth } from '../util.js';

const Router = express.Router();




Router.post('/create-order', isAuth, async (req, res) => {

    console.log(req.body.orderedProducts)
    console.log("HiHihIHIHIHIHIHIHIHI")
    console.log(req.user)
    const orderedProducts = req.body.orderedProducts; 
    try{    
        const newOrder = new Order({
            user_id: req.user.id,
            orderedProducts: req.body.orderedProducts,
            deliveryDetails: req.body.deliveryDetails,
            paymentDetails: {
                paymentMethod: req.body.paymentMethod 
            },
            charges: req.body.charges
            // charges: {
            //     itemsPrice: req.body.charges.itemsPrice,
            //     deliveryCharges: req.body.charges.deliveryCharges,
            //     totalCharges: req.body.charges.totalCharges
            // }
        })

        orderedProducts.forEach(async orderedProduct => {
          console.log("From here")
          console.log(orderedProduct.product_id)
          const productToBeUpdated = await Product.findById(orderedProduct.product_id)
          console.log(productToBeUpdated)
          if (productToBeUpdated) {
            productToBeUpdated.availableQty = productToBeUpdated.availableQty - orderedProduct.qty
          }
          const updatedProduct = await productToBeUpdated.save();
          if (!updatedProduct)
            throw new Error('Error in updating qty')
        })


        const savedOrder = await newOrder.save();

        if (savedOrder)
            return res.status(200).send({message: 'Product Saved Successully', body: savedOrder})
        throw error;
        } catch (error) {
            console.log(error)
            return res.status(501).send({message: "Error in creating new order"})
        }
})

Router.get('/my-orders', isAuth, async (req, res) => {
    try{
        console.log(req.user)
        console.log("my orders")

        const subject_id = req.user.id;
        const orders = await Order.find({user_id: subject_id})
        console.log(orders)
        if(orders)
            return res.status(200).send(orders)
        return res.status(404).send({message: "No Orders Found"})
    } catch (error) {
        console.log("my orders")

        return res.status(500).send({message: "Error in fetching orders from server"})
    }

})

Router.get('/all-orders', isAuth, isAdmin, async (req, res) => {
  try{
      console.log(req.user)
      console.log("my orders")

      const subject_id = req.user.id;
      const orders = await Order.find({})
      console.log(orders)
      if(orders)
          return res.status(200).send(orders)
      return res.status(404).send({message: "No Orders Found"})
  } catch (error) {
      console.log("my orders")

      return res.status(500).send({message: "Error in fetching orders from server"})
  }

})


Router.get('/:orderID', isAuth, async (req, res) => {
    try{
        const orderID = req.params.orderID;
        const userID = req.user.id;

        const order = await Order.findOne({_id: orderID, userID})
        console.log(order)
        if(order)
            return res.status(200).send({message: "Order Found", body: order})
        return res.status(404).send({message: "Order Not Found"})
    } catch (error) {
        return res.status(500).send({message: "Error in Fetching Order"})
    }
    
})

export default Router