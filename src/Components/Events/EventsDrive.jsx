import { useEffect, useState } from "react";
import axios from "axios";

export default function EventsDrive() {
  const [events, setEvents] = useState(null); // null = unknown
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/getEventsDrive`
      );

      
      if (Array.isArray(res.data) && res.data.length > 0) {
        const latestEvents = res.data.slice().reverse().slice(0, 5);
        setEvents(latestEvents);
      } else {
        setEvents([]); 
      }
    } catch (error) {
      console.error("Error fetching Events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  /* 🔥 EDGE CASE HANDLING 🔥
     - While loading: show loader
     - If loaded + no events: render NOTHING
  */

  if (loading) {
    return (
      <p className="text-center mt-12 text-gray-500">
        Loading recent drives...
      </p>
    );
  }

  if (!events || events.length === 0) {
    return null; 
  }

  return (
    <section className="my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-orange-500 dark:text-yellow-400">
         Events & Drives
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="
              bg-white dark:bg-stone-800
              border border-orange-100 dark:border-stone-600
              rounded-2xl
              p-6
              shadow-md
              hover:shadow-xl
              transition-all
              hover:-translate-y-1
              flex flex-col
            "
          >
          
            <div className="mb-4">
              <span className="text-xs uppercase tracking-wide text-gray-400">
                Event / Drive
              </span>
              <h3 className="mt-1 text-lg font-semibold text-orange-500 dark:text-yellow-400 leading-snug">
                {event.eventName || "Untitled Event"}
              </h3>
            </div>

         
            <div className="border-t border-gray-200 dark:border-stone-600 my-4"></div>

           
            {event.driveLink && (
              <a
                href={event.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-auto
                  inline-flex
                  items-center
                  justify-center
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  bg-orange-500
                  dark:bg-yellow-600
                  rounded-lg
                  hover:bg-orange-600
                  dark:hover:bg-yellow-700
                  transition
                "
              >
                View Drive →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
