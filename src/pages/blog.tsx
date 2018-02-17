import React from "react"
import BlogPostPreview from "../components/BlogPostPreview"
import styled from "styled-components"

const Container = styled.div`
  > * + * {
    margin-top: 1rem;
  }
`

const BlogPage = (props: { data: { allMarkdownRemark: { edges: any[] } } }) => {
  // const posts = props.data.allMarkdownRemark.edges
  //   .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
  //   .map(edge => (
  //     <div>{JSON.stringify(edge.node)}</div>
  //   ));

  return (
    <Container>
      <BlogPostPreview
        title="awesome post 1"
        description="this post is pretty awesome"
        path="/"
      />
      <BlogPostPreview
        title="awesome post 2"
        description="this post is probably even more awesome"
        path="/"
      />
    </Container>
  )
}

export default BlogPage
