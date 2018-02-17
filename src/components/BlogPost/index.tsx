import React from "react"

const BlogPost = (props: { title: string; content: string }) => (
  <article>
    <h1>{props.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: props.content }} />
  </article>
)

export default BlogPost
