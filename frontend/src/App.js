import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LandingPage from "./screens/Landingpage/LandingPage";
import MyNotes from "./screens/Mynotes/MyNotes";
import LoginPage from "./screens/Loginpage/LoginPage";
import RegisterPage from "./screens/Registerpage/RegisterPage";
import CreateNote from "./screens/Createnote/CreateNote";
import UpdateNote from "./screens/Singlenote/UpdateDeleteNote";
const App = () => (
  <Router>
    <main>
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/createnote" component={CreateNote} />
      <Route path="/note/:id" component={UpdateNote} />
      <Route path="/mynotes" component={MyNotes} />
    </main>
    <Footer />
  </Router>
);

export default App;
