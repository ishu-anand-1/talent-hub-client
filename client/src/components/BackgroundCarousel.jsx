import React, { useEffect, useState } from "react";

const images = [
  "/ai-generated-8404740_1920.png",
  "/concert-8676557_1920.jpg",
  "/pexels-hatice-baran-153179658-30164912.jpg",
  "/pexels-mo3ath-photos-110226063-25540936.jpg",
  "/pexels-trayproductions-11963123.jpg",
];

export default function BackgroundCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out transform 
            ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"} 
            bg-cover bg-center`}
          style={{
            backgroundImage: `url(${img})`,
            filter: index === current ? "brightness(0.9) blur(1px)" : "blur(2px)",
            zIndex: index === current ? 10 : 0,
          }}
        ></div>
      ))}
    </div>
  );
}
