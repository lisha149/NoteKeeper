import React, { useState } from "react";
import Main from "../../components/Main";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useHistory } from "react-router-dom";

import "./CreateNote.css";
const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("PRIVATE");

  let status = ["PUBLIC", "PRIVATE"];

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category, visibility));

    history.push("/mynotes");
    resetHandler();
  };

  return (
    <Main title="Create a Note">
      <div className="createNoteContainer">
        <Card>
          <Card.Header>Create a new Note</Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

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
                <Form.Check>
                  {status.map((result) => (
                    <div className="mb-3">
                      <>
                        <input
                          type="radio"
                          value={result}
                          name="radiovalues"
                          checked={visibility === result}
                          onChange={(e) => setVisibility(e.target.value)}
                        />
                        {result}
                      </>
                    </div>
                  ))}
                  {/* <h5>{visibility}</h5> */}
                </Form.Check>
              </Form.Group>

              {loading && <Loading size={50} />}

              <Button
                type="submit"
                variant="primary"
                style={{ flexDirection: "row", marginTop: 10 }}
                onClick={submitHandler}
              >
                Create Note
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
