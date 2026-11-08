import { lazy, Suspense } from 'react';

import { PageLoader } from '@/components/PageLoader';
import { Navbar } from '@/components/Navbar';
import { MarketTicker } from '@/components/MarketTicker';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Founder } from '@/sections/Founder';
import { Expertise } from '@/sections/Expertise';
import { Technology } from '@/sections/Technology';
import { Projects } from '@/sections/Projects';
import { Vision } from '@/sections/Vision';
import { Contact } from '@/sections/Contact';

const Showcase = lazy(() =>
  import('@/sections/Showcase').then((m) => ({ default: m.Showcase }))
);

function App() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <Hero />
        <MarketTicker />
        <About />
        <Founder />
        <Expertise />
        <Technology />
        <Projects />
        <Suspense fallback={<div className="section-pad bg-base-900" />}>
          <Showcase />
        </Suspense>
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
