import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import CategoryGallery from './CategoryGallery';

export default function PortfolioShowcase() {
  const worksDir = path.join(process.cwd(), 'public', 'assets', 'Works');
  
  const categories: { name: string, images: string[] }[] = [];
  
  try {
    if (fs.existsSync(worksDir)) {
      const folders = fs.readdirSync(worksDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
        
      folders.forEach(folder => {
        const folderPath = path.join(worksDir, folder);
        const files = fs.readdirSync(folderPath)
          .filter(file => file.match(/\.(png|jpe?g|gif|webp)$/i));
          
        if (files.length > 0) {
          categories.push({
            name: folder,
            images: files.map(file => `/assets/Works/${folder}/${file}`)
          });
        }
      });
      
      // Sort to ensure 'Restaurants' is always at the top
      categories.sort((a, b) => {
        if (a.name.toLowerCase().includes('restaurant')) return -1;
        if (b.name.toLowerCase().includes('restaurant')) return 1;
        return a.name.localeCompare(b.name);
      });
    }
  } catch (error) {
    console.error("Error reading portfolio images:", error);
  }

  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Proven Results Across <span className="text-gradient">Every Industry</span></h2>
          <p className="text-gray-400 text-lg">We craft premium digital experiences that drive growth for all local businesses. Explore our works below.</p>
        </div>

        <CategoryGallery categories={categories} variant="showcase" />
        
        <div className="mt-16 text-center" data-aos="fade-up">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition font-medium border-b border-transparent hover:border-primary pb-1">
            View All Our Projects <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
