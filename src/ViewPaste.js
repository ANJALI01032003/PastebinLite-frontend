import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    fetch(`/api/pastes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setContent(data.content))
      .catch(() => setContent("Paste not available"));
  }, [id]);

  return <pre>{content}</pre>;
}
