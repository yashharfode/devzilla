'use client';
import { useState } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';
import { BasePackages, ModularAddons } from '../../../config/pricingDictionary';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { generateDetailedPDF } from '../../../lib/pdfGenerator';

export default function ConsultationFooter() {
  const { currentClient } = useAgencyStore();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!currentClient) return null;

  const handleGenerateBlueprint = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('blueprint-content');
      if (!element) throw new Error("Content not found");

      const imgData = await toPng(element, {
        backgroundColor: '#f8fafc', // Light mode bg
        pixelRatio: 2,
      });

      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;
      
      pdf.setFillColor(13, 148, 136); // Deep Teal Header
      pdf.rect(0, 0, pdfWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.text(`DevZilla Digital Blueprint | Client: ${currentClient.clientName}`, 10, 14);

      pdf.addImage(imgData, 'PNG', 0, 25, pdfWidth, pdfHeight);
      pdf.save(`DevZilla_Blueprint_${currentClient.id}.pdf`);
    } catch (error) {
      console.error("PDF Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrintProposal = () => {
    generateDetailedPDF(currentClient);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 py-3 px-4 md:py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Split Totals */}
        <div className="flex w-full md:w-auto justify-between md:justify-start gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0">
          <div className="shrink-0">
            <div className="text-[10px] text-[#64748b] uppercase tracking-widest font-bold mb-0.5">Website Setup</div>
            <div className="text-xl md:text-2xl font-bold text-[#1e293b] font-mono">
              ₹{currentClient.publicView.oneTimePrice.toLocaleString('en-IN')}
              <span className="text-[10px] text-[#64748b] font-sans tracking-normal font-medium ml-1 hidden md:inline">One-time</span>
            </div>
          </div>
          {currentClient.publicView.dueTodayInfra > 0 && (
            <div className="shrink-0">
              <div className="text-[10px] text-[#0d9488] uppercase tracking-widest font-bold mb-0.5">1st Year Infra</div>
              <div className="text-xl md:text-2xl font-bold text-[#0d9488] font-mono">
                ₹{currentClient.publicView.dueTodayInfra.toLocaleString('en-IN')}
                <span className="text-[10px] text-[#0d9488]/70 font-sans tracking-normal font-medium ml-1 hidden md:inline">Initial</span>
              </div>
            </div>
          )}
          <div className="shrink-0 border-l border-gray-200 pl-4 md:pl-8">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="text-[10px] text-[#0f172a] uppercase tracking-widest font-bold">Initial Investment</div>
              {currentClient.publicView.paymentMilestone === '50_50' && (
                <span className="bg-yellow-100 text-yellow-800 text-[9px] px-1.5 py-0.5 rounded font-bold">50% Advance</span>
              )}
              {currentClient.publicView.paymentMilestone === '40_30_30' && (
                <span className="bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.5 rounded font-bold">40% Advance</span>
              )}
            </div>
            <div className="text-xl md:text-2xl font-bold text-[#0f172a] font-mono">
              ₹{(
                currentClient.publicView.paymentMilestone === '100' ? currentClient.publicView.finalPrice :
                currentClient.publicView.paymentMilestone === '50_50' ? Math.round(currentClient.publicView.finalPrice * 0.5) :
                Math.round(currentClient.publicView.finalPrice * 0.4)
              ).toLocaleString('en-IN')}
            </div>
          </div>
          {currentClient.publicView.recurringFromYear2 > 0 && (
            <div className="shrink-0 border-l border-gray-200 pl-4 md:pl-8 opacity-70">
              <div className="text-[10px] text-[#64748b] uppercase tracking-widest font-bold mb-0.5">Renewal (From Yr 2)</div>
              <div className="text-xl md:text-2xl font-bold text-[#64748b] font-mono">
                ₹{currentClient.publicView.recurringFromYear2.toLocaleString('en-IN')}
                <span className="text-[10px] text-[#64748b] font-sans tracking-normal font-medium ml-1 hidden md:inline">/ Yr</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <button 
            onClick={handlePrintProposal}
            className="flex-1 md:flex-none bg-white border border-gray-300 text-[#1e293b] font-bold px-4 py-2.5 rounded-xl transition-all hover:bg-gray-50 flex items-center justify-center gap-2 text-sm md:text-base shadow-sm"
          >
            <i className="fa-solid fa-print"></i> Print Proposal
          </button>
          
          <button 
            onClick={handleGenerateBlueprint}
            disabled={isGenerating}
            className={`flex-1 md:flex-none premium-btn font-bold px-6 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGenerating ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> Generating...</>
            ) : (
              <><i className="fa-solid fa-image"></i> Visual Blueprint</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
