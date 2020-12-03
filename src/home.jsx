import React from 'react';
import {
  Container, Carousel, Col, Row, Image,
} from 'react-bootstrap';

function Home() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="3D_room.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Awesome Air</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="p-5">
        <Row>
          <Col>
            <h2>Introduction</h2>
            <p />
          </Col>
          <Col>
            <Image src="3D_room.jpg" alt="Introduction" fluid />
          </Col>
        </Row>
      </Container>
      <hr />
      <Container className="p-5">
        <Row>
          <Col>
            <Image src="3D_room.jpg" alt="Future Outlook" fluid />
          </Col>
          <Col>
            <h2>Future Outlook</h2>
            <p />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
