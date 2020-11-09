import mongoose from 'mongoose'

const orderedProductsSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: String, required: true},
    qty: {type: String, required: true}
})

const deliveryDetailsSchema = new mongoose.Schema({
    address: {
        streetAddress: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
    },
    mobileNum: {type: Number, required: true},
    isDelivered: {type: Boolean, required: true, default: false},
    deliveryDate: {type: Date}
})

const paymentDetailsSchema = new mongoose.Schema({
    paymentMethod: {type: String, required: true},
    isPaid: {type: Boolean, required: true, default: false},
    paymentDate: {type: Date}
})

const chargesSchema =  new mongoose.Schema({
    itemsPrice: {type: Number, required: true},
    deliveryCharges: {type: Number, required: true},
    totalCharges: {type: Number, required: true},
})

const orderSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    orderedProducts: [orderedProductsSchema],
    deliveryDetails: deliveryDetailsSchema,
    paymentDetails: paymentDetailsSchema,
    charges: chargesSchema,
},{
    timestamps: true
})

const orderModel = mongoose.model('orders', orderSchema);

export default orderModel;