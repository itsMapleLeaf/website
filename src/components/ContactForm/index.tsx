import React from "react"
import styled from "styled-components"

const Form = styled.form`
  label {
    display: block;
    margin-bottom: 0.4rem;
  }

  input,
  textarea {
    width: 100%;
  }

  textarea {
    height: 10rem;
  }
`

const SenderInfo = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    flex-grow: 1;
    min-width: 12rem;
  }
`

const ContactForm = () => (
  <Form>
    <SenderInfo>
      <fieldset>
        <label>Name</label>
        <input type="text" name="name" placeholder="someone awesome" required />
      </fieldset>
      <fieldset>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="awesome@email.com"
          required
        />
      </fieldset>
    </SenderInfo>
    <fieldset>
      <label>Message</label>
      <textarea name="message" placeholder="Write something nice!" required />
    </fieldset>
    <fieldset>
      <button type="submit">Submit</button>
    </fieldset>
  </Form>
)

export default ContactForm
