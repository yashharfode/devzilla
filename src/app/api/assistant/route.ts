import { NextResponse } from 'next/server';
import { generateRequirementAnalysis, generateSalesCoachResponse, generatePricingWizard } from '../../../lib/openrouter';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, industry, input } = body;

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

    if (action === 'analyze_requirements') {
      const data = await generateRequirementAnalysis(input, industry);
      return NextResponse.json(data);
    } else if (action === 'sales_coach') {
      const data = await generateSalesCoachResponse(input, industry);
      return NextResponse.json(data);
    } else if (action === 'pricing_wizard') {
      const data = await generatePricingWizard(input, industry);
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Assistant API Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
