import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function PortfolioShowcase() {
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

  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Proven Results Across <span className="text-gradient">Every Industry</span></h2>
          <p className="text-gray-400 text-lg">We craft premium digital experiences that drive growth for all local businesses. Explore our works below.</p>
        </div>

        {categories.length > 0 ? (
          categories.map((category, catIndex) => (
            <div key={catIndex} className="mb-20 last:mb-0">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4 inline-block pr-12" data-aos="fade-right">
                <span className="text-primary mr-3">#</span> {category.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.images.map((imagePath, imgIndex) => (
                  <div 
                    key={imgIndex} 
                    className="glass-card rounded-2xl overflow-hidden group border-gray-800 h-[450px] md:h-[600px] lg:h-[700px] relative"
                    data-aos="fade-up"
                    data-aos-delay={(imgIndex % 3) * 100}
                  >
                    <img 
                      src={imagePath} 
                      alt={`${category.name} Website`} 
                      className="w-full h-full object-cover object-top transition-transform duration-[6000ms] ease-linear group-hover:object-bottom"
                    />
                    <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No projects found in the Assets folder.</p>
        )}
        
        <div className="mt-16 text-center" data-aos="fade-up">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition font-medium border-b border-transparent hover:border-primary pb-1">
            View All Our Projects <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
