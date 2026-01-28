// app/{root}/layout.tsx
import Navbar from '@/components/navigation/navbar'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <Navbar/>
      {children}
      
    </main>
  )
}

export default HomeLayout