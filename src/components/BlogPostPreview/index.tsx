import React from "react"
import styled from "styled-components"
import GatsbyLink from "gatsby-link"

const ArticleLink = styled(GatsbyLink)`
  display: block;
  border-bottom: none;

  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem 0.8rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  h1,
  h2 {
    margin: 0rem;
  }

  h1 {
    margin-bottom: 0.25rem;
  }

  h2 {
    opacity: 0.75;
    font-size: 1.3rem;
  }
`

type Props = {
  title: string
  description: string
  path: string
}

const BlogPostPreview = (props: Props) => (
  <ArticleLink to={props.path}>
    <h1>{props.title}</h1>
    <h2>{props.description}</h2>
  </ArticleLink>
)

export default BlogPostPreview
