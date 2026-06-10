import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ClientDocument } from '../store/useAgencyStore';
import { BasePackages, ModularAddons } from '../config/pricingDictionary';

// Helper to draw common header and client details
const drawHeaderAndClientDetails = (doc: jsPDF, client: ClientDocument, primaryColor: [number, number, number], secondaryColor: [number, number, number]) => {
  doc.setFillColor(...secondaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('DevZilla Web Agency', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Digital Architecture & Strategy Proposal', 105, 30, { align: 'center' });
  
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Client Profile', 14, 55);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Client Name: ${client.clientName}`, 14, 63);
  doc.text(`Business Name: ${client.businessName}`, 14, 69);
  doc.text(`Mobile No: ${client.clientPhone || 'Not provided'}`, 14, 75);
  
  doc.text(`Industry: ${client.industry}`, 120, 63);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 120, 69);

  return 85;
};

// Top Button: Summarized PDF
export const generateSummaryPDF = (client: ClientDocument) => {
  const doc = new jsPDF();
  const primaryColor: [number, number, number] = [13, 148, 136];
  const secondaryColor: [number, number, number] = [30, 41, 59];
  let currentY = drawHeaderAndClientDetails(doc, client, primaryColor, secondaryColor);

  const reqStr = client.publicView.clientRequirements || '';
  const reqTableData: string[][] = [];
  if (reqStr) {
    const lines = reqStr.split('\n\n');
    lines.forEach(line => {
      const match = line.match(/^\*\*Q: (.*?)\*\*\n([\s\S]*)$/);
      if (match) {
        reqTableData.push([match[1], match[2]]);
      } else if (line.trim() !== '') {
        reqTableData.push(['Note', line]);
      }
    });
  }

  if (reqTableData.length > 0) {
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Project Requirements', 14, currentY);
    currentY += 6;

    autoTable(doc, {
      startY: currentY,
      head: [['Discussion Point', 'Client Response']],
      body: reqTableData,
      theme: 'grid',
      headStyles: { fillColor: [240, 245, 245], textColor: secondaryColor, fontStyle: 'bold' },
      styles: { font: 'helvetica', fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 70, fontStyle: 'bold', textColor: [60, 60, 60] },
        1: { cellWidth: 110 }
      }
    });
    currentY = (doc as any).lastAutoTable.finalY + 15;
  }

  const basePkg = BasePackages[client.publicView.basePackage];
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Investment Breakdown', 14, currentY);
  currentY += 6;

  const tableData: any[] = [];
  tableData.push(['Base Blueprint', basePkg?.name || 'Custom', `Rs. ${basePkg?.price.toLocaleString() || 0}`]);

  client.publicView.uncheckedSubFeatures.forEach(subId => {
    const feat = basePkg?.features.find(f => f.id === subId);
    if (feat) tableData.push([`Removed Feature: ${feat.name}`, '', `- Rs. ${feat.deductionValue.toLocaleString()}`]);
  });

  client.publicView.selectedAddons.forEach(addonId => {
    const addon = ModularAddons[addonId];
    if (addon) tableData.push([`Premium Add-on: ${addon.name}`, '', `+ Rs. ${addon.price.toLocaleString()}`]);
  });

  client.publicView.customFeatures.forEach(cf => {
    tableData.push([`Custom Feature: ${cf.name}`, '', `+ Rs. ${cf.price.toLocaleString()}`]);
  });

  const infra = client.publicView.infrastructure;
  if (infra.hostingProvider === 'devzilla') tableData.push([`DevZilla Elite Hosting (1 Yr)`, '', `+ Rs. 3,000`]);
  else if (infra.hostingProvider === 'assisted') tableData.push([`Assisted Setup (1 Yr)`, '', `+ Rs. ${infra.hostingYearlyCost.toLocaleString()}`]);

  if (infra.domainStatus === 'new') tableData.push([`Domain Name (1 Yr)`, infra.domainName || 'TBD', `+ Rs. ${infra.domainFirstYearCost.toLocaleString()}`]);

  client.publicView.specialIncentives.forEach(inc => {
    tableData.push([`Special Incentive: ${inc.reason}`, '', `- Rs. ${inc.amount.toLocaleString()}`]);
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Item / Description', 'Details', 'Amount']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: primaryColor, textColor: 255 },
    styles: { font: 'helvetica', fontSize: 10, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 50 },
      2: { cellWidth: 40, halign: 'right', fontStyle: 'bold' }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  if (currentY > 250) { doc.addPage(); currentY = 20; }

  doc.setFillColor(248, 250, 252);
  doc.rect(14, currentY, 182, 35, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, currentY, 182, 35, 'S');
  
  currentY += 10;
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Due Today (One-Time + Infra):`, 20, currentY);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(`Rs. ${client.publicView.finalPrice.toLocaleString()}`, 190, currentY, { align: 'right' });
  
  currentY += 12;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Recurring Annual Cost (From Year 2):`, 20, currentY);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text(`Rs. ${client.publicView.recurringFromYear2.toLocaleString()}`, 190, currentY, { align: 'right' });

  doc.save(`${client.businessName.replace(/\s+/g, '_')}_Summary_${new Date().getTime()}.pdf`);
};

// Bottom Button: Detailed Proposal PDF (Features included + T&C)
export const generateDetailedPDF = (client: ClientDocument) => {
  const doc = new jsPDF();
  const primaryColor: [number, number, number] = [30, 41, 59]; // Darker theme for detailed
  const secondaryColor: [number, number, number] = [15, 23, 42];
  let currentY = drawHeaderAndClientDetails(doc, client, primaryColor, secondaryColor);

  const basePkg = BasePackages[client.publicView.basePackage];
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Investment Breakdown', 14, currentY);
  currentY += 6;

  const tableData: any[] = [];
  tableData.push([
    { content: `Base Package: ${basePkg?.name || 'Custom'}`, styles: { fontStyle: 'bold', fillColor: [248, 250, 252] } }, 
    { content: '', styles: { fillColor: [248, 250, 252] } }, 
    { content: `Rs. ${basePkg?.price.toLocaleString() || 0}`, styles: { fontStyle: 'bold', fillColor: [248, 250, 252] } }
  ]);

  if (basePkg?.features) {
    basePkg.features.forEach(feat => {
      if (!client.publicView.uncheckedSubFeatures.includes(feat.id)) {
        tableData.push([`    • ${feat.name}`, 'Included', '']);
      }
    });
  }

  if (basePkg?.freeServices && basePkg.freeServices.length > 0) {
    basePkg.freeServices.forEach(free => {
      tableData.push([{ content: `    + Free Bonus: ${free}`, styles: { textColor: [13, 148, 136], fontStyle: 'bold' } }, 'Included', '']);
    });
  }

  client.publicView.uncheckedSubFeatures.forEach(subId => {
    const feat = basePkg?.features.find(f => f.id === subId);
    if (feat) tableData.push([{ content: `    - Removed: ${feat.name}`, styles: { textColor: [220, 38, 38] } }, '', { content: `- Rs. ${feat.deductionValue.toLocaleString()}`, styles: { textColor: [220, 38, 38] } }]);
  });

  client.publicView.selectedAddons.forEach(addonId => {
    const addon = ModularAddons[addonId];
    if (addon) tableData.push([{ content: `Premium Add-on: ${addon.name}`, styles: { fontStyle: 'bold' } }, '', `+ Rs. ${addon.price.toLocaleString()}`]);
  });

  client.publicView.customFeatures.forEach(cf => {
    tableData.push([{ content: `Custom Feature: ${cf.name}`, styles: { fontStyle: 'bold' } }, '', `+ Rs. ${cf.price.toLocaleString()}`]);
  });

  tableData.push([
    { content: 'Total One-Time Setup', styles: { fontStyle: 'bold', fillColor: [241, 245, 249] } },
    { content: '', styles: { fillColor: [241, 245, 249] } },
    { content: `Rs. ${client.publicView.oneTimePrice.toLocaleString()}`, styles: { fontStyle: 'bold', fillColor: [241, 245, 249] } }
  ]);

  const infra = client.publicView.infrastructure;
  if (client.publicView.dueTodayInfra > 0 || client.publicView.recurringFromYear2 > 0) {
    tableData.push([ { content: 'Infrastructure Services', styles: { fontStyle: 'bold', textColor: [13, 148, 136] } }, '', '' ]);
    if (infra.hostingProvider === 'devzilla') {
      tableData.push([`    • DevZilla Elite Hosting (1st Year)`, '', `+ Rs. 3,000`]);
      tableData.push([{ content: `    • DevZilla Elite Hosting (Renewal)`, styles: { textColor: [100, 116, 139] } }, '', { content: `Rs. 3,000 / Yr`, styles: { textColor: [100, 116, 139] } }]);
    } else if (infra.hostingProvider === 'assisted' && infra.hostingYearlyCost > 0) {
      tableData.push([`    • Assisted Setup (1st Year)`, '', `+ Rs. ${infra.hostingYearlyCost.toLocaleString()}`]);
      tableData.push([{ content: `    • Assisted Setup (Renewal)`, styles: { textColor: [100, 116, 139] } }, '', { content: `Rs. ${infra.hostingYearlyCost.toLocaleString()} / Yr`, styles: { textColor: [100, 116, 139] } }]);
    }
    if (infra.domainStatus === 'new') {
      tableData.push([`    • Domain Name (1st Year): ${infra.domainName || 'TBD'}`, '', `+ Rs. ${infra.domainFirstYearCost.toLocaleString()}`]);
      tableData.push([{ content: `    • Domain Name (Renewal)`, styles: { textColor: [100, 116, 139] } }, '', { content: `Rs. ${infra.domainRenewalCost.toLocaleString()} / Yr`, styles: { textColor: [100, 116, 139] } }]);
    }
  }

  client.publicView.specialIncentives.forEach(inc => {
    tableData.push([{ content: `Special Incentive: ${inc.reason}`, styles: { textColor: [22, 163, 74], fontStyle: 'bold' } }, '', { content: `- Rs. ${inc.amount.toLocaleString()}`, styles: { textColor: [22, 163, 74] } }]);
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Item / Description', 'Details', 'Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: secondaryColor, textColor: 255, fontStyle: 'bold' },
    styles: { font: 'helvetica', fontSize: 9, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 40, halign: 'center', textColor: [100, 116, 139] },
      2: { cellWidth: 40, halign: 'right', fontStyle: 'bold' }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  if (currentY > 250) { doc.addPage(); currentY = 20; }
  
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Initial Investment (Setup + 1st Year Infra): Rs. ${client.publicView.finalPrice.toLocaleString()}`, 14, currentY);

  // Terms and Conditions
  currentY += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text("Terms & Conditions:", 14, currentY);
  
  currentY += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  
  const advancePercent = client.publicView.paymentMilestone === '100' ? '100%' : client.publicView.paymentMilestone === '50_50' ? '50%' : '40%';
  
  doc.text(`1. ${advancePercent} advance payment required to commence work.`, 14, currentY);
  doc.text("2. Proposal valid for 15 days from the date of issue.", 14, currentY + 5);
  doc.text("3. Infrastructure costs are recurring and must be renewed before expiry.", 14, currentY + 10);

  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated securely via DevZilla OS System. This document is a digitally generated proposal.', 105, 285, { align: 'center' });
  }

  doc.save(`${client.businessName.replace(/\s+/g, '_')}_Detailed_Proposal_${new Date().getTime()}.pdf`);
};
