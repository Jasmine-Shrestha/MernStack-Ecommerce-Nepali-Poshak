import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true },
    items: {type: Array, required: true },
    amount: {type: Number, required: true },
    address: {type: Object, required: true },
    status: {type: String, required: true, default:'Order Placed' },
    paymentMethod: {type: String, required: true },
    payment: {type: String, required: true , default:false },
// here whenever new order is placed by default payment will be false
// and when we will add the payment gateway and make the payment online then we will make the status true
    date: {type: Number, require:true}

})

const orderModels = mongoose.models.order || mongoose.model('order', orderSchema)

export default orderModels;

{/** here in this property first we have the userID we will store the userID
    who has placed the orders then we have the items where we will store the product that is
     items. then we have the amount where we will store the order amount, then we have the address and here we will store the status 
     then we have payment method, and in payment whenever the user pay online we will make it true.   */}