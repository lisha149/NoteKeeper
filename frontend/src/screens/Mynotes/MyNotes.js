import React from "react";
import Main from "../../components/Main";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const MyNotes = () => {
  return (
    <Main title="Welcome Palisha Shakya">
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new note
        </Button>
      </Link>
    </Main>
  );
};

export default MyNotes;
