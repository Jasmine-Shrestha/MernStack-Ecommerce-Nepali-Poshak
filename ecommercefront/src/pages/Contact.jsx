import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
 </div>
 <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
  <img className='w-full md:max-w-[480px]' src={assets.contactus} alt="" />
<div className='flex flex-col justify-center items-start gap-6' >
  <p className='font-semibold text-xl text-gray-600'>Our Store</p>
  <p className='text-gray-500'>44600 kathmandu, Nepal <br/> Bagmati Province 03, Kathmadu, Nepal  </p>
  <p className='text-gray-500'>tel : (+977) 8888888888 <br/>Email: NepaliPoshak@gmail.com </p>
  <p className='font-semibold text-gray-600'>Carrer at NEPALI POSHAK</p>
  <p className='text-gray-500'>Learn more about our teams and job opening.</p>
  <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Job</button>

</div>
 </div>
 <NewsLetterbox />
    </div>
  )
}

export default Contact