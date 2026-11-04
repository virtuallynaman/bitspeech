import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Features from "@/components/landing/features";
import Progress from "@/components/landing/progress";
import Audience from "@/components/landing/audience";
import Cta from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Progress />
        <Audience />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
