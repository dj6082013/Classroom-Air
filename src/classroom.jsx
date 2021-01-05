import React, { useState } from 'react';
import {
  Container, ButtonGroup, Button, Card, CardDeck, ProgressBar, ListGroup,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import mqtt from 'mqtt';

const SENSOR_KEYS = ['temp', 'RH', 'PM2.5', 'CO2', 'CO'];

function Classroom() {
  const { roomID } = useParams();

  const [data, setData] = useState({});
  const [status, setStatus] = useState('關');
  const [voteOn, setVoteOn] = useState(0);
  const [voteOff, setVoteOff] = useState(0);

  const client = mqtt.connect(process.env.REACT_APP_MQTT_BROKER);
  client.on('connect', () => {
    client.subscribe(`${roomID}/#`, (err) => {
      if (!err) client.publish('presence', 'Hello mqtt');
    });
  });
  client.on('message', (topic, message) => {
    const path = topic.split('/');
    switch (path[1]) {
      case 'vote': {
        const value = parseInt(message.toString(), 10);
        if (path[2] === 'on') setVoteOn(value);
        if (path[2] === 'off') setVoteOff(value);
        break;
      }
      case 'result': {
        if (message.toString() === '1') setStatus('開');
        else setStatus('關');
        break;
      }
      case 'sensors': {
        if (SENSOR_KEYS.includes(path[3])) {
          data[path[3]] = message.toString();
          if (path[3] === 'CO2') data.CO2 = Math.round(data.CO2);
          setData(data);
        }
        break;
      }
      case 'com3': {
        data.Comfort = message.toString();
        setData(data);
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
        <strong>投票規則</strong>
        <p>只要某方超過65%就獲勝, 若都沒超過系統則自動運行</p>
      </div>
      <div className="pb-4 text-center w-100">
        <strong>目前狀態</strong>
        <p className="display-1">{status}</p>
        <ProgressBar>
          <ProgressBar variant="success" now={voteOn} max={voteOn + voteOff} key={1} />
          <ProgressBar variant="danger" now={voteOff} max={voteOn + voteOff} key={2} />
        </ProgressBar>
      </div>
      <p>
        參考氣象局舒適度的公式以及考量到在一定程度上co2濃度過高會導致頭暈、想睡等負面影響，
        我們利用測量出來的數值代入我們設計的公式，最後得出0~6的舒適度等第，儀器在小於等於2的時候通風裝置自動開啟，其它時間則是預設為關閉。
      </p>
      <CardDeck className="mb-4">
        {
          Object.keys(data).map((key) => (
            <Card className="text-center">
              <Card.Header className="text-uppercase font-weight-bold">{key}</Card.Header>
              <Card.Body className="display-4">{data[key]}</Card.Body>
            </Card>
          ))
        }
      </CardDeck>
      <div className="text-center">
        <CardDeck>
          <Card>
            <Card.Header>開啟裝置</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>好處1：讓室內空氣更加清新。</ListGroup.Item>
              <ListGroup.Item>好處2：內外空氣流通，降低疾病傳染風險。</ListGroup.Item>
              <ListGroup.Item>壞處1：可能讓室內空氣溫度稍微上升。</ListGroup.Item>
              <ListGroup.Item>壞處2：耗能以及需要定期清洗濾網。</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>關閉裝置</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>好處1：室內溫度保持在空調所設定的溫度。</ListGroup.Item>
              <ListGroup.Item>好處2：節能以及清洗濾網週期延長。</ListGroup.Item>
              <ListGroup.Item>壞處1：室內CO2累積導致頭暈、想睡。</ListGroup.Item>
              <ListGroup.Item>壞處2：內外空氣不流通，增加疾病傳染風險。</ListGroup.Item>
            </ListGroup>
          </Card>
        </CardDeck>
        <h2>你可以投票</h2>
        <ButtonGroup size="lg" className="w-100">
          <Button variant="success" onClick={handleVoteOn}>On</Button>
          <Button variant="danger" onClick={handleVoteOff}>Off</Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default Classroom;
