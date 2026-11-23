"use client";

import { useState } from "react";
import styles from "./QuoteForm.module.css";

const ACCESS_KEY = "f58f5a3f-d94e-4718-8e8f-95a656880726";

const SERVICES = [
  "TV Mounting",
  "Appliance Installation",
  "Water Filter Installation",
  "Furniture Assembly",
  "Light Fixture Installation",
  "Ceiling Fan Installation",
  "Faucet Replacement",
  "Garbage Disposal Installation",
  "Art & Mirror Installation",
  "Toilet Installation",
  "Window AC Installation",
  "Other / Not Sure",
];

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New quote request from nartechnique.com",
          from_name: "Nar Technique Website",
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.success}>
        <h3>Thanks — request received!</h3>
        <p>
          We reply the same business day, usually within a few hours during opening
          hours. Need us sooner? Call or text{" "}
          <a href="tel:6507409472">(650) 740-9472</a>.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="qf-name">Name *</label>
          <input id="qf-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className={styles.field}>
          <label htmlFor="qf-phone">Phone *</label>
          <input id="qf-phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="qf-email">Email (optional)</label>
          <input id="qf-email" name="email" type="email" autoComplete="email" />
        </div>
        <div className={styles.field}>
          <label htmlFor="qf-city">City</label>
          <input id="qf-city" name="city" type="text" autoComplete="address-level2" />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="qf-service">Service needed *</label>
          <select id="qf-service" name="service" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="qf-contact">Best way to reach you</label>
          <select id="qf-contact" name="preferred_contact" defaultValue="Call">
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Email">Email</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="qf-message">Tell us about the job *</label>
        <textarea
          id="qf-message"
          name="message"
          required
          rows={4}
          placeholder="What needs to be installed or fixed? Photos help — you can text them to (650) 740-9472 after sending this form."
        />
      </div>

      {/* Spam protection (Web3Forms botcheck) */}
      <input type="checkbox" name="botcheck" style={{ display: "none" }} />

      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Request My Quote"}
      </button>

      {status === "error" && (
        <p className={styles.error}>
          Something went wrong sending the form. Please call or text us at{" "}
          <a href="tel:6507409472">(650) 740-9472</a> instead.
        </p>
      )}
    </form>
  );
}
