import Header from './components/Header';
import ExpenseChart from './components/ExpenseChart';
import ExpenseList from './components/ExpenseList';

function App() {
  return (
    <div style={{ backgroundColor: '#F9F9F9'}}>
      <Header />
      <ExpenseChart />
      <ExpenseList />
    </div>
  );
}

export default App;
