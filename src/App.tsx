import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Community from "./components/Community";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <Community />
      <Footer />
    </main>
  );
}

export default App;
