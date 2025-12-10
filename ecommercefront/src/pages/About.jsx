import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about} alt="About Nepali Poshak" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            NEPALI POSHAK was born out of a passion for innovation and a desire to revolutionize the way people shop traditional and cultural attire online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of attire from different ethnic groups to celebrate the rich culture and tradition of our country, Nepal. Our culture and tradition are precious gifts, and we should honor our heritage.
          </p>
          <p>
            Nepali culture is a tapestry woven from centuries of wisdom, artistry, and resilience. Our traditional attire is more than fabric — it is a living legacy passed down from our ancestors, a gift that speaks of identity, pride, and belonging. From the elegant gunyo cholo worn by young girls to the dignified daura suruwal that symbolizes national unity, each garment carries stories of festivals, rituals, and everyday life. These clothes are not just worn — they are celebrated, cherished, and remembered.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            In a rapidly globalizing world, our traditions risk being overshadowed. By showcasing Nepali attire with authenticity and reverence, we invite the world to recognize its beauty and significance. This is not just fashion — it is cultural storytelling. Our mission is to preserve and promote these timeless designs, ensuring that future generations — both in Nepal and abroad — feel the heartbeat of their heritage through every thread.
          </p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <NewsLetterbox />
    </div>
  )
}

export default About
