'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"


import { Label } from "@/components/ui/label"
import { ModeToggle } from "../ModeToggle"
import { useIsMobile } from "@/hooks/use-mobile"

interface Props {
    open: boolean,
    onOpenChange: (value: boolean) => void
}

/**
 * Settings dialog for configuring appearance.
 *
 * @param props - Component props.
 * @param props.open - Controls whether the dialog is open.
 * @param props.onOpenChange - Callback fired when open state changes.
 */
export const SettingModel = ({ open, onOpenChange }: Props) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer
                open={open}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    <DrawerHeader className={"border-b pb-3"} >
                        <DrawerTitle className=" text-lg font-medium">My settings</DrawerTitle>
                    </DrawerHeader>
                    <DrawerFooter>
                        <div className=" flex items-center justify-between h-32">
                            <div className=" flex flex-col gap-y-1">
                                <Label>
                                    Appearance
                                </Label>
                                <span className=" text-[0.8rem] text-muted-foreground">
                                    Customize how Roomify.AI looks on your device
                                </span>
                            </div>
                            <ModeToggle />
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader className={"border-b pb-3"} >
                    <DialogTitle className=" text-lg font-medium">
                        My settings
                    </DialogTitle>
                </DialogHeader>
                <div className=" flex items-center justify-between">
                    <div className=" flex flex-col gap-y-1">
                        <Label>
                            Appearance
                        </Label>
                        <span className=" text-[0.8rem] text-muted-foreground">
                            Customize how Roomify.AI looks on your device
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )
}
