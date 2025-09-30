import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

interface Props {
    isOpen: boolean,
    onIsOpen: (value: boolean) => void,
    rooms_image: string
}

/**
 * Displays the selected room image inside a responsive dialog.
 * @param props - Component props.
 * @param props.isOpen - Controls dialog visibility state.
 * @param props.onIsOpen - Callback fired when visibility changes.
 * @param props.rooms_image - Source URL for the room image.
 */

export const ImageDialog = ({ isOpen, onIsOpen, rooms_image }: Props) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer onOpenChange={onIsOpen} open={isOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className=' sr-only'>Room Image Preview</DrawerTitle>
                        <DrawerDescription className=' sr-only'>Enlarged view of the selected room image.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Image
                            src={rooms_image}
                            alt='home'
                            width={500}
                            height={500}
                            className=' w-full h-[30rem] object-contain rounded-md'
                        />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog onOpenChange={onIsOpen} open={isOpen}>
            <DialogContent className=' mx-w-2xl'>
                <DialogHeader>
                    <DialogTitle className=' sr-only'></DialogTitle>
                    <DialogDescription className='sr-only'></DialogDescription>
                </DialogHeader>

                <Image
                    src={rooms_image}
                    alt='home'
                    width={500}
                    height={500}
                    className=' w-full h-[30rem] object-contain rounded-md'
                />
            </DialogContent>
        </Dialog>
    )
}
