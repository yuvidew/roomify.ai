import Image from 'next/image'
import React from 'react'

export const HeroImages = () => {
    return (
        <div className=' relative grid grid-cols-1 gap-2'>
            <Image
                src={"/img1.jpeg"}
                alt='Home image 1'
                width={500}
                height={500}
                className=' lg:size-[19rem] w-full rounded-md object-cover'
            />
            <Image
                src={"/img2.jpeg"}
                alt='Home image 2'
                width={500}
                height={500}
                className=' lg:size-[19rem] w-full rounded-md lg:absolute bottom-0 right-0 object-cover'
            />
        </div>
    )
}
