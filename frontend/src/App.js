import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/Landingpage/LandingPage";
import MyNotes from "./screens/Mynotes/MyNotes";
import LoginPage from "./screens/Loginpage/LoginPage";
import RegisterPage from "./screens/Registerpage/RegisterPage";
import ProfilePage from "./screens/Profilepage/ProfilePage";
import CreateNote from "./screens/Createnote/CreateNote";
import UpdateNote from "./screens/Singlenote/UpdateDeleteNote";
import { useState } from "react";
import ChangePassword from "./screens/ChangePassword/ChangePassword";
function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <Router>
        <Header setSearch={(s) => setSearch(s)} />
        <main>
          <Route path="/" component={LandingPage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/createnote" component={CreateNote} />
          <Route path="/note/:id" component={UpdateNote} />
          <Route
            path="/mynotes"
            component={({ history }) => (
              <MyNotes search={search} history={history} />
            )}
          />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
