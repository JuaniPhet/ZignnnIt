"use client"

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Hero />
        <TechStack />
        <About />
        <Services />
        <Projects />
        <Stats />
      </main>
      <Footer />
    </>
  );
}
