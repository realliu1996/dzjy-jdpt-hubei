import Layout from './components/Layout';
import EvaluationFlow from './components/EvaluationFlow';

export default function App() {
  return (
    <Layout activeMenu="用户管理">
      <EvaluationFlow />
    </Layout>
  );
}
