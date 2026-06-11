'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Category = {
  name: string;
  images: string[];
};

export default function CategoryGallery({ categories, variant }: { categories: Category[], variant: 'showcase' | 'grid' }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  if (categories.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No projects found in the Assets folder.</p>
      </div>
    );
  }

  return (
    <>
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="mb-20 last:mb-0">
          <h3 className={`font-bold text-white mb-8 border-b border-gray-800 pb-4 inline-block pr-12 ${variant === 'grid' ? 'text-3xl' : 'text-2xl'}`} data-aos="fade-right">
            <span className="text-primary mr-3">#</span> {category.name}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.images.map((imagePath, imgIndex) => {
              const heightClass = variant === 'grid' ? 'h-[450px] md:h-[550px]' : 'h-[450px] md:h-[600px] lg:h-[700px]';
              return (
                <div 
                  key={imgIndex} 
                  onClick={() => setSelectedImage(imagePath)}
                  className={`glass-card rounded-2xl overflow-hidden group border-gray-800 ${heightClass} relative cursor-pointer shadow-xl`}
                  data-aos="fade-up"
                  data-aos-delay={(imgIndex % 3) * 100}
                >
                  <Image 
                    src={imagePath} 
                    alt={`High-converting ${category.name} website design portfolio project by DevZilla`} 
                    fill
                    className="object-cover object-top transition-transform duration-[6000ms] ease-linear group-hover:object-bottom"
                  />
                  <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  
                  <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center shadow-lg">
                    <i className="fa-solid fa-expand mr-2"></i> View Full
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-gray-800 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-xl transition-colors z-[110] shadow-lg"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          
          <div 
            className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] rounded-xl overflow-hidden border border-gray-700 bg-dark shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The image scrolls inside this container if it's too tall */}
            <div className="w-full h-full overflow-auto custom-scrollbar">
               <img src={selectedImage} alt="High-resolution full-screen view of premium web design project by DevZilla" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
