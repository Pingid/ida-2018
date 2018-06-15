const path = require("path");
const fs = require("fs");

exports.onPreBootstrap = () => {
  require('isomorphic-fetch');
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const projectTemplate = path.resolve("src/templates/Project.js");
  const dataJSON = fs.readFileSync(path.resolve(__dirname, 'src/data/data.json'));

  const data = JSON.parse(dataJSON)
  	.map(person => {
  		createPage({
          path: `/project/${person.slug}`,
          component: projectTemplate,
          context: person
        });
  	})
};

