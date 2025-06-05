import { useEffect, useState } from "react";
import { fetchCanvasImage } from "../api/canvas";

export default function CanvasImage({ refreshTrigger }: { refreshTrigger: any }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    fetchCanvasImage().then(setImageSrc);
  }, [refreshTrigger]);

  if (!imageSrc) return <p>Loading canvas preview...</p>;

  return <img src={imageSrc} alt="Canvas preview" className="border w-full" />;
}
