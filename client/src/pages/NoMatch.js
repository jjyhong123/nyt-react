import React from "react";
import Container from "../components/Container.js";
import Row from "../components/Row.js";
import Col from "../components/Col.js";
import Jumbotron from "../components/Jumbotron/Jumbotron.js";

const NoMatch = () => (
  <Container>
    <Jumbotron />
    <Row>
      <Col size="md-12">
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
