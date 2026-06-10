import { NextResponse } from 'next/server';
import { generateRequirementAnalysis, generateSalesCoachResponse, generatePricingWizard } from '../../../lib/openrouter';

const sanitizeInput = (text: string) => {
  if (!text) return '';
  // Remove markdown formatting like backticks that can confuse JSON output
  return text.replace(/```/g, "'''").replace(/`/g, "'");
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, industry, input, history = [], model } = body;

    if (!action || !industry || !input) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Since we rely on server-side environment variables, the client never sees the API key.
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is not configured on the server. Please add it to .env.local" },
        { status: 500 }
      );
    }

    const safeInput = sanitizeInput(input);
    const safeModel = model || "nvidia/nemotron-3-super-120b-a12b:free";
    
    // Sanitize history as well
    const safeHistory = history.map((msg: any) => ({
      role: msg.role,
      content: sanitizeInput(msg.content)
    }));

    if (action === 'analyze_requirements') {
      const data = await generateRequirementAnalysis(safeInput, industry, safeHistory, safeModel);
      return NextResponse.json(data);
    } else if (action === 'sales_coach') {
      const data = await generateSalesCoachResponse(safeInput, industry, safeHistory, safeModel);
      return NextResponse.json(data);
    } else if (action === 'pricing_wizard') {
      const data = await generatePricingWizard(safeInput, industry, safeModel); // Wizard doesn't need chat history
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Assistant API Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
