"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
   const path= usePathname()
   
  return (
    <div className='flex justify-between bg-secondary shadow-md p-4'>
        <Image src={'/logo.svg'} width={160} height={100} alt='logo' priority />
        <ul className='hidden  md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&& 'text-primary font-bold'}`}>DashBoard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&& 'text-primary font-bold'}`}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade'&& 'text-primary font-bold'}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how'&& 'text-primary font-bold'}`}>How it Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header