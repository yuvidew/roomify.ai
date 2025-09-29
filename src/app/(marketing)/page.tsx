import React from 'react'
import { Header } from './_components/Header'
import { getCurrent } from '@/features/auth/queries'
import { HeroSection } from './_components/hero_section';
import { HeroImages } from './_components/hero_images';
import Footer from './_components/Footer';


const MarketingPage = async () => {
    const user = await getCurrent();
    return (
        <main className=' '>
            {/* start to header */}
            <Header isUserLogin={!!user} />
            {/* end to header */}

            <div className=' flex flex-col gap-9 mt-48 justify-center lg:w-[80%] w-full m-auto md:justify-start text-center gap-y-8 gap-x-10 flex-1 px-6 pb-10'>

                <div className='grid lg:grid-cols-2 lg:h-[60vh] grid-cols-1 gap-5'>
                    {/* start to hero section  */}
                    <HeroSection isUserLogin={!!user} />
                    {/* end to hero section  */}

                    {/* start to images */}
                    <HeroImages />
                    {/* end to images */}
                </div>
                <Footer />
            </div>

        </main>

    )
}

export default MarketingPage