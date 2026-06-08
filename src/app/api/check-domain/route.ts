import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
    }

    // SIMULATED ENGINE: Mock a 2-second API delay to simulate registrar ping
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // SIMULATED LOGIC: Randomize availability for demo purposes
    // In production, replace this block with Namecheap/GoDaddy API fetch
    const isAvailable = Math.random() > 0.3; // 70% chance it's available

    if (!isAvailable) {
      return NextResponse.json({
        domain,
        available: false,
        price: 0,
      });
    }

    // SIMULATED PRICING: Base cost ~₹800 + 50% Markup = ₹1,200
    // Real implementation: const basePrice = data.price;
    const basePrice = 800;
    const markupPercentage = 0.50;
    const finalPrice = basePrice + (basePrice * markupPercentage);

    return NextResponse.json({
      domain,
      available: true,
      price: finalPrice,
    });

  } catch (error) {
    console.error('Domain check failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
