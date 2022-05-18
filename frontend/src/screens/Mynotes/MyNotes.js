import React, { useEffect } from "react";
import Main from "../../components/Main";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Button, Card, Badge } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../actions/notesActions";
import ReactMarkdown from "react-markdown";
const MyNotes = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
    }
  };
  console.log(notes);
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Header />
      <Main title={`Welcome ${userInfo.name} `}>
        <Link to="createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {notes?.reverse().map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                    {note.title}
                  </Accordion.Toggle>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <span class="badge rounded-pill bg-info">
                      Category -{note.category}
                    </span>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </Main>
    </>
  );
};

export default MyNotes;
