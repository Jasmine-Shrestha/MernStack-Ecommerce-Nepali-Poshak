import orderModels from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'


//global variables 
const currency = 'usd'
const deliveryCharge = 10

// GATEWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing orders using COD 
 
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModels(orderData)
        await newOrder.save() //for database


        // with this function the cart will be cleared

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }



}


// placing orders using Strip pay 

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModels(orderData)
        await newOrder.save() //for database


        const line_items = items.map((item)=>({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100

            },
            quantity: item.quantity
        }))
        // for delivery charges
        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100

            },
            quantity: 1
        })
// here success and failure msg for payment
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
    })

        res.json({success:true,session_url:session.url});



    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//verify stripe 
const verifyStripe = async (req,res)=> {
    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModels.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success:true});

            
        } else {
            // HERE if success if false order will be delet
            await orderModels.findByIdAndDelete(orderId)
            res.json({success:false}) 
        }
    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
}
}


// placing orders using razor pay

//const placeOrderRazorpay = async (req, res) => {

//}


// All orders data for admin panel 
const allOrders = async (req, res) => {

    try {
        const orders = await orderModels.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}


// update orders data for frontend 
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body
        const orders = await orderModels.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// update orders status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModels.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json({ success: true, message: 'status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}








export { verifyStripe,placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus }

// placeOrderRazorpay