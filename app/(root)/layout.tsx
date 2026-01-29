// app/{root}/layout.tsx
import Navbar from '@/components/navigation/navbar'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <Navbar/>
      <div className='flex'>

            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
                <div className='mx-auto w-full max-w-5xl'>
                    {children} 
                 </div>

            </section> 
      </div>
      
    </main>
  )
}

export default HomeLayout