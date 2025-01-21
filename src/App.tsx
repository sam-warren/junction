import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./config/routes";

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Analytics />
        <SpeedInsights />
        <Layout>
          <Routes>
            {ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
