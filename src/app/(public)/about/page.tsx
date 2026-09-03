import { AboutHero } from '@/components/about/AboutHero';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { VisionMission } from '@/components/about/VisionMission';
import { TeamSection } from '@/components/about/TeamSection';
import { CTASection } from '@/components/home/CTASection';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'About Us',
  description: `Learn more about ${siteConfig.name} and our commitment to home healthcare.`,
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <WhoWeAre />
      <VisionMission />
      <TeamSection />
      <CTASection />
    </main>
  );
}

