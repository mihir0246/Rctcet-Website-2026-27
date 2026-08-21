import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import SEO from "../Components/SEO";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${APPS_SCRIPT_URL}?action=getEvents`);
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background py-16 px-4 transition-colors">
      <SEO title="Upcoming Events" description="Check out the latest upcoming events by the Rotaract Club of TCET." />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight"
          >
            Upcoming <span className="text-primary">Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/60"
          >
            Join us in our latest endeavors and make a difference.
          </motion.p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 dark:bg-black/20 rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-56 bg-foreground/10" />
                <div className="p-6 flex flex-col gap-3">
                  <div className="h-6 bg-foreground/10 rounded-lg w-3/4" />
                  <div className="h-4 bg-foreground/10 rounded-lg w-full" />
                  <div className="h-4 bg-foreground/10 rounded-lg w-2/3" />
                  <div className="h-11 bg-foreground/10 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-foreground/50 text-lg font-medium">Failed to load events. Please try again later.</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="mx-auto text-foreground/20 mb-4" size={56} />
            <h3 className="text-2xl font-semibold text-foreground/50">More events coming soon!</h3>
            <p className="text-foreground/40 mt-2 text-sm">Check back later for upcoming Rotaract events.</p>
          </div>
        )}

        {/* Event cards */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.eventId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white/40 dark:bg-black/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-white/20 dark:border-white/10 flex flex-col group"
              >
                <div className="overflow-hidden relative">
                  <img
                    src={event.eventImage}
                    alt={event.eventName}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-xs font-bold bg-primary/90 text-white px-3 py-1 rounded-full">
                    {event.avenue}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-foreground leading-tight">{event.eventName}</h3>
                    <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ml-3">
                      {event.memberPrice === 'Free' && event.nonMemberPrice === 'Free'
                        ? 'Free'
                        : event.memberPrice === 'Free'
                          ? `₹${event.nonMemberPrice}`
                          : `₹${event.memberPrice}+`}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Calendar size={13} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Clock size={13} />
                      <span>{event.startTime} – {event.endTime}</span>
                    </div>
                    {event.registrationLimit && (
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Users size={13} />
                        <span>Limit: {event.registrationLimit} seats</span>
                      </div>
                    )}
                  </div>

                  <p className="text-foreground/60 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {event.eventDescription}
                  </p>

                  <Link
                    to={`/event/${event.eventId}`}
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 uppercase tracking-wider text-sm"
                  >
                    Register Now
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
