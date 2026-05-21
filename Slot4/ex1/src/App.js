import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPizza from './components/MyPizza';
import { pizzaData } from './data/pizzaData';
import PizzaList from './components/PizzaList';

function App() {
  // Khai báo 1 object profile chứa thông tin id, name, email, github, avatar
  const profile = {
    ID: "DE190049",
    name: "Nguyễn Duy Quang",
    email: "kingdn522005@gmail.com",
    github: "https://github.com/kingDlight",
    avatar: "/images/avatars/av1.jpg"
  };

  return (
    <div>
      <h1> welcome my web pizza</h1>
      <PizzaList />
      <Footer profile={profile} />
    </div>
  );
}

export default App;
