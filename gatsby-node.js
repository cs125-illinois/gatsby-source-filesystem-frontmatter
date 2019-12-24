// const { createFilePath } = require(`@cs125/gatsby-source-filesystem-frontmatter`)
// Normally you would use the include above
const { createFilePath } = require(`./dist/`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allAsciidoc {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const articleTemplate = path.resolve(`./src/templates/asciidoc.js`)
    result.data.allAsciidoc.edges.forEach(edge => {
      createPage({
        path: edge.node.fields.slug,
        component: slash(articleTemplate),
        context: {
          id: edge.node.id,
        },
      })
    })
  })
}

exports.onCreateNode = async ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Asciidoc`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
