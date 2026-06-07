import fs from 'fs';
import path from 'path';
import CategoryGallery from './CategoryGallery';

export default function PortfolioGrid() {
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

  if (categories.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No projects found in the Assets folder.</p>
      </div>
    );
  }

  return (
    <div id="portfolio-grid">
      <CategoryGallery categories={categories} variant="grid" />
    </div>
  );
}
