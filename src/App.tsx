import { Layout } from "@/components/layout/Layout";
import { Providers } from "@/context/providers";
import { HomePage } from "@/pages/HomePage";
import { SearchPage } from "@/pages/SearchPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Providers>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </Providers>
  );
}

export default App;
