import React from "react"
import styled from "styled-components"
import ContactForm from "../components/ContactForm"
import { socialLinks, email } from "../constants"

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
        <a href={socialLinks.twitter}>twitter</a>
      </li>
      <li>
        <a href={socialLinks.github}>github</a>
      </li>
      <li>
        <a href={socialLinks.soundcloud}>soundcloud</a>
      </li>
      <li>
        <a href={socialLinks.twitch}>twitch</a>
      </li>
      <li>
        <a href={socialLinks.devto}>dev.to</a>
      </li>
      <li>
        <a href={socialLinks.youtube}>youtube</a>{" "}
        <SubText>(i don't use it much though)</SubText>
      </li>
    </ContactLinks>

    <p>
      If you'd like to contact me directly, email me at{" "}
      <a href={"mailto:" + email}>{email}</a>, or use the form below.
    </p>
    <ContactForm />
  </React.Fragment>
)

export default Contact
