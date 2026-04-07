import React, { useState } from "react";
import { subscribeNewsletter } from "../utils/api";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await subscribeNewsletter(email);
      alert("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      alert(error.message || "Subscription failed");
    }
  };

  return (
    <section className="container">
      <div className="newsletter">
        <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe to Newsletter</button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;