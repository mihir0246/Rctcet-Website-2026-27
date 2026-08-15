// import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '../../hooks/useTheme';

// const slides = [
//     { id: 1, title: "Club Service Team", description: "The Club Service team of the Rotaract Club of TCET is the backbone of our vibrant community, dedicated to fostering fellowship and ensuring the smooth functioning of the club. Through creative activities and events, they bring members together, strengthen bonds, and create a supportive environment where everyone feels connected and valued. This team is the heart of our club, turning every moment into an opportunity for growth, fun, and friendship.", imageUrl: "/About us/Club Service -Board of directors _converted.avif"},
//     { id: 2, title: "Community Service", description: `"Kindness is the language which the deaf can hear and the blind can see." The Community Service Avenue embodies this spirit, making a difference one act at a time. With every initiative, whether it's food donations, beach clean-ups, or awareness campaigns, we bring hope and joy to those who need it most. This avenue is all about compassion, resilience, and the drive to uplift others. Together, we don’t just change lives—we transform communities. Every effort, no matter how small, helps us build a brighter tomorrow, one step at a time."`, imageUrl: "/About us/file_converted.avif" },
//     { id: 3, title: "Sports", description: `"Talent wins games, but teamwork wins championships." The Sports Avenue is where energy meets enthusiasm, and where the spirit of competition fuels our drive. Whether it’s cricket, football, badminton, chess, or E-Sports for our online warriors, we bring out the best in each other through teamwork, resilience, and leadership. Sports teach us the values of respect, patience, and accountability, making every game a lesson in life. In this avenue, the thrill of the game brings out the kid in us, uniting us as a team that plays together and stays together.`, imageUrl: "/About us/Sports -Board of directors_converted.avif" },
//     { id: 4, title: "Shiksha", description: `At the Shiksha Avenue of the Rotaract Club of TCET, we believe in the transformative power of education. Our mission is to ignite a spark in every child, empowering them with the knowledge and confidence they deserve. Through activities like teaching underprivileged students and raising awareness about education and rights, we aim to open doors to a brighter future. One of our proudest initiatives, ‘TECHWOLD,’ introduces these students to electronics and circuits, inspiring a passion for science and technology while guiding them toward futures in engineering and beyond.`, imageUrl: "/About us/Shiksha Board of Director_converted.avif" },
//     { id: 5, title: "Public Relations", description: `The Public Relations Avenue is essential for shaping and maintaining the positive reputation of our club. Our strategy involves creating, organizing, and evaluating effective communication tactics that resonate with our audience. While marketing focuses on promoting our events and initiatives to drive engagement, our PR efforts are centered on building strong relationships with the community and stakeholders. Through thoughtful outreach and consistent messaging, we aim to foster a positive image of the Rotaract Club of TCET, ensuring that our values and mission are effectively communicated and celebrated.`, imageUrl: "/About us/Public Relation Director_converted.avif" },
//     { id: 6, title: "Digital Communication Team", description: `The Digital Communication team creates engaging content that highlights our club's activities and initiatives. By utilizing innovative communication strategies, we foster community spirit and inspire members to be idea generators. Our focus on excellence captivates our audience, enhancing our club’s presence and showcasing the impact of our efforts in making a difference.`, imageUrl: "/About us/digicom_converted.avif" },
//     { id: 7, title: "Social Media Relations Team", description: `The Social Media Relations team manages our club’s Instagram, Twitter, and Pinterest accounts, creating engaging content that highlights our activities and boosts our digital presence. Their innovative approach breaks conventional patterns, allowing them to make a meaningful impact and optimize the social media experience for our audience.`, imageUrl: "/About us/Social Media and Relation Directors_converted.avif" },
//     { id: 8, title: "Entrepreneurship Development Team", description: `The Entrepreneurship Development team focuses on the professional growth of members by fostering innovative business ideas and practices.  This team creates platforms for networking and hosts business plan competitions, inspiring members to learn and implement their entrepreneurial visions. Their dynamic approach encourages creativity and collaboration within the club.`, imageUrl: "/About us/Entrepreneurship Development -Board of directors _converted.avif" },
//     { id: 9, title: "Editorial Service Team", description: `The Editorial Service team fosters clear communication and builds trust through well-crafted messages. By enhancing writing skills and initiating various editorial activities, they support members in developing effective communication. Their work includes official correspondence, social media captions, and editorial content for club activities, ensuring our message is impactful and cohesive.`, imageUrl: "/About us/Editorial Service Board of Directors_converted.avif" },
//     { id: 10, title: "Partners-in-Service Team", description: `The Partners-in-Service team is dedicated to fostering strong relationships among Rotary, Interact, Inner Wheel, and alumni. With the vision of "Individually we are one drop, but together we are an ocean," this avenue creates opportunities for collaboration among sister institutions. By bringing everyone together, the team enhances the spirit of unity and teamwork within the community.`, imageUrl: "/About us/Rtr. Chandranshu Dharmik - Partner In Service Director _converted.avif" },
//     { id: 11, title: "Professional Development Team", description: `The Professional Development team is dedicated to enhancing the skills and knowledge of our members through innovative activities and seminars. Guided by the motto, “Tell me and I forget, teach me and I may remember, involve me and I learn,” this avenue focuses on fostering growth and teamwork, ensuring that every member has the opportunity to develop professionally and personally throughout the year.`, imageUrl: "/About us/Professional Development- Board of directors _converted.avif" },
//     { id: 12, title: "International Service Development Team", description: `The International Service Development team focuses on expanding our club's global outreach in an era of globalization. With the vision to promote the presence of the Rotaract Club of TCET across districts and around the world, this team works to uphold our club's ideology on an international level. Their efforts foster connections and collaborations, enhancing our impact beyond borders.`, imageUrl: "/About us/International Services Board of directors_converted.avif" },
//     { id: 13, title: "Marketing Team", description: `The marketing team focuses on securing partnerships and resources to support our club’s initiatives. By building strong relationships with sponsors, they ensure the financial backing needed to drive our events and projects. Their efforts play a crucial role in sustaining and expanding the impact of the Rotaract Club of TCET.`, imageUrl: "/About us/Marketing- Board of Directors_converted.avif" },

