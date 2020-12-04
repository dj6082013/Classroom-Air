import React, { useState } from 'react';
import {
  Container, ButtonGroup, Button, Card, CardDeck, ProgressBar,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import mqtt from 'mqtt';

function Classroom() {
  const { roomID } = useParams();

  const [voteOn, setVoteOn] = useState(0);
  const [voteOff, setVoteOff] = useState(0);

  const client = mqtt.connect(process.env.REACT_APP_MQTT_BROKER);
  client.on('connect', () => {
    client.subscribe(`${roomID}/#`, (err) => {
      if (err) throw err;
    });
  });
  client.on('message', (topic, message) => {
    const path = topic.split('/');
    switch (path[1]) {
      case 'vote': {
        const value = parseInt(message, 10);
        if (path[2] === 'on') setVoteOn(value);
        if (path[2] === 'off') setVoteOff(value);
        break;
      }
      default:
        break;
    }
  });

  const handleVoteOn = () => {
    const value = voteOn + 1;
    client.publish(`${roomID}/vote/on`, value.toString(), {
      qos: 1,
      retain: true,
    });
  };
  const handleVoteOff = () => {
    const value = voteOff + 1;
    client.publish(`${roomID}/vote/off`, value.toString(), {
      qos: 1,
      retain: true,
    });
  };

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
          <ProgressBar variant="success" now={voteOn} max={voteOn + voteOff} key={1} />
          <ProgressBar variant="danger" now={voteOff} max={voteOn + voteOff} key={2} />
        </ProgressBar>
      </div>
      <div className="text-center">
        <CardDeck>
          <Card>
            <Card.Header>If turn on...</Card.Header>
            <Card.Text>Something happens.</Card.Text>
          </Card>
          <Card>
            <Card.Header>If turn off...</Card.Header>
            <Card.Text>Something happens.</Card.Text>
          </Card>
        </CardDeck>
        <h2>You can vote</h2>
        <ButtonGroup size="lg" className="w-100">
          <Button variant="success" onClick={handleVoteOn}>On</Button>
          <Button variant="danger" onClick={handleVoteOff}>Off</Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default Classroom;
