import React from 'react';
import emailjs from 'emailjs-com';

import './ContactUs.css';

export default function ContactUs() {

  function sendEmail(studentId) {
    // e.preventDefault();
    const verifyLink = 'https://swing-ntu-verify'.concat(studentId);
    emailjs.send("service_n0dkzyt","template_ls9b85f",{
        from_name: "Swing NTU",
        to_name: studentId.concat("@ntu.edu.tw"),
        message: verifyLink,
        })
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}