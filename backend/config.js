import dotenv from 'dotenv'
import path from 'path';



dotenv.config({ path: path.resolve('./backend/.env')}) 

export default {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/ecommerce',
    JWT_SECRET: process.env.JWT_SECRET || 'standard secret',
    PORT: process.env.PORT 
}