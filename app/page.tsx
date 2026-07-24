import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Highlights from "@/components/Highlights";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import StatsMarquee from "@/components/StatsMarquee";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen overflow-x-clip bg-[#F2F2F0] text-[#292929]">
      <IntroLoader />
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <StatsMarquee />
      <Highlights />
      <Projects />
      <Experience />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
