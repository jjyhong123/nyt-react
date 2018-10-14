import React, { Component } from "react";
import Container from "../components/Container.js";
import Row from "../components/Row.js";
import Col from "../components/Col.js";
import Jumbotron from "../components/Jumbotron.js";
import List from "../components/List.js";
import ListItem from "../components/ListItem.js";
import API from "../util/API.js";

class Home extends Component {

  // Setting the initial values
  state = {
    articles: [],
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
    if (this.state.topic && this.state.startYear && this.state.endYear) {
      API.scrubArticles({
        'api-key': "45463f06fa164c8fa0ebdb8e0b188c4e",
        'q': this.state.topic,
        'begin_date': this.state.startYear + "0101",
        'end_date': this.state.endYear + "0101",
        'page': "0"
      })
      .then(res => this.setState({ articles: res.data, topic: "", startYear: "", endYear: "" }))
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>

        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <form>
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
            </Col>
          </Row>

          <Row>
            <Col size="md-12">
              {!this.state.articles.length ? (
                <h1 className="text-center">No Articles to Display</h1>
              ) : (
                  <List>
                    {this.state.articles.map(article => {
                      return (
                        <ListItem
                          key={article.snippet}
                          title={article.snippet}
                          date={article.pub_date}
                          href={article.web_url}
                        />
                      );
                    })}
                  </List>
                )}
            </Col>
          </Row>

        </Container>

      </div>
    );
  }

}

export default Home;
