// app/page.tsx
import TransactionsChart from '../components/TransactionsChart';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <TransactionsChart />
    </div>
  );
};

export default Home;