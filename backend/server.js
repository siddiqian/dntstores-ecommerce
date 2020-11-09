import express from 'express'
import data from './data.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import orderRouter from './routes/orderRouter.js'
import bodyParser from 'body-parser'
import productModel from './models/productModels.js';
import path from 'path';
const __dirname = path.resolve();
const publicDir = path.join(__dirname, 'public')
const frontendDir = path.join(__dirname, '/frontend/build')
console.log(__dirname)
console.log(frontendDir)


// dotenv.config();

// console.log(config.MONGODB_URL)

console.log(config)

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log(`Connected to the ${config.MONGODB_URI} Database`))
.catch(error => console.log(error))

const app = express();

app.use(bodyParser.json());

app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/public', express.static(publicDir)); //Serves resources from public folder

app.use(express.static(frontendDir));
app.get('*', (req, res) => {
  console.log(req)
  res.sendFile(path.join(frontendDir + '/index.html'))
})

// app.get("/api/product/:id", (req, res) => {
//     let productID = req.params.id;
//     console.log("Server")
//     console.log(productID)
//     let product = data.products.find(product => product.id == productID) 
//     if(product)        
//         res.send(product);
//     else
//         res.status(404).send({message: "Product Not Found"});
// })

// app.get("/api/products", (req, res) => {
//     res.send(data.products)
// })
// console.log('dirpath')
// console.log(__dirname)

app.get("/",(req,res)=>{
  return res.send("<h1>hello!</h1>");
});
app.listen(config.PORT, _ => { console.log(`Server started at port # ${config.PORT}`)})