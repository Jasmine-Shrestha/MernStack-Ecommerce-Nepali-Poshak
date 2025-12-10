import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom';
const Cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  // within this logic we have set that our selected items are displayed with their feature.
  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      } // befor it was consol.log(tempData); to see the inspect functionality.
      setCartData(tempData);
    }

  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (

              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className=' flex items-start gap-6'>
                  {/** here we have showed the selected image in cart  */}
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    {/** here it shows the name of the item */}
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    {/** here it shows the currency */}
                    <div className='flex item-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      {/** here it show the size  */}
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                {/** here it show the no. of selected items  */}

                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />

                {/** here on onclick function we have put 0 to remove data from cart */}
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin} alt="" />
              </div>
            )

          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />

          {/** creating proceed to checkout button for placing order */}
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart