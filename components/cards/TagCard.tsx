import React from 'react';
import Link from 'next/link';
import {Badge} from '../ui/badge';
import ROUTES from '@/constants/routes'; 
import { getDeviconClassName } from '@/lib/utils';
import Image from 'next/image'
import { X } from 'lucide-react';

interface Props {
    _id: string;
    name: string;
    questions?: number;
    showCount?: boolean;
    compack?: boolean;
    remove?: boolean;
    isButton?:boolean;
    handleRemove?: () => void;
}

const TagCard = ({ _id,name,questions,showCount,compack,remove,isButton,handleRemove }: Props) => {
    const iconClass = getDeviconClassName(name);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    const Content = (
        <>
         <Badge className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase'>
                <div className='flex-center space-x-2'>
                    <i className={`${iconClass} text-sm`}></i>
                    <span>{name}</span> 
                </div>  

    {remove && (
        <X
        size={12}
        className="cursor-pointer text-dark-400 dark:text-light-700"
        onClick={handleRemove}
        />
    )} 
    </Badge>

    { showCount && (
      <p className='small-medium text-dark500_light700'>{questions}</p>
          )}       
        </>
    );


    if (compack) {
        return isButton ? (
            <button onClick={handleClick} className='flex justify-between gap-2'>
                    {Content}
            </button>
        ) : (
        <Link href={ROUTES.TAG(_id)} className='flex justify-between gap-2'> 
        {Content}
        </Link>
        )
    }
 
};

export default TagCard;