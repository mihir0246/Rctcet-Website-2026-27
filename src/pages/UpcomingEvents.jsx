import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../Components/SEO";
import { upcomingEvents } from "../data/events";

const UpcomingEvents = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1A1612] py-16 px-4 transition-colors">
      <SEO title="Upcoming Events" description="Check out the latest upcoming events by the Rotaract Club of TCET." />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Upcoming <span className="text-orange-500">Events</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Join us in our latest endeavors and make a difference.
          </motion.p>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium text-gray-500 dark:text-gray-400">More events coming soon!</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#2D241C] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 dark:border-[#4A3B2F] flex flex-col"
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                      {event.title}
                    </h3>
                    <span className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ml-4">
                      {event.price === "Free" ? "Free" : `₹${event.price}`}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {event.description}
                  </p>
                  
                  <Link 
                    to={`/event/${event.id}`}
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                  >
                    Register for this Event
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
