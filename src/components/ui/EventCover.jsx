import { useState } from "react";
import { IMAGES } from "../../assets/images";

export default function EventCover({ src, alt, className = "" }) {
  const [image, setImage] = useState(src || IMAGES.EVENT_PLACEHOLDER);

  return (
    <img
      src={image}
      alt={alt}
      loading="lazy"
      onError={() => setImage(IMAGES)}
      className={`rounded-2xl object-cover shadow-2xl transition duration-300 hover:scale-[1.02] ${className}`}
    />
  );
}
