"use client"
import { Button } from '@/components/ui/button'
import { ArrowRight, HousePlus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    isUserLogin: boolean;
}


export const HeroSection = ({ isUserLogin }: Props) => {
    const router = useRouter()
    return (
        <section className='flex flex-col items-start  h-full gap-5'>
            <Button size={"icon"}>
                <HousePlus />
            </Button>

            <div className=' flex flex-col items-start gap-3'>

                <h1 className="text-2xl font-bold text-left">Welcome to <span className=" text-primary text-3xl">Roomify.AI</span></h1>
                <p className=' text-sm text-muted-foreground'>– Your Smart Floor Plan Visualizer</p>
                <p className="text-left text-sm">
                    Upload your home floor plan and let Roomity.ai instantly transform it into a realistic, high-quality 2D visualization. Explore your dream home before it’s built, customize spaces, and bring your designs to life with AI-powered precision.
                </p>
            </div>

            {isUserLogin ? (

                <Button onClick={() => router.push("/dashboard")}>
                    Go to Dashboard <ArrowRight />
                </Button>
            ) : (
                <div className="flex items-center justify-end gap-3">
                    <Button
                        variant={"outline"}
                        onClick={() => router.push("/sign-in")}
                    >
                        Sign in
                    </Button>

                    <Button
                        onClick={() => router.push("/sign-up")}
                    >
                        Sign up
                    </Button>
                </div>
            )}
        </section>
    )
}
