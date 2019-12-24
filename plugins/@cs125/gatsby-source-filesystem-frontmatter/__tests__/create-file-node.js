const path = require(`path`)

const { createFileNode } = require(`../create-file-node`)

// FIXME: This test needs to not use snapshots because of file differences
// and locations across users and CI systems
describe(`create-file-node`, () => {
  it(`creates a file node`, () => {
    const createNodeId = jest.fn()
    createNodeId.mockReturnValue(`uuid-from-gatsby`)
    return createFileNode(
      path.resolve(`${__dirname}/fixtures/file.json`),
      createNodeId,
      {}
    )
  })

  it(`creates a file node ignoring frontmatter`, async () => {
    const createNodeId = jest.fn()
    createNodeId.mockReturnValue(`uuid-from-gatsby`)
    const fileNode = await createFileNode(
      path.resolve(`${__dirname}/fixtures/file-with-frontmatter.json`),
      createNodeId,
      {}
    )
    expect(fileNode).not.toHaveProperty(`frontMatter`)
    return fileNode
  })

  it(`creates a file node reading frontmatter`, async () => {
    const createNodeId = jest.fn()
    createNodeId.mockReturnValue(`uuid-from-gatsby`)
    const fileNode = await createFileNode(
      path.resolve(`${__dirname}/fixtures/file-with-frontmatter.json`),
      createNodeId,
      { frontMatter: true }
    )
    expect(fileNode).toHaveProperty(`frontMatter`)
    expect(fileNode.frontMatter.title).toEqual("Test")
    return fileNode
  })
})
