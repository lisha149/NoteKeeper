import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useHistory } from "react-router-dom";
import "./CreateNote.css";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("PRIVATE");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category, visibility));
    resetHandler();
  };

  const draftSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category, visibility, "DRAFT"));
    resetHandler();
  };
  useEffect(() => {
    if (noteCreate.note) {
      if (noteCreate.note.status.toLowerCase() === "published") {
        history.push("/mynotes");
      } else {
        history.push("/draft");
      }
      history.go();
    }
  }, [history, noteCreate]);
  return (
    <Main title="Create a Note">
      <div className="createNoteContainer">
        <Card>
          <Card.Header>Create a new Note</Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              {error && <Error variant="danger">{error}</Error>}

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  placeholder="Enter the title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  value={content}
                  placeholder="Enter the content"
                  rows={4}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="content"
                  value={category}
                  placeholder="Enter the Category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="visibility">
                <Form.Label>Visibility</Form.Label>
                <div className="mb-3">
                  {["Public", "Private"].map((status) => (
                    <Form.Check
                      inline
                      type="radio"
                      id={`default-radio-1`}
                      name="visibility"
                      label={status}
                      onChange={(e) => setVisibility(status.toUpperCase())}
                      checked={
                        visibility.toLowerCase() === status.toLowerCase()
                      }
                    />
                  ))}
                </div>
              </Form.Group>

              {loading && <Loading size={50} />}

              <Button
                type="submit"
                variant="primary"
                style={{ flexDirection: "row", marginTop: 10 }}
                onClick={submitHandler}
              >
                Publish
              </Button>

              <Button
                type="submit"
                className="mx-2"
                variant="info"
                style={{ flexDirection: "row", marginTop: 10 }}
                onClick={draftSubmitHandler}
              >
                Save as draft
              </Button>

              <Button
                className="mx-2"
                onClick={resetHandler}
                variant="danger"
                style={{ flexDirection: "row", marginTop: 10 }}
              >
                Clear
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </div>
    </Main>
  );
};

export default CreateNote;
