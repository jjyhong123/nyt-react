import axios from "axios";

export default {
  // Scrubs NYT for articles
  scrubArticles: function (queryObj) {
    return axios.get("/scrub", { params: queryObj });
  },
  // Gets all articles in database
  getArticles: function () {
    return axios.get("/api/articles");
  },
  // Saves an article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  },
  // Deletes the article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  }

};
