import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className='py-5 sm:px-10 px-5'>
      <div className='screen-max-width'>
        <div>
          <p className='font-semibold text-gray text-xs'>
            More ways to shop: {' '}
            <span className='underline text-blue'>Find an Apple store</span>
            {' '} or {' '}
            <span className='underline text-blue'>other retailers</span>
            {' '} near you.
          </p>
          <p className='font-semibold text-gray text-xs'>
            Or call 000800-040-1966
          </p>
        </div>

        <div className='bg-neutral-700 my-5 h-[1px] w-full'></div>

        <div className='flex md:flex-row flex-col md:items-center justify-between'>
          <p className='font-semibold text-gray text-xs'>
            Copyright @ 2024 Apple Inc. All rights reserved.
            <div className='flex gap-4'>
              {
                footerLinks.map(item => (
                  <p key={item} className='font-semibold text-gray text-xs'>
                    {item}{' '}
                  </p>
                ))
              }
            </div>
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer