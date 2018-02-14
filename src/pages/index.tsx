import React from "react"
import GatsbyLink from "gatsby-link"
import { socialLinks, routes } from "../constants"

const HomePage = () => (
  <React.Fragment>
    <h1>hi there!</h1>
    <p>
      I'm Darius. I'm 21, currently live in Ohio, and I've been programming for
      a few years, in anything from games, mobile, web, or whatever else I feel
      like dipping my toes into. Right now I'm focusing on frontend web
      development, using React and TypeScript. You can view what I'm working on
      at my <a href={socialLinks.github}>GitHub</a>. On occasion, if there's an
      interesting subject that pops up every now and again, I'll blog about it.
    </p>
    <p>
      I've been producing music for a while now as well, primarily electronic.
      You can listen to my tracks on{" "}
      <a href={socialLinks.soundcloud}>SoundCloud</a>.
    </p>
    <p>
      Outside of production and coding, I enjoy gaming (usually rhythm games!),
      helping people out on Discord and Stack Overflow, being silly on{" "}
      <a href={socialLinks.twitter}>Twitter</a>, and spending time with my
      family.
    </p>
    <strong>
      Currently available for hire.{" "}
      <GatsbyLink to={routes.contact}>
        Contact me if you're interested!
      </GatsbyLink>
    </strong>
  </React.Fragment>
)

export default HomePage
