import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contact.scss";
function Contact() {
  const form = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        "service_43s5bts",
        "template_03iof5o",
        form.current,
        "faB5aMcRRzlsNrasm"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    event.target.reset();
  };
  return (
    <div className="contact">
      <div className="container">
        <div className="leftside">
          <h2 className="title">Contact us for quotes or any questions</h2>
          <h4 className="address">Morrell Ave Burlingame,CA 94010</h4>
          <span className="email">metenar@gmail.com</span>
          <span className="phone">Phone: (650) 740-9472</span>
        </div>
        <div className="rightside">
          <form onSubmit={handleSubmit} ref={form}>
            <input
              type="text"
              placeholder="Your name"
              name="user_name"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              name="user_email"
              required
            />
            <textarea placeholder="Your message" name="message" required />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Contact;
