import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

const submit = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/pastes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined
      })
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("API Error:", res.status, text);
      alert("Failed to create paste");
      return;
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Non-JSON response:", text);
      alert("Invalid response from server");
      return;
    }

    setUrl(data.url);
  } catch (err) {
    console.error("Network Error:", err);
    alert("Server not reachable");
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Paste</h2>

      <textarea
        rows="8"
        cols="50"
        placeholder="Enter text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="TTL seconds (optional)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Max views (optional)"
        value={views}
        onChange={(e) => setViews(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>Create</button>

      {url && (
        <p>
          Paste URL: <a href={url} target="_blank">{url}</a>
        </p>
      )}
    </div>
  );
}
