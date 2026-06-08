'use client';
import { useEffect, useState } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';

const FORM_SECTIONS = [
  {
    title: "📝 Business Information",
    questions: [
      { id: 'b1', question: 'Restaurant/Bhojnalaya Name?', suggestions: [] },
      { id: 'b2', question: 'Tagline hai?', suggestions: ['Nahi hai', 'Ha, ye hai: ', 'Aap suggest kardo'] },
      { id: 'b3', question: 'Kab se business chal raha hai?', suggestions: ['Naya open ho raha hai', '1 saal se kam', '1-5 saal', '5+ saal'] },
      { id: 'b4', question: 'Pure Veg / Non-Veg?', suggestions: ['Pure Veg', 'Non-Veg', 'Both (Veg & Non-Veg)'] },
      { id: 'b5', question: 'Speciality kya hai?', suggestions: ['North Indian', 'South Indian', 'Chinese', 'Thali', 'Fast Food', 'Sweets & Snacks'] },
      { id: 'b6', question: 'Target customers kaun hain?', suggestions: ['Families', 'Students/Youth', 'Corporate Workers', 'Tourists/Travellers'] },
    ]
  },
  {
    title: "📝 Contact Information",
    questions: [
      { id: 'c1', question: 'Mobile Number', suggestions: [] },
      { id: 'c2', question: 'WhatsApp Number', suggestions: ['Same as Mobile'] },
      { id: 'c3', question: 'Email ID', suggestions: [] },
      { id: 'c4', question: 'Full Address', suggestions: [] },
      { id: 'c5', question: 'Google Maps Location Link', suggestions: ['Map link hai', 'Map par list nahi hai (Banani padegi)'] },
    ]
  },
  {
    title: "📝 Branding",
    questions: [
      { id: 'br1', question: 'Logo hai? (PNG/SVG)', suggestions: ['Ha, High Quality hai', 'Ha, par clear nahi hai', 'Nahi hai, Naya banana padega'] },
      { id: 'br2', question: 'Brand Colors?', suggestions: ['Red & Yellow (Food)', 'Green & Earthy (Veg)', 'Black & Gold (Premium)', 'Not decided'] },
      { id: 'br3', question: 'Koi reference website pasand hai? (Aapko koi website pasand ho to dikha dijiye, usse mujhe style samajh aa jayega)', suggestions: ['Zomato Style', 'Swiggy Style', 'Premium Restaurant Style', 'Modern & Clean'] },
    ]
  },
  {
    title: "📝 Content Requirements",
    questions: [
      { id: 'cn1', question: 'About Us (Story / Owner Message / USP)', suggestions: ['Owner message add karna hai', 'Dukaan ki story add karni hai', 'USP: Authentic Taste'] },
      { id: 'cn2', question: 'Full Menu PDF hai?', suggestions: ['Ha, PDF/Images ready hai', 'Nahi, Type karna padega'] },
      { id: 'cn3', question: 'Prices update hote rehte hain?', suggestions: ['Bohot change hote hain', 'Fix rehte hain'] },
      { id: 'cn4', question: 'Photos (Interior/Exterior/Food/Staff)', suggestions: ['Professional Photos hain', 'Mobile se kheeche hain', 'Photosauce (Stock) chahiye'] },
    ]
  },
  {
    title: "📝 Features Discussion",
    questions: [
      { id: 'f1', question: 'Basic Features Chahiye?', suggestions: ['Menu Showcase', 'Photo Gallery', 'Customer Reviews', 'WhatsApp Button', 'Google Maps Embed'] },
      { id: 'f2', question: 'Advanced Features Chahiye?', suggestions: ['Table Reservation', 'Catering Booking', 'Party/Event Booking', 'Online Inquiry Form'] },
    ]
  },
  {
    title: "📝 Orders Related (Important)",
    questions: [
      { id: 'o1', question: 'Customer sirf inquiry bheje ya online order bhi kare?', suggestions: ['Sirf WhatsApp Inquiry', 'WhatsApp Order (Cart to WA)', 'Full Online Ordering (Zomato Style)'] },
    ]
  },
  {
    title: "📝 SEO & Marketing",
    questions: [
      { id: 's1', question: 'Google Business Profile hai?', suggestions: ['Ha, Verified hai', 'Nahi hai', 'Hai par access nahi hai'] },
      { id: 's2', question: 'Social Media Pages (Insta/FB)?', suggestions: ['Dono hain', 'Sirf Instagram', 'Sirf Facebook', 'Naya banana hai'] },
    ]
  },
  {
    title: "📝 Domain & Hosting",
    questions: [
      { id: 'd1', question: 'Domain hai ya naya lena hai?', suggestions: ['Pehle se hai', 'Naya lena hai (.com)', 'Naya lena hai (.in)'] },
      { id: 'd2', question: 'Domain owner ke naam par purchase karna hai? (Recommended)', suggestions: ['Client Email se purchase karenge', 'Agency account se lenge'] },
    ]
  },
  {
    title: "📝 Maintenance",
    questions: [
      { id: 'm1', question: 'Website live hone ke baad menu ya photos kaun update karega?', suggestions: ['Agency maintain karegi (AMC)', 'Client khud karega (Admin Panel chahiye)'] },
    ]
  },
  {
    title: "📝 Project & Budget (Most Important)",
    questions: [
      { id: 'p1', question: 'Website kab tak chahiye (Timeline)?', suggestions: ['As soon as possible (Urgent)', 'Within 1 Week', 'Within 15 Days', '1 Month'] },
      { id: 'p2', question: 'Approx budget kya socha hai?', suggestions: ['Under ₹15,000', '₹15,000 - ₹25,000', '₹30,000+ (Premium)'] },
      { id: 'p3', question: 'Decision maker kaun hai?', suggestions: ['Owner themselves', 'Manager/Partner'] },
    ]
  },
  {
    title: "🔥 Top 3 Core Questions",
    questions: [
      { id: 't1', question: 'Website ka main purpose kya hai?', suggestions: ['Customers lana (SEO/Ads)', 'Orders lena (E-Commerce)', 'Trust banana (Portfolio)'] },
      { id: 't2', question: 'Aapko sirf information website chahiye ya orders bhi lene hain?', suggestions: ['Sirf Information', 'Information + WhatsApp Order', 'Full Automated Ordering'] },
    ]
  }
];

