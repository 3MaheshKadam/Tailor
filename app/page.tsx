import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import UseCases from '@/components/landing/UseCases';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';
import HowItWorks from '@/components/landing/HowItWorks'
import FeaturesSection from '@/components/landing/Features';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks/>
      <FeaturesSection/>
       <UseCases />
      <Testimonials />
      <Footer />
    </main>
  );
}