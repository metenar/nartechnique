import { useState } from "react";
import axios from "axios";
import "./contact.scss";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/send-email", { name, email, message })
      .then((response) => {
        console.log(response.data);
        alert("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Error sending email");
      });
    setName("");
    setEmail("");
    setMessage("");
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <textarea
              placeholder="Your message"
              value={message}
              required
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Contact;
