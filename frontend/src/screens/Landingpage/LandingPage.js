import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingStyles.css";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Keeper</h1>
              <p className="subtitle">A safe place to keep all your notes</p>
            </div>
            <div className="buttonContainer">
              <a href="/login"></a>
              <Button size="lg" className="landingbutton">
                Login
              </Button>

              <a href="/register"></a>
              <Button
                size="lg"
                className="landingbutton"
                variant="outline-primary"
              >
                Signup
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
