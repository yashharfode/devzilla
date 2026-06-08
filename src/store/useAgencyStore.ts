import { create } from 'zustand';
import { BasePackageId, AddonId, BasePackages, ModularAddons } from '../config/pricingDictionary';

export type Discount = { id: string; amount: number; reason: string };

export type ClientDocument = {
  id: string;
  industry: string;
  publicView: {
    basePackage: BasePackageId;
    selectedAddons: AddonId[];
    finalPrice: number;
  };
  privateView: {
    baseCost: number;
    discounts: Discount[];
    margin: number;
    internalNotes: string;
    followUpSchedule: '3_days' | '7_days' | '14_days' | null;
  };
};

interface AgencyState {
  currentClient: ClientDocument | null;
  clients: ClientDocument[]; // Added for CRM
  initClient: (id: string) => void;
  setIndustry: (industry: string) => void;
  setBasePackage: (pkg: BasePackageId) => void;
  toggleAddon: (addon: AddonId) => void;
  addDiscount: (amount: number, reason: string) => void;
  removeDiscount: (id: string) => void;
  updateInternalNotes: (notes: string) => void;
  setFollowUpSchedule: (schedule: '3_days' | '7_days' | '14_days' | null) => void;
}

const recalculatePrices = (client: ClientDocument): ClientDocument => {
  const basePrice = BasePackages[client.publicView.basePackage].price;
  const addonsPrice = client.publicView.selectedAddons.reduce((sum, addonId) => sum + ModularAddons[addonId].price, 0);
  const totalDiscounts = client.privateView.discounts.reduce((sum, d) => sum + d.amount, 0);

  const baseCost = basePrice + addonsPrice;
  const finalPrice = Math.max(0, baseCost - totalDiscounts);

  return {
    ...client,
    publicView: {
      ...client.publicView,
      finalPrice,
    },
    privateView: {
      ...client.privateView,
      baseCost,
      margin: finalPrice, // Simplified margin tracking (could subtract actual dev costs here)
    }
  };
};

export const useAgencyStore = create<AgencyState>((set) => ({
  currentClient: null,
  clients: [
    {
      id: 'demo-client-1',
      industry: 'Restaurant',
      publicView: { basePackage: 'standard_business', selectedAddons: ['online_ordering'], finalPrice: 23000 },
      privateView: { baseCost: 23000, discounts: [{ id: 'd1', amount: 2000, reason: 'Early close' }], margin: 21000, internalNotes: 'High priority', followUpSchedule: '3_days' }
    },
    {
      id: 'demo-client-2',
      industry: 'E-Commerce',
      publicView: { basePackage: 'ecommerce', selectedAddons: ['payment_gateway', 'admin_panel'], finalPrice: 32000 },
      privateView: { baseCost: 32000, discounts: [], margin: 32000, internalNotes: 'Budget strict', followUpSchedule: '7_days' }
    }
  ],

  initClient: (id) => set(() => {
    const initialClient: ClientDocument = {
      id,
      industry: 'General',
      publicView: {
        basePackage: 'landing_page',
        selectedAddons: [],
        finalPrice: BasePackages['landing_page'].price,
      },
      privateView: {
        baseCost: BasePackages['landing_page'].price,
        discounts: [],
        margin: BasePackages['landing_page'].price,
        internalNotes: '',
        followUpSchedule: null,
      }
    };
    return { currentClient: initialClient };
  }),

  setIndustry: (industry) => set((state) => {
    if (!state.currentClient) return state;
    
    // Auto-fill template logic based on industry
    let prefilledAddons: AddonId[] = [];
    let basePkg: BasePackageId = state.currentClient.publicView.basePackage;

    switch(industry) {
      case 'Restaurant':
        basePkg = 'standard_business';
        prefilledAddons = ['online_ordering', 'table_reservation', 'advanced_seo'];
        break;
      case 'Hospital':
        basePkg = 'standard_business';
        prefilledAddons = ['table_reservation', 'live_chat'];
        break;
      case 'E-Commerce':
        basePkg = 'ecommerce';
        prefilledAddons = ['admin_panel', 'online_ordering', 'payment_gateway'];
        break;
      default:
        prefilledAddons = [];
    }

    const updatedClient = recalculatePrices({
      ...state.currentClient,
      industry,
      publicView: {
        ...state.currentClient.publicView,
        basePackage: basePkg,
        selectedAddons: prefilledAddons,
      }
    });

    return { currentClient: updatedClient };
  }),

  setBasePackage: (pkg) => set((state) => {
    if (!state.currentClient) return state;
    const updatedClient = recalculatePrices({
      ...state.currentClient,
      publicView: {
        ...state.currentClient.publicView,
        basePackage: pkg,
      }
    });
    return { currentClient: updatedClient };
  }),

  toggleAddon: (addon) => set((state) => {
    if (!state.currentClient) return state;
    
    const currentAddons = state.currentClient.publicView.selectedAddons;
    const isSelected = currentAddons.includes(addon);
    const newAddons = isSelected 
      ? currentAddons.filter(a => a !== addon) 
      : [...currentAddons, addon];

    const updatedClient = recalculatePrices({
      ...state.currentClient,
      publicView: {
        ...state.currentClient.publicView,
        selectedAddons: newAddons,
      }
    });
    return { currentClient: updatedClient };
  }),

  addDiscount: (amount, reason) => set((state) => {
    if (!state.currentClient) return state;
    
    const newDiscount: Discount = { id: Date.now().toString(), amount, reason };
    const updatedClient = recalculatePrices({
      ...state.currentClient,
      privateView: {
        ...state.currentClient.privateView,
        discounts: [...state.currentClient.privateView.discounts, newDiscount],
      }
    });
    return { currentClient: updatedClient };
  }),

  removeDiscount: (id) => set((state) => {
    if (!state.currentClient) return state;
    
    const updatedClient = recalculatePrices({
      ...state.currentClient,
      privateView: {
        ...state.currentClient.privateView,
        discounts: state.currentClient.privateView.discounts.filter(d => d.id !== id),
      }
    });
    return { currentClient: updatedClient };
  }),

  updateInternalNotes: (notes) => set((state) => {
    if (!state.currentClient) return state;
    return {
      currentClient: {
        ...state.currentClient,
        privateView: { ...state.currentClient.privateView, internalNotes: notes }
      }
    };
  }),

  setFollowUpSchedule: (schedule) => set((state) => {
    if (!state.currentClient) return state;
    return {
      currentClient: {
        ...state.currentClient,
        privateView: { ...state.currentClient.privateView, followUpSchedule: schedule }
      }
    };
  })
}));
