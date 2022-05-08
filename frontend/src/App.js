import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/Landingpage/LandingPage";
import MyNotes from "./screens/Mynotes/MyNotes";

const App = () => (
  <Router>
    <Header />
    <main>
      <Route path="/" component={LandingPage} exact />
      <Route path="/mynotes" component={MyNotes} />
    </main>
    <Footer />
  </Router>
);

export default App;
