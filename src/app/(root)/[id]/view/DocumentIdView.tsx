import { Button } from '@/components/ui/button'
import { Home, HousePlus, Logs } from 'lucide-react'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadImageSection } from '@/features/documents/_components/UploadImageSection'

export const DocumentIdView = () => {
    return (
        <main className=" p-6 h-full flex flex-col gap-7">
            <section className=' lg:w-[80%] py-5 flex flex-col gap-5 h-full m-auto'>
                {/* start to heading  */}
                <div className=' flex flex-col gap-4 '>
                    <Button size={"icon"}>
                        <Home />
                    </Button>
                    <h1 className=' text-2xl font-bold'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis labore a ullam totam,
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
                        <UploadImageSection/>
                    </TabsContent>
                    <TabsContent value="ai-extracted-rooms">Change your ai-extracted-rooms here.</TabsContent>
                    <TabsContent value="ai-generated-rooms">Change your ai-extracted-rooms here.</TabsContent>
                </Tabs>
            </section>
        </main>
    )
}