// ];

// const AvenuesofService = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     };
//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
//     };
//     return (
//         <div className="flex flex-col items-center justify-center my-10 mx-2">
//             <div className=" w-full max-w-5xl flex max-sm:flex-col justify-center items-center gap-x-4 gap-y-4">
//                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#98430A] to-[#FDD24C] ">
//                     Avenues of Service
//                 </h1>
//                 <div className="flex gap-x-2 ">
//                     <button onClick={prevSlide} className="bg-[#FFEDD4] text-black p-1 md:p-3 rounded-full  ">
//                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                     </button>
//                     <button onClick={nextSlide} className="bg-[#FFEDD4] text-black p-1 md:p-3 rounded-full ">
//                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//             <div className="relative w-full max-w-5xl bg-[#fef9eb] border-2 border-[#ccc] rounded-2xl shadow-lg overflow-hidden my-5">
//                 <div className="flex max-sm:flex-col  items-center">
//                     <img src={slides[currentIndex].imageUrl} alt={slides[currentIndex].title} className={`${slides[currentIndex].id == 13 ? "" : ""} md:w-1/2 object-cover rounded-lg`} />
//                     <div className="p-2 md:p-4 md:w-1/2">
//                         <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-center my-5 md:my-10">{slides[currentIndex].title}</h2>
//                         <p className="text-xs md:text-sm lg:text-lg text-justify">{slides[currentIndex].description}</p>
//                     </div>
//                 </div>
//                 <div className="absolute top-4 right-4 flex space-x-2">
//                     {slides.map((slide, index) => (
//                         <button key={slide.id} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#FE7011]' : 'bg-black'}`}></button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default AvenuesofService;


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