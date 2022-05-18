import React from "react";
import { useState, useEffect } from "react";
import Main from "../../components/Main";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.css";
import { useHistory } from "react-router-dom";
import { login } from "../../actions/userActions";

const LoginPage = () => {
  // window.mango = history;
  const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Main title="LOGIN">
      <div className="loginContainer">
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form style={{ marginTop: 20 }} onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {error && <div className="error-msg">{error}</div>} */}
            {/* {emailError && <div className="error-msg">{emailError}</div>} */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* {error && <div className="error-msg">{error}</div>} */}
            {/* {passwordError && <div className="error-msg">{passwordError}</div>} */}
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
