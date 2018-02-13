import React from "react"
import Helmet from "react-helmet"
import GatsbyLink from "gatsby-link"
import { PageWrapper, Header, Title, NavLinks, ContentWrapper } from "./styles"

const IndexTemplate = ({ children }: { children: () => React.ReactNode }) => (
  <PageWrapper>
    <Helmet
      title="hi there"
      meta={[
        { name: "description", content: "kingdaro's website" },
        { name: "keywords", content: "kingdaro, website, blog" },
      ]}
    />

    <Header>
      <Title>
        <h1>kingdaro</h1>
        <h2>programmer, electronic producer, gamer</h2>
      </Title>

      <NavLinks>
        <h5>
          <GatsbyLink to="/">Home</GatsbyLink>
        </h5>
        <h5>
          <GatsbyLink to="/blog">Blog</GatsbyLink>
        </h5>
        <h5>
          <GatsbyLink to="/projects">Projects</GatsbyLink>
        </h5>
        <h5>
          <GatsbyLink to="/contact">Contact</GatsbyLink>
        </h5>
      </NavLinks>
    </Header>

    <ContentWrapper>{children()}</ContentWrapper>
  </PageWrapper>
)

export default IndexTemplate
