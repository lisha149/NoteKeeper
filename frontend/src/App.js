import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/Landingpage/LandingPage";

const App = () => (
  <>
    <Header />
    <main>
      <LandingPage />
    </main>

    <Footer />
  </>
);

export default App;
