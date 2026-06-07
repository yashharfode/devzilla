import fs from 'fs';
import path from 'path';

export default function PortfolioGrid() {
  const worksDir = path.join(process.cwd(), 'public', 'assets', 'Works');
  
  let categories: { name: string, images: string[] }[] = [];
  
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
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="mb-20 last:mb-0">
          <h3 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4 inline-block pr-12" data-aos="fade-right">
            <span className="text-primary mr-3">#</span> {category.name}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {category.images.map((img, imgIndex) => {
              const delay = (imgIndex % 3) * 100;
              return (
                <div key={imgIndex} className="h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative group bg-card" data-aos="fade-up" data-aos-delay={delay}>
                  <img src={img} alt={`${category.name} Website`} className="w-full h-full object-cover object-top transition-all duration-[4000ms] ease-linear group-hover:object-bottom opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b1f] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
