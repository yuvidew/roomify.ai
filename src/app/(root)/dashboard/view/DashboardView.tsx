
import { ExtractImageFrom } from '../_components/extract_image_from';
import { HomeSection } from '../_components/home_section';

export const DashboardView = () => {
    return (
        <main className=" flex items-start h-full" >
            {/* start to extract image form */}
            <ExtractImageFrom/>
            {/* end to extract image form */}

            {/* start Home section */}
            <HomeSection/>
            {/* end  Home section */}

        </main>
    )
}
