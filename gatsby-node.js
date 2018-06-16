const path = require("path");
const fs = require("fs");

exports.onPreBootstrap = () => {
  require('isomorphic-fetch');
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const projectTemplate = path.resolve("src/templates/Project.js");
  const dataJSON = fs.readFileSync(path.resolve(__dirname, 'assets/data/data.json'));

  // return new Promise((resolve, reject) => {
  //   resolve(
  //     graphql`
  //       {
  //         allDataJson {
  //           edges {
  //             node {
  //               yourName
  //               projectName
  //               wordDescription
  //               slug
  //             }
  //           }
  //         }
  //       }
  //     `
  //   )
  // })
  // // .then(console.log)
  // .then(result => {
  //   if (result.errors) {
  //     /* eslint no-console: "off" */
  //     console.log(result.errors);
  //     reject(result.errors);
  //   }

  //   result.data.allDataJson.edges.map(x => {
  //     createPage({
  //       path: `/project/${x.node.slug}`,
  //       component: projectTemplate,
  //       context: x.node
  //     });
  //   })
  // })
  // .then(data => data.map(person => {
  //   console.log(person)
  //   createPage({
  //       path: `/project/${person.slug}`,
  //       component: projectTemplate,
  //       context: person
  //     });
  // }))

  const data = JSON.parse(dataJSON)
  	.map(person => {
  		createPage({
          path: `/project/${person.slug}`,
          component: projectTemplate,
          context: person
        });
  	})
};

