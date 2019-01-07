import React from "react";
import Col from "../Col.js";
import "./ListItem.css";

const ListItem = props => (
    <div>
        <li className="list-group-item list-group-item-primary">
            <div className="row justify-content-center">
                <Col size="md-9">
                    <p><strong>Synopsis: </strong>{props.title}</p>
                    <p><strong>Date: </strong>{props.date}</p>
                    <a rel="noreferrer noopener" target="_blank" href={props.href}>
                        Go to article!
                    </a>
                </Col>
                <Col size="md-1">
                </Col>
                <Col size="md-auto">
                    <div className="delete-btn-div text-center">
                        <button className="btn btn-dark" onClick={props.onClick}>{props.buttonText}</button>
                    </div>
                </Col>
            </div>

        </li>
    </div>
);

export default ListItem;
