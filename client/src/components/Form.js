import React, { Component } from "react";

class Form extends Component {
  // Setting the initial values
  state = {
    topic: "",
    startYear: "",
    endYear: ""
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, make an axios call to the NYT API
  handleFormSubmit = event => {
    event.preventDefault();
    // 
    this.setState({ topic: "", startYear: "", endYear: "" });
  };

  render() {
    return (
      <form>
        <p>Topic: {this.state.topic}</p>
        <p>Start year: {this.state.startYear}</p>
        <p>End year: {this.state.endYear}</p>
        <input
          type="text"
          placeholder="Topic"
          name="topic"
          value={this.state.topic}
          onChange={this.handleInputChange}
        />
        <input
          type="number"
          placeholder="Start year"
          name="startYear"
          value={this.state.startYear}
          onChange={this.handleInputChange}
        />
        <input
          type="number"
          placeholder="End year"
          name="endYear"
          value={this.state.endYear}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleFormSubmit}>Submit</button>
      </form>
    );
  }
}

export default Form;
