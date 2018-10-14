import React from "react";
import Container from "./Container.js";
import Row from "./Row.js";
import Col from "./Col.js";

const ListItem = props => (
    <li className="list-group-item">
        <Container>
            <Row>
                <Col size="xs-4 sm-2">
                    <img src={props.thumbnail || "https://placehold.it/300x300"} />
                </Col>
                <Col size="xs-8 sm-9">
                    <h3>{props.title}</h3>
                    <p>Ingredients: {props.ingredients}</p>
                    <a rel="noreferrer noopener" target="_blank" href={props.href}>
                        Go to recipe!
          </a>
                </Col>
            </Row>
        </Container>
    </li>

);

export default ListItem;
