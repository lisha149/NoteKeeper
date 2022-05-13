import React from "react";
import { useState, useEffect } from "react";
import Main from "../../components/Main";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./LoginPage.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginPage = ({ history }) => {
  window.mango = history;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/mynotes");
      history.go();
    }
  }, [history, emailError]);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email Required");
      console.log("I am at empty email condition");
    }
    if (!password) {
      setPasswordError("Password Required");
      console.log("I am at empty password condition");
    }
    console.log("Email error:" + emailError);
    console.log("Password error:" + passwordError);
    if (!emailError && !passwordError) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/auth/login",
          {
            email,
            password,
          },
          config
        );
        setLoading(false);
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));

        history.push("/mynotes");
        history.go();
        // window.location.reload();
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    }
  };
  const handleEmailChange = (e) => {
    setEmailError("");
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordError("");
    setPassword(e.target.value);
  };
  return (
    <Main title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}

        <Form style={{ marginTop: 20 }} onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={handleEmailChange}
              // onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error-msg">{emailError}</div>}
            {/* <br />
            {emailError && <div className="error-msg">{emailError}</div>} */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
              // onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="error-msg">{passwordError}</div>}
          </Form.Group>
          <Button
            style={{ flexDirection: "row", marginTop: 10 }}
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User ? <a href="/register">Register Here</a>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default LoginPage;
