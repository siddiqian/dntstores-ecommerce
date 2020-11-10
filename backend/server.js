import express from 'express'
import mongoose from 'mongoose';
import config from './config.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import orderRouter from './routes/orderRouter.js'
import bodyParser from 'body-parser'
import path from 'path';
const __dirname = path.resolve();
const publicDir = path.join(__dirname, 'public')
// const frontendDir = path.join(__dirname, '/frontend/build')
// console.log(__dirname)
// console.log(frontendDir)

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

// app.use(express.static(frontendDir));
// app.get('*', (req, res) => {
//   console.log(req)
//   res.sendFile(path.join(frontendDir + '/index.html'))
// })


app.get("/",(req,res)=>{
  return res.send("<h1>hello!</h1>");
});
app.listen(config.PORT, _ => { console.log(`Server started at port # ${config.PORT}`)})