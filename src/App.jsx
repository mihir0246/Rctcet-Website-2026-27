
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import { ThemeProvider } from './context/themeContext';
import { HelmetProvider } from 'react-helmet-async';

const Home = lazy(() => import('./pages/Home'));
const Achievement = lazy(() => import('./pages/Achievement').then(m => ({ default: m.Achievement })));
const TeamPage = lazy(() => import('./pages/MeetTheTeam'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const RegistrationForm = lazy(() => import('./pages/Registration'));
const UpcomingEvents = lazy(() => import('./pages/UpcomingEvents'));
const EventRegistration = lazy(() => import('./pages/EventRegistration'));
const Avenue = lazy(() => import('./Components/Avenue').then(m => ({ default: m.Avenue })));
const SaaFineTable = lazy(() => import('./Components/Admin/SaaFineTable'));
const FeedBack = lazy(() => import('./Components/Feedback/FeedBack'));
const AttendanceAdmin = lazy(() => import('./pages/AttendanceAdmin'));
function App() {
  useEffect(() => {
    // Coldstart the backend
    fetch(`${import.meta.env.VITE_CHATBOT_API_URL}/activate`)
      .then(() => console.log('Backend wake-up initiated'))
      .catch(err => console.error('Failed to wake up backend:', err));
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router basename="/">
          <Suspense fallback={<div className="flex h-screen w-full items-center justify-center p-4"><p className="text-xl font-semibold">Loading...</p></div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="projects" element={<Projects />} />
                <Route path="about" element={<About />} />
                {/* club hub start */}
                <Route path="avenue" element={<Avenue />} />
                <Route path="achievement" element={<Achievement />} />
                <Route path="saa-fine" element={<SaaFineTable />} />
                <Route path="meet-the-team" element={<TeamPage />} />
                <Route path="feedback" element={<FeedBack />} />
                <Route path="admin/attendance" element={<AttendanceAdmin />} />

                {/* club hub finish */}
                <Route path="join" element={<RegistrationForm />} />
                <Route path="events" element={<UpcomingEvents />} />
                <Route path="event/:eventId" element={<EventRegistration />} />

              </Route>
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
