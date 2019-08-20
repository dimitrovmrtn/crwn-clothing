import React from 'react'

import './contact.styles.scss'

const ContactPage = () => (
  <div>
    <form action="https://formspree.io/dimitrovmrtn@gmail.com" method="POST" data-aos="fade-up" data-aos-delay="300">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required></input>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required></input>
        <label for="subject">Message:</label>
        <textarea name="subject" id="subject" cols="10" rows="10" placeholder="Shoot us a message..."></textarea>
        <input type="submit" value="Submit"></input>
    </form>
  </div>
)

export default ContactPage