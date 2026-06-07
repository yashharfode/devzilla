'use client';

import { useState, useEffect } from 'react';

export default function PortfolioGrid() {
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

  if (isLoading) {
    return (
      <div id="loading-spinner" className="text-center py-10">
        <i className="fa-solid fa-circle-notch fa-spin text-4xl text-primary"></i>
        <p className="text-gray-500 mt-4">Loading our beautiful works...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return <p className="col-span-full text-center text-gray-500">No projects found.</p>;
  }

  return (
    <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {images.map((img, index) => {
        const delay = (index % 3) * 100;
        return (
          <div key={index} className="h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative group bg-card" data-aos="fade-up" data-aos-delay={delay}>
            <img src={img} alt="Project Showcase" className="w-full h-full object-cover object-top transition-all duration-[4000ms] ease-linear group-hover:object-bottom opacity-90 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
}
