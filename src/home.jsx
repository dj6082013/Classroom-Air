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
            <h1>空氣一吉棒</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="p-5">
        <Row>
          <Col md>
            <h2>系統介紹</h2>
            <p>在教室場域內，佈置多個sensor，監測教室內CO、CO2、溫度、濕度、PVOC…等參數。</p>
            <p>當有任一參數超出我們設定的範圍的時候，我們的換氣系統便會自動開啟，</p>
            <p>當室內與室外換氣完，參數降至我們設定人體舒適的參數區間後，系統會自動關閉，來達到省電、節能及智慧化的效果。</p>
            <p>此外，該系統也可透過手動或是網頁上來控制開啟與否。</p>
          </Col>
          <Col md>
            <Image src="3D_room.jpg" alt="Introduction" fluid />
          </Col>
        </Row>
      </Container>
      <hr />
      <Container className="p-5">
        <Row>
          <Col md>
            <Image src="3D_room.jpg" alt="Future Outlook" fluid />
          </Col>
          <Col md>
            <h2>未來展望</h2>
            <p>「呼吸的每一口氣，都是為了活下去。」</p>
            <p>那麼，你想要更健康的活著嗎？</p>
            <p>根據台敏醫學會楊崑德理事長所說：</p>
            <p>「預防過敏應該從孕期就要做好完善預防！懷孕時就應避免暴露於二手菸、PM2.5、塑化劑的環境，來達成預防新生兒過敏的狀況。」</p>
            <p>在其中PM 2.5的部分，是我們需要加強防護的部分，</p>
            <p>因此在未來我們可能考慮使用更高係數的濾網或是增加濾網袋來收集灰塵等等方便換氣系統清洗。</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
