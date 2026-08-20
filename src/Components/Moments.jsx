function MomentsFrame() {
    return(
        <div className="relative w-full py-12 md:py-16 overflow-hidden bg-background">
            {/* Subtle glowing radial background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            
            <HeadText/>
            <MomentSection/>
        </div>
    )
}

function HeadText() {
    return(
        <div className="text-center mb-4 relative z-10 px-4">
            <h1 className="text-4xl md:text-5xl lg:text-5xl leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm select-none uppercase">
                Moments to Remember
            </h1>
            <div className="w-24 h-1.5 bg-primary mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(110,159,159,0.5)]" />
        </div>
    )
}

const MOMENT_IMG = "f_auto,q_auto:eco,w_600,c_fill,g_auto";

function ImgSet() {
    return(
        <>
            <MomentBox image={`https://res.cloudinary.com/dtc2xaeaf/image/upload/${MOMENT_IMG}/v1756762284/IMG_0449_xpm5xd.heic`} alt="img11"/>
            <MomentBox image={`https://res.cloudinary.com/dtc2xaeaf/image/upload/${MOMENT_IMG}/v1757948233/Copy_of_IMG_1579_1_cllu8u_ydhqiq.jpg`} alt="img1"/>
            <MomentBox image={`https://res.cloudinary.com/dtc2xaeaf/image/upload/${MOMENT_IMG}/v1757948233/_DSC7394_apr72u_zi0rg3.jpg`} alt="img3"/>
            <MomentBox image={`https://res.cloudinary.com/dtc2xaeaf/image/upload/${MOMENT_IMG}/v1757948234/IMG_8196_m0x3cw_sfxyzn.jpg`} alt="img4"/>
            {/* <MomentBox image={`https://res.cloudinary.com/dtc2xaeaf/image/upload/${MOMENT_IMG}/v1756974538/IMG_1943_bswadu.heic`} alt="img6"/> */}
            <MomentBox image={`https://res.cloudinary.com/dtc2xaeaf/image/upload/${MOMENT_IMG}/v1757948232/IMG_3102_kjthpm_itv9ox.jpg`} alt="img7"/>
            <MomentBox image={`https://res.cloudinary.com/dtc2xaeaf/image/upload/${MOMENT_IMG}/v1756974888/IMG-20250617-WA0034_qeztwp.jpg`} alt="img8"/>
            <MomentBox image={`https://res.cloudinary.com/dtc2xaeaf/image/upload/${MOMENT_IMG}/v1756974860/IMG20250320115025_afbtrp.jpg`} alt="img10"/>
        </>
    )
}

function MomentSection() {
    return(
        <div className="relative w-full max-w-[1920px] mx-auto pt-2 pb-8">
            {/* Seamless gradient mask for fade effect */}
            <div 
                className="w-full overflow-hidden" 
                style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
            >
                <div className="flex w-max lg:animate-slider animate-slider_mobile hover:pause-animation py-2">
                    <ImgSet/>
                    <ImgSet/>
                    <ImgSet/>
                    <ImgSet/>
                </div>
            </div>
        </div>
    )
}

function MomentBox({image, alt}) {
    return(
        <div className="group mx-2 lg:mx-3 shrink-0 relative perspective-1000">
            {/* Glass Polaroid Container */}
            <div className="p-3 pb-8 md:p-4 md:pb-12 bg-white/60 dark:bg-card/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-3xl shadow-xl transition-all duration-500 ease-out hover:-translate-y-4 hover:rotate-3 hover:shadow-[0_20px_40px_rgba(110,159,159,0.2)] hover:z-10 relative">
                {/* Image Wrapper */}
                <div className="relative w-[250px] h-[200px] lg:w-[320px] lg:h-[350px] rounded-2xl overflow-hidden bg-muted">
                    <img 
                        src={image} 
                        alt={alt} 
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110" 
                        loading="lazy" 
                        decoding="async" 
                    />
                    {/* Subtle inner shadow overlay */}
                    <div className="absolute inset-0 shadow-inner rounded-2xl pointer-events-none border border-black/10 dark:border-white/10" />
                </div>
            </div>
        </div>
    )
}

export {MomentsFrame}