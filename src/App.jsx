import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import PlanDetails from "./pages/PlanDetails";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans/:planId" element={<PlanDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
