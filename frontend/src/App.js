import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/Landingpage/LandingPage";
import MyNotes from "./screens/Mynotes/MyNotes";
import LoginPage from "./screens/Loginpage/LoginPage";
import RegisterPage from "./screens/Registerpage/RegisterPage";

const App = () => (
  <Router>
    <Header />
    <main>
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} exact />
      <Route path="/mynotes" component={MyNotes} />
    </main>
    <Footer />
  </Router>
);

export default App;
