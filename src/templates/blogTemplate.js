// @ts-check
import React from "react"
import BlogPost from "../components/BlogPost"

export default function PostTemplate({ data }) {
  const { frontmatter, html } = data.markdownRemark
  return <BlogPost title={frontmatter.title} content={html} />
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
      }
    }
  }
`
