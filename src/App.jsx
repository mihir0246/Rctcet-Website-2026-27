
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import { ThemeProvider } from './context/themeContext';
import { HelmetProvider } from 'react-helmet-async';

const Home = lazy(() => import('./pages/home'));
const GetInvolvedHero = lazy(() => import("./Components/getInvolved/GetInvolvedHero"));
const Achievement = lazy(() => import('./pages/Achievement').then(m => ({ default: m.Achievement })));
const TeamPage = lazy(() => import('./pages/meetTheTeam'));
const About = lazy(() => import('./pages/about'));
const Projects = lazy(() => import('./pages/projects'));
const ContactForm = lazy(() => import('./pages/contactus'));
const Avenue = lazy(() => import('./Components/Avenue').then(m => ({ default: m.Avenue })));
const SaaFineTable = lazy(() => import('./Components/withBackend/SaaFineTable'));
const FeedBack = lazy(() => import('./Components/withBackend/FeedBack'));


function App() {
  useEffect(() => {
    // Coldstart the backend
    fetch('https://rc-chatbot.onrender.com/activate')
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
            <Route path="get-involved" element={<GetInvolvedHero />} />
            <Route path="avenue" element={<Avenue />} />
            <Route path="achievement" element={<Achievement />} />
            <Route path="saa-fine" element={<SaaFineTable/>} />
            <Route path="meet-the-team" element={<TeamPage />} />
            <Route path="feedback" element={<FeedBack />} />
            
            {/* club hub finish */}
            <Route path="contact" element={<ContactForm />} />
            
          </Route>
        </Routes>
      </Suspense>
    </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
