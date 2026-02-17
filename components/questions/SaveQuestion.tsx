"use client"
import { toast } from '@/components/ui/sonner';
import { toggleSaveQuestion } from '@/lib/actions/collection.action';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';

const SaveQuestion = ({ questionId,
     hasSaved: initialHasSaved, 
    }: { questionId : string;
        hasSaved: boolean;
    }) => {
    const session = useSession();
    const userId = session?.data?.user?.id;


    const [hasSaved, setHasSaved] = useState(initialHasSaved);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if(isLoading) return;
        if(!userId)
            return toast.error("You need to be logged in to save question");

      setIsLoading(true);

      try {
        const { success, data, error } = await toggleSaveQuestion({ questionId });

        if (!success) throw new Error(error?.message || "An error occurred" );

        setHasSaved(data?.saved ?? false);
        toast.success(`Question ${data?.saved ? "saved" : "unsaved"} successfully`);
      } catch (error) {
        toast.error("Error")
      }finally {
        setIsLoading(false);
      } 
    }


    return (
        <Image
        src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg" }
        width={18}
        height={18}
        alt='save'
        className={`cursor-pointer ${isLoading && "opacity-50"}`}
        aria-label='Save question'
        onClick={handleSave}
        />
    );
};

export default SaveQuestion;