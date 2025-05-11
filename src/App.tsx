import { Layout } from '@/components/layout/Layout';
import { Providers } from '@/context/providers';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <Providers>
      <Layout>
        <AppRoutes />
      </Layout>
    </Providers>
  );
}

export default App;
