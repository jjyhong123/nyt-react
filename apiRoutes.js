const router = require("express").Router();
const articlesController = require("./articlesController.js");
const axios = require("axios");

router.get("/scrub", (req, res) => {
    console.log(req.query);

    axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?", { params: req.query })
    .then(results => res.json(results.data.response.docs))
    .catch(err => res.status(422).json(err));
    
});

// Matches with "/api/articles"
router.route("/api/articles")
    .get(articlesController.findAll)
    .post(articlesController.create);

// Matches with "/api/articles/:id"
router.route("/api/articles/:id")
    .get(articlesController.findById)
    .delete(articlesController.remove);

module.exports = router;
