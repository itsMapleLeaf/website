import React from "react"
import BlogPostPreview from "../components/BlogPostPreview"
import styled from "styled-components"

const Container = styled.div`
  > * + * {
    margin-top: 1rem;
  }
`

const BlogPage = (props: { data: { allMarkdownRemark: { edges: any[] } } }) => {
  const posts = props.data.allMarkdownRemark.edges.map(edge => {
    const { title, description, path } = edge.node.frontmatter
    return (
      <BlogPostPreview
        key={edge.node.id}
        title={title}
        description={description}
        path={path}
      />
    )
  })

  return <Container>{posts}</Container>
}

export default BlogPage

// @ts-ignore
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            path
            title
            description
          }
        }
      }
    }
  }
`
