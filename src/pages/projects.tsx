import React from "react"
import styled from "styled-components"

const TextEmote = styled.div`
  /* make these inline-block so they don't break on word wrapping */
  display: inline-block;
`

const ProjectsPage = () => (
  <React.Fragment>
    <p>Here's what I'm working on:</p>
    <ul>
      <li>
        <a href="./trello">an awesome-looking minimal trello clone</a>
      </li>
      <li>
        <a href="https://github.com/kingdaro/super-mario-typescript">
          super mario bros written in TypeScript
        </a>
      </li>
      <li>
        <a href="https://play.google.com/store/apps/details?id=com.kingdaro.minejumper">
          mine jumper
        </a>{" "}
        - a silly mobile game made with
        <a href="https://love2d.org/">love</a>
      </li>
      <li>
        <a href="https://github.com/kingdaro/rewatcher">rewatcher</a> - a CLI
        tool for rerunning programs on file changes
      </li>
      <li>
        other stuff, coming soon
        <TextEmote>(´・◡ ・｀)</TextEmote>
      </li>
    </ul>
  </React.Fragment>
)

export default ProjectsPage
