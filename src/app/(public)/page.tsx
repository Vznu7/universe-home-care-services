import { Hero } from '@/components/home/Hero';
import { ServicesSection } from '@/components/home/ServicesSection';
import { HowWeWork } from '@/components/home/HowWeWork';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Home Healthcare & Nursing Care in Coimbatore | ${siteConfig.name}`,
  description: siteConfig.description,
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <HowWeWork />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </main>
  );
}

