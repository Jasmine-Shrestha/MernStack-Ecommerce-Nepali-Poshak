import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Column 1 */}
        <div>
          <img src={assets.logo2} className='mb-5 w-32' alt="Nepali Poshak Logo" />
          <p className='w-full md:w-2/3 text-gray-800'>NEPALI POSHAK</p>
        </div>

        {/* Column 2 */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3 — Added to match grid */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+977-9898989898</li>
            <li>NepaliPoshak@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
Copyright 2025@ Nepaliposhak.com - All Right Reserved
        </p>
      </div>

    </div>
  )
}

export default Footer
