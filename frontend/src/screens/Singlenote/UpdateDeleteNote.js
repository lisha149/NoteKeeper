import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateNoteAction, deleteNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import "./Update.css";
const UpdateNote = ({ match }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const history = useHistory();
  // hook
  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/mynotes");
    window.location.reload();
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/mynotes");
    window.location.reload();
  };

  return (
    <Main title="Edit Note">
      <div className="updateNoteContainer">
        <Card>
          <Card.Header>Edit your Note</Card.Header>
          <Card.Body>
            <Form onSubmit={updateHandler}>
              {loadingDelete && <Loading />}

              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="content"
                  placeholder="Enter the Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button
                variant="primary"
                type="submit"
                style={{ flexDirection: "row", marginTop: 10 }}
              >
                Update Note
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                style={{ flexDirection: "row", marginTop: 10 }}
                onClick={() => deleteHandler(match.params.id)}
              >
                Delete Note
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            Updated on - {date.substring(0, 10)}
          </Card.Footer>
        </Card>
      </div>
    </Main>
  );
};

export default UpdateNote;
