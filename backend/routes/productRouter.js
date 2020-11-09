import express from "express";
import Product from '../models/productModels.js'
import { isAdmin, isAuth } from "../util.js";
import path from "path"
import multer from "multer"
import File from "../models/fileModels.js"
import { AsyncLocalStorage } from "async_hooks";

const Router = express.Router();

console.log("nigga")

const storage = multer.diskStorage({
  destination: "./public/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
console.log("nigga")


const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("image");

console.log(upload)

Router.post('/create-product', isAuth, isAdmin, async (req, res) => {
  try{
  
  var filePath='';  
 
  console.log("nigga")


  await upload(req, res, async () => {
    console.log("nigga")

     console.log("Request ---", req.body.name);
     console.log("Request file ---", req.file);//Here you get file.
     const file = new File();
     file.meta_data = req.file;
     filePath = req.file.path
     file.save(); 
     console.log("nigga")

  console.log(filePath)

  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    image: filePath,
    brand: req.body.brand,
    category: req.body.category,
    availableQty: req.body.availableQty,
    description: req.body.description,
  })
  const savedProduct = await newProduct.save();
        if(savedProduct)
            return res.status(200).send({message: 'New Product Created Successfully', body: savedProduct})
        throw error;
  })


  

}
catch (error) {
  console.error(error);
}
    // try{
    //     const savedProduct = await newProduct.save();
    //     if(savedProduct)
    //         return res.status(200).send({message: 'New Product Created Successfully', body: savedProduct})
    //     throw error;
    // } catch (error) {
    //     return res.status(500).send({message: 'Error in Creating Product'})
    // }
})

Router.put('/update-qty/:updatedProduct_id', async (req, res) => {
  try {
    console.log("hi this is update qty")
    console.log(req.params.updatedProduct_id)
    console.log(req.body)   // console.log("Hi")

    var product = await Product.findById(req.params.updatedProduct_id);
    // console.log("Hi")

    if(product) {
        product.availableQty = req.body.updatedQty
        console.log(product)
    } else {
        // console.log("Hi")
        return res.status(404).status({message: 'Product Not Found'})
    }        

    const editedProduct = await product.save()
    console.log(editedProduct)
    if(editedProduct) 
        return res.status(200).send({message: 'Product Edited Successfully', body: editedProduct})
    return res.status(500).send({message: "Couldn't Save the Product"})
  } catch (error) {
    console.log(error)
    return res.status(500).send({message: "Product couldn't be updated"})
  }
})

Router.put('/:id', isAuth, isAdmin, async (req, res) => {

    const productId = req.params.id;

        console.log("iiiiiiii")

    try{
        // console.log("Hi")

        const product = await Product.findById(productId);
        // console.log("Hi")

        if(product) {
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.availableQty = req.body.availableQty;
            product.description = req.body.description;
        } else {
            // console.log("Hi")

            return res.status(404).status({message: 'Product Not Found'})
        }        

        const editedProduct = await product.save()
        console.log(editedProduct)
        if(editedProduct) 
            return res.status(200).send({message: 'Product Edited Successfully', body: editedProduct})
        return res.status(500).send({message: "Couldn't Save the Product"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Product couldn't be updated"})
    }


}) 

Router.get('/', async (req, res) => {
    try{
        console.log("I m here get all products")
        const products = await Product.find({});
        if (products)
            return res.send(products)
        return res.status(404).send({message: 'Products Not Found'})
    } catch (error) {
        return res.status(404).send({message: 'Error Retreiving Products'})
    }
})

Router.get('/:_id', async (req, res) => {
    try {
        let product_id = req.params._id;

        console.log(product_id)

        let product = await Product.findOne({_id: product_id}) 
        
        if(product)        
        {
            res.send(product);
            return console.log("sent")
        }        
        else
            return res.status(404).send({message: "Product Not Found"});
    } catch (error) {
        console.log('is it error')
        return res.status(404).send({message: 'Error Retreiving Product'})
    }
})

Router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const productID = req.params.id;
    try {
        const deletedProduct = await Product.findById(productID);
        if(deletedProduct) {
            deletedProduct.remove();
            return res.send({message: 'Product Deleted Successfully'})
        }
    return res.status(404).send({message: 'Product Not Found'})                  
    } catch (error) {
        return res.status(500).send({message: "Couldn't Delete Product"})
    }
})





export default Router;