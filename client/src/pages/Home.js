import React, { Component } from "react";
import Container from "../components/Container.js";
import Row from "../components/Row.js";
import Col from "../components/Col.js";
import Jumbotron from "../components/Jumbotron/Jumbotron.js";
import List from "../components/List.js";
import ListItem from "../components/ListItem/ListItem.js";
import API from "../util/API.js";
import { Link } from "react-router-dom";

import NYTLogo from "../util/images/nyt_logo.png" //

class Home extends Component {

  // Setting the initial values
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: "",
    endYearDisabled: true,
    formSubmitted: false,
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });

    if (name === "startYear") {
      this.setState({
        endYearDisabled: false
      })
    }
  };

  // When the form is submitted, make an axios call to the NYT API
  handleFormSubmit = () => {
    if (this.state.topic && this.state.startYear && this.state.endYear) {
      API.scrubArticles({
        'api-key': "45463f06fa164c8fa0ebdb8e0b188c4e",
        'q': this.state.topic,
        'begin_date': this.state.startYear + "0101",
        'end_date': this.state.endYear + "0101",
        'page': "0"
      })
        .then(res => this.setState({ articles: res.data, topic: "", startYear: "", endYear: "", endYearDisabled: true, formSubmitted: true }))
        .catch(err => console.log(err));
    }
  };

  // When the save button is clicked, save the article to MongoDB
  saveArticle = articleData => {
    API.saveArticle(articleData)
      .then(res => alert("Article successfully saved."))
      .catch(err => console.log(err));
  }

  render() {
    let formSubmitted = this.state.formSubmitted;
    let noResultsMessage;
    if (formSubmitted) {
      noResultsMessage = "There are no articles with those keywords during the specified interval."
    } else {
      noResultsMessage = "Form not yet submitted."
    }

    return (

      <Container>

        <Jumbotron />

        <br />

        <Row>
          <Col size="md-12">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="fa fa-list-alt"></i> Search Parameters</strong>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-row justify-content-md-center text-center">
                    <div className="col-md-6 mb-2">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Topic"
                        name="topic"
                        value={this.state.topic}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="col-md-2 mb-2">
                      <select
                        className="form-control"
                        name="startYear"
                        value={this.state.startYear}
                        onChange={this.handleInputChange}
                      >
                        <option value="" select="true" disabled>Start Year</option>
                        {Array.from({ length: (new Date().getFullYear()) - 1850 }, (v, i) => (new Date().getFullYear()) - i).map(year => {
                          return (
                            <option key={year}>{year}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="col-md-2 mb-2">
                      <select
                        className="form-control"
                        name="endYear"
                        value={this.state.endYear}
                        onChange={this.handleInputChange}
                        disabled={this.state.endYearDisabled}
                      >
                        <option value="" select="true" disabled>End Year</option>
                        {Array.from({ length: (new Date().getFullYear()) - this.state.startYear + 1 }, (v, i) => (new Date().getFullYear()) - i).map(year => {
                          return (
                            <option key={year}>{year}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="col-md-auto">
                      <button type="button" className="btn btn-dark" onClick={this.handleFormSubmit}>Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>

        <br />

        <Row>
          <Col size="md-12">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="fa fa-list-alt"></i> Results</strong>
              </div>
              <div className="card-body">
                {!this.state.articles.length ? (
                  <h5 className="text-center">{noResultsMessage}</h5>
                ) : (
                    <List>
                      {this.state.articles.map(article => {
                        return (
                          <ListItem
                            key={article.snippet}
                            title={article.snippet}
                            date={article.pub_date.substr(0, article.pub_date.indexOf("T"))}
                            href={article.web_url}
                            buttonText="Save"
                            onClick={() => this.saveArticle({ title: article.snippet, date: article.pub_date, url: article.web_url })}
                          />
                        );
                      })}
                    </List>
                  )}
              </div>
            </div>
          </Col>
        </Row>

        <div className="text-right" style={{ padding: "5px", marginBottom: "30px" }}><Link to={"/saved"}><span>Click to view saved articles! →</span></Link></div>
        <div className="text-center">
          <p style={{ marginBottom: "-10px", fontFamily: "Georgia" }}>Powered by <img src={NYTLogo} /> Article Search API.</p>
        </div>

      </Container>
    );
  }
}

export default Home;
