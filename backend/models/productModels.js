import mongoose from 'mongoose'


const reviewSchema = new mongoose.Schema({
    nameOfReviewer: {type: String, required: true},
    rating: {type: String, required: true, default: 0},
    reviewBody: {type: String, required: false}
},
{
    timestamps: true
})

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number, required: true, default: 0},
    category: {type: String, required: true},
    availableQty: {type: Number, required: true, default: 0},
    description: {type: String, required: true},
    rating: {type: Number, required: true, default: 0},
    noReviews: {type: Number, required: true, default: 0},
    reviews: [reviewSchema]
})

const productModel = mongoose.model("products", productSchema)

export default productModel;