'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


import { Label } from "@/components/ui/label"
import { ModeToggle } from "../ModeToggle"

interface Props {
    open : boolean,
    onOpenChange : (value : boolean) => void
}

export const SettingModel = ({open , onOpenChange} : Props) => {

    return (
        <Dialog 
            open = {open}
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
                            Customize how Jotion looks on your device
                        </span>
                    </div>
                    <ModeToggle/>
                </div>
            </DialogContent>
        </Dialog>
    )
}
