import React from "react";
import Container from "./Container.js";
import Row from "./Row.js";
import Col from "./Col.js";

const ListItem = props => (
    <li className="list-group-item">
        <Container>
            <Row>
                <Col size="md-12">
                    <h3>{props.title}</h3>
                    <p>Date: {props.date}</p>
                    <a rel="noreferrer noopener" target="_blank" href={props.href}>
                        Go to article!
                    </a>
                </Col>
            </Row>
        </Container>
    </li>

);

export default ListItem;
