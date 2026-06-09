import { agencyContext } from '../config/agencyContext';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export const OpenRouterAgent = {
  async generateJSON(prompt: string, model = "nvidia/nemotron-3-super-120b-a12b:free") {
    if (!OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY is missing in .env.local");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { 
            role: "system", 
            content: `You are an elite software agency manager. You must reply ONLY in valid JSON format. No markdown, no backticks, no explanations.\n\n${agencyContext}` 
          },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" } 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API Failed:", errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;

    const cleanJSON = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(cleanJSON);
  }
};

export const generateRequirementAnalysis = async (clientInput: string, industry: string) => {
  const prompt = `
Analyze these raw client requirements for 'DevZilla Agency OS'.
Client Industry: ${industry}
Client Input/Notes: "${clientInput}"

Recommend the optimal blueprint using ONLY the base packages and add-ons from the official rate card provided in your system instructions.

EXPECTED OUTPUT FORMAT (Follow strictly):
{
  "recommendedBasePackage": "standard_restaurant",
  "baseReasoning": "Because they are on a tight budget.",
  "recommendedAddons": ["online_ordering", "live_chat"],
  "addonsReasoning": "Client explicitly asked for delivery and chat support.",
  "estimatedTimeline": "2-4 Days (Vibe Coding Speed)",
  "dealProbabilityScore": 85,
  "nextAction": "Send Proposal with 50/50 milestone"
}
`;
  return await OpenRouterAgent.generateJSON(prompt);
};

export const generateSalesCoachResponse = async (objection: string, industry: string) => {
  const prompt = `
You are a persuasive Sales Coach for 'DevZilla Web Agency'.
The client (Industry: ${industry}) gave this objection: "${objection}"

Provide 3 highly effective rebuttals to close the deal.

EXPECTED OUTPUT FORMAT (Follow strictly):
{
  "objectionAnalysis": "They don't understand the value of custom SEO vs Wix templates.",
  "responses": [
    "I completely understand. Wix is great for hobbies, but custom code guarantees speed and Google ranking which brings you real customers.",
    "If we use a template, you'll look like 100 other gyms. Our custom UI ensures you stand out.",
    "We can delay this, but your competitors are already capturing these online leads today."
  ]
}
`;
  return await OpenRouterAgent.generateJSON(prompt);
};

export const generatePricingWizard = async (input: string, category: string) => {
  const prompt = `
You are a structural data generator for 'DevZilla Web Agency'.
The admin wants to create or update a Pricing Package in the database for the category: "${category}".
Their raw input is: "${input}"

Your job is to parse their Hindi/English intent and map it to our strict database schema.
If they mention features, assign reasonable 'deductionValue's (e.g. 1000 to 5000) for each sub-feature based on complexity.

EXPECTED OUTPUT FORMAT (Strict JSON):
{
  "id": "generate_a_snake_case_id",
  "name": "Package Name",
  "price": 24999,
  "description": "Short compelling description",
  "features": [
    { "id": "feat_1", "name": "Feature 1", "deductionValue": 2000 },
    { "id": "feat_2", "name": "Feature 2", "deductionValue": 1500 }
  ],
  "freeServices": ["1 Month Free Maintenance", "Free Logo"]
}
`;
  return await OpenRouterAgent.generateJSON(prompt);
};

