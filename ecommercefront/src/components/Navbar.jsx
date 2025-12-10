import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

const [visible,setVisible] = useState(false);
const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

// for logout functionality 
const logout = () => {
  navigate('/login')
  localStorage.removeItem('token')
  setToken('')
  setCartItems({})
 
}

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        {/** with link to='/' it will direct to home paage when we click on logo */}
       <Link to='/'><img src={assets.Logo} className='w-25 h-20' alt=""/>
       <p> NEPALI POSHAK</p>
       </Link> 
       
        <ul className='hidden sm:flex gap-5 text-sm text-black-700'>
{/**NavLink is used in React Router to create navigation links that automatically apply styling when the link matches the current URL, making it perfect for highlighting active pages like "Home" or "About". */}
{/** to is used for routing  */}
<NavLink  to='/' className={'flex flex-col items-center gap-1'}>
<p>HOME</p>
<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
{/**The <hr> tag in HTML creates a horizontal line that visually separates sections of content, often used to indicate a thematic break or shift in topic. */}
</NavLink>

<NavLink to='/collection' className={'flex flex-col item-center gap-1'}>
<p>COLLECTION</p>
<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>
<NavLink to='/about' className={'flex flex-col item-center gap-1'}>
<p>ABOUT</p>
<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>
<NavLink to='/contact' className={'flex flex-col item-center gap-1'}>
<p>CONTACT</p>
<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>
</ul>

{/**adding serach icon */}
<div className='flex items-center gap-6'>
<img onClick={()=>setShowSearch(true)} src={assets.search} className='w-6 cursor-pointer' alt="" /> 

{/**adding profile icon */}
<div className='group relative'>

  {/** here if token is not available we will call navigate on here */}
<img onClick={()=> token ? null : navigate('/login')} className='w-6 cursor-pointer' src={assets.profileicon} alt=""/>

{/**adding hover and dropdown option when hover to profile icon*/}
{/** with token it will only display when token is available */}
{token &&
 <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
<div className='flex flex-col gap-2  w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
<p className='cursor-pointer hover:text-black'>My Profile</p>
<p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
<p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>


</div>
</div>}
</div>

{/**adding link tag to add two property cart and   so that when we click it it will land in cart page*/}

<Link to='/cart' className='relative'>

<img src={assets.cart} className='w-6 min-w-6' alt="" />
{/** adding style to add the number of item in cart */}
<p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[11px]'>{getCartCount()}</p>

</Link>

{/**adding menu icon and styling it for small screen only i.e when screen is big it is hide */}
{/** SO when we click on menu the visible state will be true. */}

<img onClick={()=>setVisible(true)} src={assets.menuicon}  className='w-5 cursor-pointer sm:hidden' alt=""/>

</div>
{/** Sidebar menu for small screens  */}

<div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
  <div className="flex flex-col text-gray-600">
    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
      <img className='h-4 rotate-180' src={assets.dropdown} alt="" />
      <p>Back</p>
    </div>

{/**nav link tag */}
{/** with the className styling it will creat padding */}
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-5 border' to='/'>HOME</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-5 border'  to='/collection'>COLLECTION</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-5 border'  to='/about'>ABOUT</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 pl-5 border'  to='/contact'>CONTACT</NavLink>
  </div>
</div>

    </div>
  )
}

export default Navbar