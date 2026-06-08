'use client';
import { useState } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';
import { BasePackages, ModularAddons } from '../../../config/pricingDictionary';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(30, 41, 59);
    doc.text("DevZilla Agency", 14, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text("Official Project Proposal", 14, 28);
    
    // Client Info
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(`Client: ${currentClient.clientName}`, 14, 45);
    doc.text(`Business: ${currentClient.businessName}`, 14, 51);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 57);

    let startY = 65;

    if (currentClient.publicView.clientRequirements) {
      doc.setFontSize(10);
      doc.setTextColor(13, 148, 136); // Teal color for header
      doc.text("Project Requirements:", 14, 65);
      
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      const splitRequirements = doc.splitTextToSize(currentClient.publicView.clientRequirements, 180);
      doc.text(splitRequirements, 14, 71);
      
      startY = 71 + (splitRequirements.length * 5) + 10;
    }

    // Prepare Table Data
    const tableBody = [];
    
    const basePkg = BasePackages[currentClient.publicView.basePackage];
    tableBody.push([{ content: `Base Package: ${basePkg.name}`, styles: { fontStyle: 'bold' } }, `INR ${basePkg.price.toLocaleString('en-IN')}`]);
    
    // Included Features
    basePkg.features.forEach(feat => {
      if (!currentClient.publicView.uncheckedSubFeatures.includes(feat.id)) {
        tableBody.push([`  ✓ ${feat.name}`, { content: 'Included', styles: { textColor: [100, 116, 139] } }]);
      }
    });

    // Free Services
    if (basePkg.freeServices && basePkg.freeServices.length > 0) {
      basePkg.freeServices.forEach(free => {
        tableBody.push([`  🎁 Free Bonus: ${free}`, { content: 'Included', styles: { textColor: [13, 148, 136], fontStyle: 'bold' } }]);
      });
    }
    
    // Removed Features
    currentClient.publicView.uncheckedSubFeatures.forEach(subId => {
      const feat = basePkg.features.find(f => f.id === subId);
      if (feat) {
        tableBody.push([`  - Removed: ${feat.name}`, `-INR ${feat.deductionValue.toLocaleString('en-IN')}`]);
      }
    });

    currentClient.publicView.selectedAddons.forEach(addonId => {
      const addon = ModularAddons[addonId];
      if (addon) {
        tableBody.push([`Add-on: ${addon.name}`, `INR ${addon.price.toLocaleString('en-IN')}`]);
      }
    });

    currentClient.publicView.customFeatures.forEach(cf => {
      tableBody.push([`Custom: ${cf.name}`, `INR ${cf.price.toLocaleString('en-IN')}`]);
    });
    
    currentClient.publicView.specialIncentives.forEach(inc => {
      tableBody.push([`Bonus Incentive: ${inc.reason}`, `-INR ${inc.amount.toLocaleString('en-IN')}`]);
    });
    
    tableBody.push([{ content: 'Total One-Time Setup', styles: { fontStyle: 'bold', fillColor: [241, 245, 249] } }, { content: `INR ${currentClient.publicView.oneTimePrice.toLocaleString('en-IN')}`, styles: { fontStyle: 'bold', fillColor: [241, 245, 249] } }]);

    const infra = currentClient.publicView.infrastructure;
    if (currentClient.publicView.dueTodayInfra > 0 || currentClient.publicView.recurringFromYear2 > 0) {
       tableBody.push([{ content: `Infrastructure`, styles: { fontStyle: 'bold', textColor: [13, 148, 136] } }, '']);
       if (infra.hostingProvider === 'devzilla') {
         tableBody.push([`  Web Hosting (DevZilla Cloud - 1st Year)`, `INR ${(3000).toLocaleString('en-IN')}`]);
         tableBody.push([`  Web Hosting (Renewal)`, `INR 3,000 / Yr`]);
       } else if (infra.hostingProvider === 'assisted' && infra.hostingYearlyCost > 0) {
         tableBody.push([`  Web Hosting (Assisted Setup - 1st Year)`, `INR ${(infra.hostingYearlyCost).toLocaleString('en-IN')}`]);
         tableBody.push([`  Web Hosting (Renewal)`, `INR ${(infra.hostingYearlyCost).toLocaleString('en-IN')} / Yr`]);
       }

       if (infra.domainStatus === 'new') {
         tableBody.push([`  Domain Name (1st Year)`, `INR ${(infra.domainFirstYearCost).toLocaleString('en-IN')}`]);
         tableBody.push([`  Domain Name (Renewal)`, `INR ${(infra.domainRenewalCost).toLocaleString('en-IN')} / Yr`]);
       }
       tableBody.push([{ content: 'Initial Investment (Setup + 1st Year Infra)', styles: { fontStyle: 'bold', fillColor: [240, 253, 250] } }, { content: `INR ${currentClient.publicView.finalPrice.toLocaleString('en-IN')}`, styles: { fontStyle: 'bold', fillColor: [240, 253, 250] } }]);
    }

    autoTable(doc, {
      startY: startY,
      head: [['Description', 'Amount']],
      body: tableBody as any,
      theme: 'grid',
      headStyles: { fillColor: [30, 41, 59] },
      columnStyles: { 1: { halign: 'right' } }
    });

    // @ts-expect-error - jspdf-autotable extends jsPDF type dynamically
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text("Terms & Conditions:", 14, finalY);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.text("1. 50% advance payment required to commence work.", 14, finalY + 6);
    doc.text("2. Proposal valid for 15 days from the date of issue.", 14, finalY + 11);
    doc.text("3. Infrastructure costs are recurring and must be renewed before expiry.", 14, finalY + 16);

    doc.save(`Proposal_${currentClient.clientName.replace(/\s+/g, '_')}.pdf`);
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
            <div className="text-[10px] text-[#0f172a] uppercase tracking-widest font-bold mb-0.5">Initial Investment</div>
            <div className="text-xl md:text-2xl font-bold text-[#0f172a] font-mono">
              ₹{currentClient.publicView.finalPrice.toLocaleString('en-IN')}
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
