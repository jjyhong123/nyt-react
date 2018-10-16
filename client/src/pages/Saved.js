import React, { Component } from "react";
import Container from "../components/Container.js";
import Row from "../components/Row.js";
import Col from "../components/Col.js";
import Jumbotron from "../components/Jumbotron.js";
import List from "../components/List.js";
import ListItem from "../components/ListItem.js";
import API from "../util/API.js";
import { Link } from "react-router-dom";

class Saved extends Component {

  // Setting the initial values
  state = {
    savedArticles: []
  };

  componentDidMount() {
    this.loadArticles();
  };

  loadArticles() {
    API.getArticles()
    .then(res => this.setState({ savedArticles: res.data }))
    .catch(err => console.log(err))
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>

        <Jumbotron />
        <Container>
        <Link to={"/"}><p>← Back to article search</p></Link>  
          <Row>
            <Col size="md-12">
              <div className="card">
                <div className="card-header">
                  <strong>
                    <i className="fa fa-list-alt"></i> Saved Articles</strong>
                </div>
                <div className="card-body">
                  {!this.state.savedArticles.length ? (
                    <h1 className="text-center">No Saved Articles</h1>
                  ) : (
                      <List>
                        {this.state.savedArticles.map(article => {
                          return (
                            <ListItem
                              key={article._id}
                              title={article.title}
                              date={article.date}
                              href={article.url}
                              buttonText="Delete"
                              onClick={() => this.deleteArticle(article._id)}
                            />
                          );
                        })}
                      </List>
                    )}
                </div>
              </div>
            </Col>
          </Row>

        </Container>

      </div>
    );   
  }

}

export default Saved;