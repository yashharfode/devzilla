const fs = require('fs');

function convertHtmlToJsx(html) {
  let jsx = html.replace(/class=/g, 'className=');
  jsx = jsx.replace(/<!--/g, '{/*').replace(/-->/g, '*/}');
  jsx = jsx.replace(/<img([^>]*[^/])>/g, '<img$1 />');
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr([^>]*[^/])>/g, '<hr$1 />');
  jsx = jsx.replace(/<input([^>]*[^/])>/g, '<input$1 />');
  return jsx;
}

function migrateIndex() {
  let html = fs.readFileSync('.backup/index.html', 'utf8');
  let bodyStart = html.indexOf('<!-- Hero Section -->');
  let bodyEnd = html.indexOf('<!-- Footer -->');
  let body = html.substring(bodyStart, bodyEnd);
  
  body = convertHtmlToJsx(body);
  body = body.replace(
    /<div id="portfolio-slider" className="animate-marquee gap-8">[\s\S]*?<\/div>/,
    '<PortfolioSlider />'
  );

  let pageContent = `import Link from 'next/link';\nimport PortfolioSlider from '@/components/PortfolioSlider';\n\nexport default function Home() {\n  return (\n    <main>\n${body}    </main>\n  );\n}`;
  fs.writeFileSync('src/app/page.tsx', pageContent);
}

function migratePortfolio() {
  let html = fs.readFileSync('.backup/portfolio.html', 'utf8');
  let bodyStart = html.indexOf('<!-- Page Header -->');
  let bodyEnd = html.indexOf('<!-- Footer -->');
  let body = html.substring(bodyStart, bodyEnd);
  
  body = convertHtmlToJsx(body);
  
  // The portfolio grid is dynamic, so we replace the whole section or just the grid part
  // Actually, let's create a PortfolioGrid component to handle it exactly like PortfolioSlider
  body = body.replace(
    /<div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">[\s\S]*?<\/div>\s*<div id="loading-spinner" className="text-center py-10">[\s\S]*?<\/div>/,
    '<PortfolioGrid />'
  );

  let pageContent = `import Link from 'next/link';\nimport PortfolioGrid from '@/components/PortfolioGrid';\n\nexport default function PortfolioPage() {\n  return (\n    <main>\n${body}    </main>\n  );\n}`;
  fs.mkdirSync('src/app/portfolio', { recursive: true });
  fs.writeFileSync('src/app/portfolio/page.tsx', pageContent);
}

migrateIndex();
migratePortfolio();
