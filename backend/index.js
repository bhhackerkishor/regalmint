require("dotenv").config()
const express=require('express')
const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth")
const productRoutes=require("./routes/Product")
const orderRoutes=require("./routes/Order")
const cartRoutes=require("./routes/Cart")
const brandRoutes=require("./routes/Brand")
const categoryRoutes=require("./routes/Category")
const userRoutes=require("./routes/User")
const addressRoutes=require('./routes/Address')
const reviewRoutes=require("./routes/Review")
const wishlistRoutes=require("./routes/Wishlist")
const contactRoutes=require("./routes/contact")
const paymentRoutes=require("./routes/paymentRoutes")
const AdminApiRoutes=require("./routes/AdminApiRoutes")
const { connectToDB } = require("./database/db")


// server init
const server=express()

// database connection
connectToDB()


// middlewares
server.use(cors({origin:process.env.ORIGIN,credentials:true,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PUT','PATCH','DELETE']}))
server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))

// routeMiddleware
server.use("/auth",authRoutes)
server.use("/users",userRoutes)
server.use("/products",productRoutes)
server.use("/orders",orderRoutes)
server.use("/cart",cartRoutes)
server.use("/brands",brandRoutes)
server.use("/categories",categoryRoutes)
server.use("/address",addressRoutes)
server.use("/reviews",reviewRoutes)
server.use("/wishlist",wishlistRoutes)
server.use("/contact",contactRoutes)
server.use('/admin', AdminApiRoutes);
server.use('/payment', paymentRoutes);
const PORT = process.env.PORT || 5000; 



server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})

server.listen(PORT,()=>{
    console.log(`server [STARTED] ~ http://localhost:${PORT}`);
})
