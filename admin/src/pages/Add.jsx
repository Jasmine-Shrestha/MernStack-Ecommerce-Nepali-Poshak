import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
// four state variable to store 4 images.
  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)
  
  // state variable for storing name,description,price,category,subcategory,bestseller,sizes
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Topwear");
  const [bestSeller,setBestSeller] = useState(true);
  const [sizes,setSize] = useState([]);
   
  const onSubmitHandler = async (e) => {
e.preventDefault();

  try {
    const formData = new FormData()


    formData.append("name",name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("category",category)
    formData.append("subcategory",subcategory)
    formData.append("bestseller",bestSeller)
    formData.append("sizes",JSON.stringify(sizes))  
    {/** array will be converted into string  and when access in backend it will convert it into array*/}


    // all images will be added in form data // ADDING image1&& so that when only one image is selected it will not create any error. 
    image1 && formData.append("image1",image1)
    image2 && formData.append("image2",image2)
    image3 && formData.append("image3",image3)
    image4 && formData.append("image4",image4)


    // backend 
     const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
     
     if (response.data.success) {
      toast.success(response.data.message)
      
      setName('')
      setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
     } else {
      {/** with toast response you will get product added notification */}
      toast.error(response.data.message)

     }

  } catch (error) {
    console.log(error);
    toast.error(error.message)
    

  }
}
  
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
       <div >
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
        <label htmlFor="image1"> 
          {/** adding ternery operator if image1 is unavailable we will use this assets.file area. if available we will create url of that image and use that in src.   */}
        <img className='w-20' src={!image1 ? assets.file : URL.createObjectURL(image1) } alt="" />
        <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id="image1" hidden/>
       </label>

       <label htmlFor="image2"> 
        <img  className='w-20' src={!image2 ? assets.file : URL.createObjectURL(image2) } alt="" />
        <input onChange={(e)=>setImage2(e.target.files[0])} type="file"  id="image2" hidden/>
       </label>
       
       <label htmlFor="image3"> 
        <img  className='w-20' src={!image3 ? assets.file : URL.createObjectURL(image3) } alt="" />
        <input onChange={(e)=>setImage3(e.target.files[0])} type="file"  id="image3" hidden/>
       </label>
       
       <label htmlFor="image4"> 
        <img className='w-20' src={!image4 ? assets.file : URL.createObjectURL(image4) } alt="" />
        <input onChange={(e)=>setImage4(e.target.files[0])} type="file"  id="image4" hidden/>
       </label>
        </div>
       </div>

       <div className='w-full'>
        <p>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] py-2' type="text" placeholder='Type here ' required />
       </div>

       <div className='w-full'>
        <p>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] py-2' type="text" placeholder='write content here ' required />
       </div>
       

       <div  className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2' >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="Ornament">Ornament</option>

          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className= 'w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="FullSet">Fullset</option>
            <option value="Jewellary">Jewellary</option>

          </select>
        </div>

        <div className='mb-2'>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) =>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm;w-[120px]' type="Number"  placeholder='25'/>
        </div>

        </div>

        <div>
       <p className='mb-2'>Product Sizes</p>
       <div className='flex gap-3' >
        <div onClick={()=>setSize(prev => prev.includes("S") ?  prev.filter( item => item !== "S") : [...prev,"S"])}>
          <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
        </div>

        <div onClick={()=>setSize(prev => prev.includes("M") ?  prev.filter( item => item !== "M") : [...prev,"M" ])}>
          <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
        </div>
        <div onClick={()=>setSize(prev => prev.includes("L") ?  prev.filter( item  => item !== "L") : [...prev,"L" ])}>
          <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
        </div>
         {/**<div onClick={()=>setSizes(prev => prev.includes("XL") ?  prev.filter( item => item !== "XL") : [...prev,"XL" ])}>
          <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
        </div>
        <div onClick={()=>setSizes(prev => prev.includes("XXL") ?  prev.filter( item => item !== "XXL") : [...pre,"XXL" ])}>
          <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
        </div>  */}
        
        </div>
        
  
    </div>
  
    <div className='flex gap-2 mt-2'>
      <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestSeller'/>
      <label className='cursor-pointer' htmlFor="bestSeller">Add to bestseller</label>
    </div>
     <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add