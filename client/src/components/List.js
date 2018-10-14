import React from "react";
// import "./List.css";

const List = props => (
    <ul className="list-group">{props.children}</ul>
);

export default List;