import HeroSection from "./components/home/HeroSection";
import Layout from "./components/layout/Layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div>
      <Analytics />
      <SpeedInsights />
      <Layout>
        <HeroSection />
      </Layout>
    </div>
  );
}

export default App;