export default function ClientBrief({ clientId, onNext }: { clientId: string, onNext: () => void }) {
  const { clients, selectClient, currentClient, updateClientDetails } = useAgencyStore();

  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!currentClient || currentClient.id !== clientId) {
      if (!clients.find(c => c.id === clientId)) {
        useAgencyStore.getState().initClient(clientId);
      }
      selectClient(clientId);
    } else {
      const reqString = currentClient.publicView.clientRequirements || '';
      if (reqString) {
        const parsed: Record<string, string> = {};
        const lines = reqString.split('\n\n');
        lines.forEach(line => {
          const match = line.match(/^\*\*Q: (.*?)\*\*\n(.*)$/s);
          if (match) {
            const qText = match[1];
            const aText = match[2];
            let foundId = null;
            // Search all sections to find the matching question
            for (const section of FORM_SECTIONS) {
              const q = section.questions.find(fq => fq.question === qText);
              if (q) {
                foundId = q.id;
                break;
              }
            }
            if (foundId) {
              parsed[foundId] = aText;
            }
          } else {
            parsed['additional'] = reqString;
          }
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnswers(prev => Object.keys(prev).length === 0 ? parsed : prev);
      }
    }
  }, [clientId, currentClient, selectClient, clients]);

  if (!currentClient) return null;

  const updateGlobalStore = (newAnswers: Record<string, string>) => {
    // Flatten all questions
    const allQuestions = FORM_SECTIONS.flatMap(s => s.questions);
    
    const formattedText = allQuestions.map(q => {
      const a = newAnswers[q.id];
      return a ? `**Q: ${q.question}**\n${a}` : '';
    }).filter(Boolean).join('\n\n');
    
    let finalText = formattedText;
    if (newAnswers['additional']) {
      finalText += (formattedText ? '\n\n' : '') + `**Q: Additional Notes**\n${newAnswers['additional']}`;
    }

    updateClientDetails({ clientRequirements: finalText });
  };

  const handleAnswerChange = (qId: string, value: string) => {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);
    updateGlobalStore(newAnswers);
  };

  const handleSuggestionClick = (qId: string, suggestion: string) => {
    const currentAns = answers[qId] || '';
    const newAns = currentAns ? `${currentAns}, ${suggestion}` : suggestion;
    handleAnswerChange(qId, newAns);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-[#1e293b] tracking-tight">
          Client Brief & Requirements
        </h1>
        <p className="text-[#64748b] text-lg">
          Gather all necessary details to construct the perfect digital solution.
        </p>
      </div>

      {/* Requirements Engine - Google Form Style with Sections */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-[#1e293b] p-6 text-white border-t-8 border-[#0d9488]">
          <h3 className="text-2xl font-bold mb-2">Project Intake Form</h3>
          <p className="text-gray-300 text-sm">Select recommended answers or type custom requirements below.</p>
        </div>

        <div className="p-6 md:p-8 space-y-12 bg-[#f8fafc]">
          {FORM_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-xl font-bold text-[#0d9488] mb-6 pb-2 border-b border-gray-100">
                {section.title}
              </h4>
              
              <div className="space-y-8">
                {section.questions.map((q, idx) => (
                  <div key={q.id} className="relative">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <label className="block text-base font-bold text-[#1e293b] mb-3 leading-tight">
                          {q.question}
                        </label>
                        
                        {q.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {q.suggestions.map((sug, sugIdx) => (
                              <button
                                key={sugIdx}
                                onClick={() => handleSuggestionClick(q.id, sug)}
                                className="bg-[#f8fafc] hover:bg-[#e2e8f0] text-[#475569] hover:text-[#0f172a] text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 border border-gray-200"
                              >
                                <span>{sug}</span>
                                <i className="fa-solid fa-plus text-[10px] opacity-50"></i>
                              </button>
                            ))}
                          </div>
                        )}

                        <input
                          type="text"
                          value={answers[q.id] || ''}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          className="w-full bg-transparent border-b-2 border-gray-200 px-1 py-2 text-[#1e293b] focus:outline-none focus:border-[#0d9488] transition-colors text-sm"
                          placeholder="Type your answer here..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Additional Notes */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-xl font-bold text-[#0d9488] mb-6 pb-2 border-b border-gray-100">
              📝 Additional Notes / Custom Requirements
            </h4>
            <textarea
              value={answers['additional'] || ''}
              onChange={(e) => handleAnswerChange('additional', e.target.value)}
              rows={4}
              className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-[#1e293b] focus:outline-none focus:border-[#0d9488] transition-colors resize-y text-sm"
              placeholder="Any other details not covered above..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-3"
        >
          Proceed to Quoting Engine <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
