import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { BasePackages, ModularAddons } from './pricingDictionary';

export const seedDatabase = async () => {
  try {
    // Seed Base Packages
    await setDoc(doc(db, 'pricing', 'base_packages'), {
      data: BasePackages
    });

    // Seed Add-Ons
    await setDoc(doc(db, 'pricing', 'add_ons'), {
      data: ModularAddons
    });

    console.log('Firebase Seeding Complete: Pricing Dictionary Uploaded successfully.');
    return true;
  } catch (error) {
    console.error('Error seeding Firebase:', error);
    return false;
  }
};
