'use client'
import React,{useState} from 'react'
import { useRouter,useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';

const filters =[
    {name:"React",value:"react"},
    {name:"JavaScript",value:"javascript"},
    {name:"TypeScript",value:"typescript"},
    {name:"Node.js",value:"nodejs"},
    {name:"CSS",value:"css"},
]
const HomeFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const filterParams = searchParams.get("filter")
    const [active, setActive] = useState(filterParams || "");
    const handleTypeClick = (filter: string) => {
        let url = ""
        if (filter === active) {
            url = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["filter"],
            });
            setActive("");
        } else {
            url = formUrlQuery({
                params: searchParams.toString(),
                key: "filter",
                value: filter.toLowerCase(),
            });
            setActive(filter);
        } 
        router.push(url,{scroll:false});  
    }
  return (
    <div className='mt-10 hidden flex-wrap gap-3 sm:flex'>
{
    filters.map((filter) => (
        <Button 
  key={filter.name}
  className={cn(
    `body-medium rounded-lg px-6 py-3 capitalize shadow-none cursor-pointer`,
    active === filter.value
      ? "bg-primary-100 dark:bg-dark-400 hover:bg-primary-100 dark:hover:bg-dark-400"
      : "background-light800_dark300 text-dark500_light500 hover:bg-light-800 dark:hover:bg-dark-300"
  )}
  style={active === filter.value ? { color: 'var(--primary-500)' } : undefined}
 onClick={() => {handleTypeClick(filter.value); }
}> 
            {filter.name} 
        </Button>
    ))
}
    
</div>
  )
}

export default HomeFilter