import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartroute.js'
import orderRouter from './routes/orderRoute.js'

// App Config (here we will use express package to create the instance of express server )

const app = express();
const port = process.env.PORT || 5001;
connectDB()
connectCloudinary()

//Middlewares
// request will be passed in json

app.use(express.json())
app.use(cors())   // we this we can acess backend from any IP

//API ENDPOINTS  /whenever we will open local post 5001 it will display api working msg
app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order',orderRouter)



app.get('/',(req,res)=>{
res.send("API Working")
})

// start express server
app.listen(port, ()=> console.log('Server started on Port : '+ port))