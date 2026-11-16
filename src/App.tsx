import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import HomePage from "./app/home/HomePage";

export default function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <HomePage />
    </>
  );
}
