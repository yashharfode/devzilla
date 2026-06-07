'use client';

import { useState, useEffect } from 'react';

export default function PortfolioSlider() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const possibleImages = [
      "/assets/Works/image.png",
      "/assets/Works/image copy.png",
      "/assets/Works/ChatGPT Image Jun 7, 2026, 09_23_51 AM.png",
    ];
    for (let i = 2; i <= 20; i++) {
      possibleImages.push(`/assets/Works/image copy ${i}.png`);
    }

    const validImages: string[] = [];
    let itemsProcessed = 0;

    possibleImages.forEach((imgSrc) => {
      const img = new Image();
      img.onload = () => {
        validImages.push(imgSrc);
        checkComplete();
      };
      img.onerror = () => {
        checkComplete();
      };
      img.src = imgSrc;
    });

    function checkComplete() {
      itemsProcessed++;
      if (itemsProcessed === possibleImages.length) {
        setImages(validImages);
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) return null;

  const itemsHtml = images.map((img, index) => (
    <div key={index} className="w-[280px] md:w-[350px] lg:w-[400px] h-[500px] md:h-[600px] flex-shrink-0 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative group bg-card">
      <img src={img} alt="Project Showcase" className="w-full h-full object-cover object-top transition-all duration-[4000ms] ease-linear group-hover:object-bottom opacity-90 group-hover:opacity-100" />
    </div>
  ));

  return (
    <div id="portfolio-slider" className="animate-marquee gap-8">
      {itemsHtml}
      {itemsHtml}
    </div>
  );
}
