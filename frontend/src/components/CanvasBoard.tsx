import { useState, useEffect } from "react";
import { fetchCanvasImage } from "../api/canvas";


export default function CanvasBoard({
  refreshTrigger,
}: {
  refreshTrigger: any;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const imageUrl = await fetchCanvasImage();
        setImageSrc(imageUrl);
      } catch (err) {
        console.error("Error fetching canvas image:", err);
      }
    }
    fetchImage();
  }, [refreshTrigger]);

  if (!imageSrc) return <p>Loading preview...</p>;

  return (
    <img
      src={imageSrc}
      alt="Canvas preview"
      style={{ border: "1px solid #ccc", marginTop: "20px" }}
    />
  );
}
