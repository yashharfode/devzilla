'use client';
import { useState } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';
import html2canvas from 'html2canvas';
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

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#020510',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
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
    <div className="fixed bottom-0 left-0 w-full bg-[#060b1f]/90 backdrop-blur-xl border-t border-gray-800 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Total Investment</div>
          <div className="text-4xl md:text-5xl font-bold text-white font-mono flex items-baseline gap-2">
            ₹{currentClient.publicView.finalPrice.toLocaleString('en-IN')}
            <span className="text-sm text-gray-500 font-sans tracking-normal">One-time setup</span>
          </div>
        </div>
        
        <button 
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className={`w-full md:w-auto bg-gradient-primary text-dark font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(244,185,66,0.3)] hover:scale-105'}`}
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
