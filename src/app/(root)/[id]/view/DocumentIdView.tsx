"use client"
import { Button } from '@/components/ui/button'
import { Home, HousePlus, Logs } from 'lucide-react'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadImageSection } from '@/features/documents/_components/UploadImageSection'
import { useGetHomeDetails } from '@/features/documents/api/use-get-home-details'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorCard } from '@/components/ErrorCard'
import { ExtractRoom } from '@/types/type'

interface Props {
    id: string
}

/**
 * Document view for a saved extract.
 * @param id unique identifier for the extract room record.
 */
export const DocumentIdView = ({ id }: Props) => {
    const { data, isLoading, isError } = useGetHomeDetails(id);

    if (isLoading && !data) {
        return (
            <main className=" p-6 h-full w-full flex flex-col gap-7">
                <section className=' lg:w-[80%] py-5 flex flex-col w-full gap-5 h-full m-auto'>
                    <div className=' flex flex-col gap-4 '>
                        <Button size={"icon"}>
                            <Home />
                        </Button>
                        <Skeleton className=' h-8 w-full' />
                    </div>
                    <Skeleton className=' h-52 w-full'/>
                </section>
            </main>
        )
    }

    if (isError) {
        return (
            <div className=' h-full w-full flex items-center justify-center'>
                <ErrorCard
                    message='Failed to fetch the home details..'
                />
            </div>
        )
    }

    const homeDetails: ExtractRoom = data as ExtractRoom

    return (
        <main className=" p-6 h-full flex flex-col gap-7">
            <section className=' lg:w-[80%] py-5 flex flex-col gap-5 h-full m-auto'>
                {/* start to heading  */}
                <div className=' flex flex-col gap-4 '>
                    <Button size={"icon"}>
                        <Home />
                    </Button>
                    <h1 className=' text-2xl font-bold'>
                        {homeDetails?.home_title}
                    </h1>
                </div>
                {/* end to heading  */}

                <Tabs defaultValue="upload-image" className="w-full">
                    <TabsList className=''>
                        <TabsTrigger value="upload-image" className=' '><HousePlus />You floor plan</TabsTrigger>
                        <TabsTrigger value="ai-extracted-rooms" className=' '><Logs /> AI extracted room details</TabsTrigger>
                        <TabsTrigger value="ai-generated-rooms" className=' '><Home /> AI generated room view</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload-image">
                        <UploadImageSection />
                    </TabsContent>
                    <TabsContent value="ai-extracted-rooms">Change your ai-extracted-rooms here.</TabsContent>
                    <TabsContent value="ai-generated-rooms">Change your ai-extracted-rooms here.</TabsContent>
                </Tabs>
            </section>
        </main>
    )
}
