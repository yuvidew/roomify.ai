import { Button } from '@/components/ui/button'
import { WandSparkles } from 'lucide-react'
import React from 'react'

export const HomeSection = () => {
    return (
        <div className=' h-full flex w-full items-center justify-center gap-3 '>
            <div className='flex flex-col w-[80%] gap-3'>
                <Button size={"icon"}>
                    <WandSparkles />
                </Button>

                <h1 className="text-2xl font-bold text-left">Welcome to <span className=" text-primary text-3xl">Roomify.AI</span></h1>
                <p className=' text-sm text-muted-foreground'>– Your Smart Floor Plan Visualizer</p>
                <p className="text-left text-sm">
                    Upload your home floor plan and let Roomity.ai instantly transform it into a realistic, high-quality 2D visualization. Explore your dream home before it’s built, customize spaces, and bring your designs to life with AI-powered precision.
                </p>
            </div>
        </div>
    )
}
