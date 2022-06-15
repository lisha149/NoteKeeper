import React, { useEffect } from "react";
import Main from "../../components/Main";
import { Button, Card, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import WarningIcon from "@mui/icons-material/Warning";
import "./MyDraft.css";
const MyDraft = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;
  const history = useHistory();

  const deleteDraft = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteNoteAction(id));
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(listNotes(true));
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successUpdate, successDelete]);

  return (
    <Container>
      <Main title={`My Drafts`}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}

        {loading && <Loading />}
        {loadingDelete && <Loading />}

        {!Array.isArray(notes) || !notes.length ? (
          <>
            <WarningIcon
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 300,
                display: "flex",
              }}
            />
            <h2>NO DATA FOUND</h2>
          </>
        ) : (
          notes
            ?.filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((note) => (
              <Accordion>
                <Card style={{ margin: 10 }} key={note._id}>
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
                      <Accordion.Toggle
                        as={Card.Text}
                        variant="link"
                        eventKey="0"
                        className="grid-container"
                      >
                        {note.visibility.toLowerCase() === "private" ? (
                          <LockOutlinedIcon className="head" />
                        ) : (
                          <PublicOutlinedIcon className="head" />
                        )}
                        <div>
                          {note.title}
                          <br />
                          {note.user._id !== userInfo._id ? (
                            <i className="center">Owned by {note.user.name}</i>
                          ) : null}
                        </div>
                      </Accordion.Toggle>
                    </span>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h4>
                        <span class="badge rounded-pill bg-info">
                          Category -{note.category}
                        </span>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        {note.content}
                        {userInfo._id === note.user._id ? (
                          <>
                            <Button className="mx-2" href={`/note/${note._id}`}>
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="mx-2"
                              onClick={() => deleteDraft(note._id)}
                            >
                              Delete
                            </Button>
                          </>
                        ) : null}

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
            ))
        )}
      </Main>
    </Container>
  );
};

export default MyDraft;
