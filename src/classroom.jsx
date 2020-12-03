import React from 'react';
import {
  Container, ToggleButtonGroup, ToggleButton, ProgressBar,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Classroom() {
  const { roomID } = useParams();
  return (
    <Container>
      <div className="p-4 w-100 text-center">
        <h1>{`Voting ${roomID}`}</h1>
        <strong>Voting Rules</strong>
        <p>This is the rules of vote.</p>
      </div>
      <div className="pb-4 text-center w-100">
        <strong>Current status</strong>
        <ProgressBar>
          <ProgressBar variant="success" now={35} key={1} />
          <ProgressBar variant="danger" now={65} key={2} />
        </ProgressBar>
      </div>
      <div className="text-center">
        <h2>You can vote</h2>
        <ToggleButtonGroup type="radio" name="options" defaultValue={-1} className="w-100">
          <ToggleButton value={1} variant="success">On</ToggleButton>
          <ToggleButton value={-1} variant="secondary">Fine</ToggleButton>
          <ToggleButton value={0} variant="danger">Off</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Container>
  );
}

export default Classroom;
