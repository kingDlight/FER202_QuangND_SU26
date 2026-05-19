
import './App.css';
import Hello from './components/Hello';
import People from './components/People';
import Subject from './components/Subject';
function App() {
  return (
    <div className='greeting-container'>
      <Hello />
      <Subject />
      <People />
    </div>
  );
}

export default App;
