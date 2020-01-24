# @cs125/gatsby-source-filesystem-frontmatter

Adds support for reading frontmatter from any file to
[`gatsby-source-frontmatter`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/).

## Install

```bash
npm i @cs125/gatsby-source-filesystem-frontmatter
```

## Use

Review the documentation and examples from
[`gatsby-source-frontmatter`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/).

`gatsby-source-filesystem-frontmatter` adds a `frontMatter` option to
`gatsby-source-filesystem`.

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@cs125/gatsby-source-filesystem-frontmatter`,
      options: {
        // options from gatsby-source-filesystem are supported
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
        frontMatter: true, // read frontmatter from files in this directory
      },
    },
  ],
}
```

## Options

If the `frontMatter` option is set to `true`,
`gatsby-source-filesystem-frontmatter` will attempt to read YAML front matter
from each file using [`gray-matter`](https://www.npmjs.com/package/gray-matter).

Given the following file:

```asciidoc
---
author: Geoffrey Challen
---

= Test

This is a test. This is only a test.
```

You can query attributes defined in its front matter like this:

```graphql
{
  allFile {
    edges {
      node {
        frontMatter {
          author
        }
      }
    }
  }
}
```

Or, if you are using a page query to get Asciidoc content, for example, your
query will look like this:

```js
export const pageQuery = graphql`
  query($id: String!) {
    asciidoc(id: { eq: $id }) {
      document {
        title
      }
      parent {
        ... on File {
          frontMatter {
            author
          }
        }
      }
      html
    }
  }
`
```

## Example

This repository contains a minimal example Gatsby site that uses
`@cs125/gatsby-source-filesystem-frontmatter` to extract frontmatter and
[`gatsby-transformer-asciidoc`](https://www.gatsbyjs.org/packages/gatsby-transformer-asciidoc/)
to transform Asciidoc files. Note that the extra `babel.config.json` file in the
root of the repository is needed to allow both the example Gatsby site and
plugin to share the same repository.
