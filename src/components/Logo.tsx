"use client";

import React from 'react'
import { Button } from './ui/button'
import { HousePlus } from 'lucide-react'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const font = Poppins({
    subsets : ["latin"],
    weight : ["400" , "600"]
})

interface Props {
    isTitleShow? : boolean 
}

/**
 * @param props - Component props.
 * @param props.isTitleShow - Whether to show the "Roomify.AI" title text.
 */
export const Logo = ({isTitleShow} : Props) => {
    const router = useRouter() 
    return (
        <div className=' flex items-center gap-2'>
            <Button 
                variant={"default"}
                size={"icon"}
                onClick={() => router.back()}
            >
                <HousePlus />
            </Button>

            {isTitleShow && (
                <Link href={"/"} className={cn('font-semibold lg:flex md:flex hidden' , font.className)}>
                    Roomify.AI
                </Link>
            )}
        </div>
    )
}
