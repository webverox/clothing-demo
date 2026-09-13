import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <section className="newsletter">
      <div>
        <p className="eyebrow">A quiet note</p>
        <h2>Stay in the loop.</h2>
      </div>
      <div className="newsletter-form-wrap">
        <p>
          New releases, seasonal edits, and occasional notes from Sonder Supply.
        </p>
        <form onSubmit={submit}>
          {submitted ? (
            <p className="success">Thank you for subscribing.</p>
          ) : (
            <>
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
              />
              <button type="submit">
                Subscribe <ArrowUpRight size={15} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
