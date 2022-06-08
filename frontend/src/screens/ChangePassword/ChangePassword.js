import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Main from "../../components/Main";
import "./ChangePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdatePw = useSelector((state) => state.userUpdatePw);
  const { loading, error, success } = userUpdatePw;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, password, confirmPassword));
    resetHandler();
    // history.push("/mynotes");
    toast("Password Updated Successfully");
  };
  const resetHandler = () => {
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Main title="CHANGE PASSWORD">
        <div>
          <Row className="passwordContainer">
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" varient="primary">
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Main>
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
