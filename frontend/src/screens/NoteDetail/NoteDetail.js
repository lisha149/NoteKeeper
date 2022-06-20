import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { detailNoteAction, listNotes } from "../../actions/notesActions";
import Main from "../../components/Main";
import axios from "axios";
import "./NoteDetail.css";

const NoteDetail = ({ match }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDetail = useSelector((state) => state.noteDetail);
  const { loading, error } = noteDetail;

  const [newComment, setNewComment] = useState("");
  const handleSubmitComment = (e) => {
    e.preventDefault();
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: newComment,
      }),
    })
      .then((resp) => resp.json())
      .then((addcomment) => {
        // handleAddComment(addcomment);
        e.target.reset();
      });
    setNewComment("");
  };
  const history = useHistory();
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
    };
    fetching();
    dispatch(detailNoteAction());
  }, [match.params.id]);

  return (
    <Container>
      <Main title={`Details`}>
        <div className="noteDetails">
          <Card>
            <Card.Header>{title}</Card.Header>
            <Card.Body>
              <h4>
                <span class="badge rounded-pill bg-info">
                  Category-{category}
                </span>
              </h4>
              <h5>{content}</h5>
              <i className="center">Author: {userInfo.name}</i>
            </Card.Body>
            <hr />
            <h4 className="text">Add a comment</h4>
            <Form onSubmit={handleSubmitComment} className="grid-container">
              <>
                <img src={userInfo.pic} className="profilePic" />
                <textarea
                  className="comment-form-textarea"
                  type="text"
                  name="comment"
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ height: 40, width: 150 }}
                >
                  Comment
                </Button>
              </>
            </Form>
          </Card>
        </div>
      </Main>
    </Container>
  );
};

export default NoteDetail;
