import { NextResponse } from 'next/server';
import { db } from '../../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { BasePackages, ModularAddons } from '../../../config/pricingDictionary';

export async function GET() {
  try {
    // We will store the base packages and addons in a 'settings' collection, document 'pricing'
    const pricingDocRef = doc(db, 'settings', 'pricing');
    
    await setDoc(pricingDocRef, {
      basePackages: BasePackages,
      modularAddons: ModularAddons,
      lastUpdated: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      message: "Successfully migrated pricingDictionary.ts to Firestore (settings/pricing)!" 
    });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
