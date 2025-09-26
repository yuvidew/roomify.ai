import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image';

interface Props {
    isOpen : boolean,
    onIsOpen : (value : boolean) => void,
    rooms_image : string
}

export const ImageDialog = ({isOpen , onIsOpen , rooms_image}: Props) => {
    return (
        <Dialog onOpenChange={onIsOpen} open = {isOpen}>
            <DialogContent className=' mx-w-2xl'>
                <DialogHeader>
                    <DialogTitle className=' sr-only'></DialogTitle>
                    <DialogDescription className='sr-only'></DialogDescription>
                </DialogHeader>

                <Image
                    src = {rooms_image}
                    alt='home'
                    width={500}
                    height={500}
                    className=' w-full h-[30rem] object-contain rounded-md'
                />
            </DialogContent>
        </Dialog>
    )
}
