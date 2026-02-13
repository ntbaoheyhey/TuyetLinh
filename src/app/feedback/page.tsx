"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import PageFrame from "@/components/page-frame";

export default function FeedbackPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    localStorage.setItem("giftFeedback", feedback);
    localStorage.setItem("giftFeedbackTimestamp", new Date().toISOString());
    router.push("/outro");
  }

  return (
    <PageFrame backHref="/final" nextHref="/outro">
      <h2>Feedback</h2>
      <form className="stack" onSubmit={onSubmit}>
        <textarea
          className="feedback-input"
          placeholder="Share your thoughts"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={6}
        />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </PageFrame>
  );
}
