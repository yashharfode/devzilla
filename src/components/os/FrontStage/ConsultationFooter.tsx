'use client';
import { useState } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export default function ConsultationFooter() {
  const { currentClient } = useAgencyStore();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!currentClient) return null;

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('blueprint-content');
      if (!element) throw new Error("Content not found");

      // html-to-image supports modern CSS (like Tailwind v4 oklch/lab colors) perfectly
      const imgData = await toPng(element, {
        backgroundColor: '#020510',
        pixelRatio: 2,
      });

      // Create an image element to get the native dimensions
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;
      
      pdf.setFillColor(6, 11, 31); 
      pdf.rect(0, 0, pdfWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.text(`DevZilla Digital Blueprint | Client ID: ${currentClient.id}`, 10, 14);

      pdf.addImage(imgData, 'PNG', 0, 25, pdfWidth, pdfHeight);
      
      // If the image is longer than A4, jspdf will squish or truncate it depending on coordinates. 
      // For now, scaling it to width is standard for single page exports.
      
      pdf.save(`DevZilla_Blueprint_${currentClient.id}.pdf`);
    } catch (error) {
      console.error("PDF Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 py-3 px-4 md:py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
        <div>
          <div className="text-xs text-[#64748b] uppercase tracking-widest font-bold mb-0.5">Total Investment</div>
          <div className="text-2xl md:text-3xl font-bold text-[#1e293b] font-mono flex items-baseline gap-2">
            ₹{currentClient.publicView.finalPrice.toLocaleString('en-IN')}
            <span className="text-xs text-[#64748b] font-sans tracking-normal font-medium">One-time setup</span>
          </div>
        </div>
        
        <button 
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className={`w-full md:w-auto premium-btn font-bold px-6 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isGenerating ? (
            <><i className="fa-solid fa-spinner fa-spin"></i> Generating...</>
          ) : (
            <><i className="fa-solid fa-file-pdf"></i> Generate Blueprint</>
          )}
        </button>
      </div>
    </div>
  );
}
