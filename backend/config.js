import dotenv from 'dotenv'

dotenv.config()

export default {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://ecommerce:qj4vpfalzKHE5eRB@cluster0.duwoq.mongodb.net/ecommerceDB?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'standard secret',
    PORT: process.env.PORT || 5000
}