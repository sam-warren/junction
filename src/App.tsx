import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./config/routes";

function App() {
  return (
    <Router>
      <Analytics />
      <SpeedInsights />
      <Layout>
        <Suspense fallback={<div className="min-h-[60vh]" aria-hidden />}>
          <Routes>
            {ROUTES.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
