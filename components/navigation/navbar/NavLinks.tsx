'use client'
import React from 'react'
import { SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
const NavLinks = ({isMobileNav=false,userId}:{isMobileNav?:boolean, userId?: string}) => {
     const pathname = usePathname(); 
  return (
    <>
    {sidebarLinks.map((item) => {
            const href = item.route === "/profile"
                ? userId ? `/profile/${userId}` : null
                : item.route;

            if (!href) return null;

            const isActive = (pathname.includes(href) && href.length > 1) || pathname === href;

        const LinkComponent = (
            <Link
              href={href}
              key={item.lable}
              className={cn( isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
                "flex items-center justify-start gap-4 bg-transparent p-4" 
              )} >
            <Image
             src={item.imgURL}
             alt={item.lable} 
             width={20}
             height={20}
             className={cn({ "invert-colors": !isActive })} 
             />
            <p className={cn( isActive ? "base-blod" : "base-medium",
                !isMobileNav && "max-lg:hidden"
            )}>
                {item.lable}
            </p>   
            </Link>
        );
        return isMobileNav ? (
            <SheetClose asChild key={item.route}>
                {LinkComponent}
            </SheetClose>
        ) : (
            <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
        })}  
    </>
    );
}

export default NavLinks