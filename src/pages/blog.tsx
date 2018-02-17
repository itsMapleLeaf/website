import React from "react"
import BlogPostPreview from "../components/BlogPostPreview"
import styled from "styled-components"

const Container = styled.div`
  > * + * {
    margin-top: 1rem;
  }
`

const BlogPage = () => (
  <Container>
    <BlogPostPreview
      title="awesome post 1"
      description="this post is pretty awesome"
      location="/"
    />
    <BlogPostPreview
      title="awesome post 2"
      description="this post is probably even more awesome"
      location="/"
    />
  </Container>
)

export default BlogPage
