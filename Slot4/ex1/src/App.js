import './App.css';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Badge } from 'react-bootstrap';
import PizzaList from './components/PizzaList';
import MyCarousel from './components/MyCarousel';
import MyNavbar from './components/MyNavbar';

function App() {
  const profile = {
    ID: "DE190049",
    name: "Nguyễn Duy Quang",
    email: "kingdn522005@gmail.com",
    github: "https://github.com/kingDlight",
    avatar: "/images/avatars/av1.jpg"
  };

  return (
    <div className="App">
      {/* Thanh điều hướng Navbar */}
      <MyNavbar />
      
      <Container className="py-4">
        <header className="app-hero text-center mb-5 rounded-4 shadow-sm p-4">
          <h1 className="display-5 fw-bold mb-3">Welcome to My Pizza Shop</h1>
          <p className="lead text-secondary">Khám phá menu pizza hấp dẫn với giá ưu đãi mỗi ngày.</p>
          <Button variant="danger" size="lg">Khám phá ngay</Button>
        </header>

        {/* Thêm component Carousel vào đây */}
        <MyCarousel />

        <section className="pizza-section mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Pizza hôm nay</h2>
            <Badge bg="danger" pill>Hot</Badge>
          </div>
          <PizzaList />
        </section>
      </Container>

      <Footer profile={profile} />
    </div>
  );
}

export default App;
