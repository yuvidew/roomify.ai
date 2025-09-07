import React from 'react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'

const Footer = () => {
    return (
        <div className=' flex items-center w-full justify-between   bg-background'>
            <Logo isTitleShow />
            <div className=' md:ml-auto w-full justify-between 
            md:justify-end flex items-center gap-x-2 text-muted-foreground'>
                <Button variant = "ghost" size = "sm">
                    Privacy Policy
                </Button>
                <Button variant = "ghost" size = "sm">
                    Term & Condition
                </Button>
            </div>
        </div>
    )
}

export default Footer