import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Mern Ecom</h1> <HomeScreen></HomeScreen>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
