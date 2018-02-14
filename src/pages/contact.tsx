import React from "react"
import styled from "styled-components"
import { social } from "../links"

const ContactLinks = styled.ul`
  li {
    margin-bottom: 0.5rem;
  }
`

const SubText = styled.span`
  opacity: 0.5;
  font-style: italic;
`

const Contact = () => (
  <React.Fragment>
    <p>You can follow me on...</p>
    <ContactLinks>
      <li>
        <a href={social.twitter}>twitter</a>
      </li>
      <li>
        <a href={social.github}>github</a>
      </li>
      <li>
        <a href={social.soundcloud}>soundcloud</a>
      </li>
      <li>
        <a href={social.twitch}>twitch</a>
      </li>
      <li>
        <a href={social.devto}>dev.to</a>
      </li>
      <li>
        <a href={social.youtube}>youtube</a>{" "}
        <SubText>(i don't use it much though)</SubText>
      </li>
    </ContactLinks>
  </React.Fragment>
)

export default Contact
