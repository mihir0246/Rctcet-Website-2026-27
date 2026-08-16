
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '../../hooks/useTheme';
import { journeyImages } from '../../data/aboutUs';


export const OurJourney = () => {
    const { theme } = useTheme();

    return (
        <>
            <div className="mb-[10px] flex justify-center items-center" >
                <LazyLoadImage
                    src={
                        theme === 'dark'
                            ? journeyImages.dark
                            : journeyImages.light

                    }
                    alt="Our Journey"
                    className="w-full max-w-[90vw] xl:max-w-7xl px-4 mx-auto"
                />
            </div>



        </>
    )
}