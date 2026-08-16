
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '../../hooks/useTheme';


export const OurJourney=()=>{
    const { theme } = useTheme();

    return(
        <>
        <div className="mb-[10px] flex justify-center items-center" >
            <LazyLoadImage
                src={
                    theme === 'dark'
                    ? 'https://res.cloudinary.com/dtc2xaeaf/image/upload/v1771993398/Our_Journey_white_cszudo.svg'
                    : 'https://res.cloudinary.com/dtc2xaeaf/image/upload/v1771630641/Our_Journey_enbhey.svg'
                    
                }
                alt="Our Journey"
                className="w-full max-w-[90vw] xl:max-w-7xl px-4 mx-auto"
            />
        </div>
        
        
        
        </>
    )
}