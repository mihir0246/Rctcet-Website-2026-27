
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import { ThemeProvider } from './context/themeContext';
import { HelmetProvider } from 'react-helmet-async';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './Components/Admin/ProtectedRoute';

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

// Admin pages (outside main Layout — no navbar/footer)
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminCreateEvent = lazy(() => import('./pages/Admin/CreateEvent'));

function App() {
  useEffect(() => {
    // Coldstart the backend
    fetch(`${import.meta.env.VITE_CHATBOT_API_URL}/activate`)
      .then(() => console.log('Backend wake-up initiated'))
      .catch(err => console.error('Failed to wake up backend:', err));
  }, []);

  const Loader = (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AdminAuthProvider>
          <Router basename="/">
            <Suspense fallback={Loader}>
              <Routes>
                {/* ── Admin routes (no Layout wrapper) ── */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/create-event" element={<ProtectedRoute><AdminCreateEvent /></ProtectedRoute>} />

                {/* ── Public routes (with Layout) ── */}
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
        </AdminAuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
