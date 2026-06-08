import { create } from 'zustand';
import { BasePackageId, AddonId, BasePackages, ModularAddons } from '../config/pricingDictionary';

export type Discount = { id: string; amount: number; reason: string };

export type CustomFeature = { id: string; name: string; price: number };

export type ClientDocument = {
  id: string;
  clientName: string;
  businessName: string;
  industry: string;
  publicView: {
    basePackage: BasePackageId;
    uncheckedSubFeatures: string[]; 
    customFeatures: CustomFeature[]; 
    selectedAddons: AddonId[];
    infrastructure: {
      hostingProvider: 'devzilla' | 'client' | 'assisted';
      domainStatus: 'new' | 'owned';
      durationYears: number;
      domainName: string;
      domainFirstYearCost: number;
      domainRenewalCost: number;
      hostingYearlyCost: number;
    };
    specialIncentives: Discount[];
    clientRequirements: Record<string, string>;
    finalPrice: number;
    oneTimePrice: number;
    dueTodayInfra: number;
    recurringFromYear2: number;
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
  clients: ClientDocument[]; 
  initClient: (id: string) => void;
  initClientWithDetails: (id: string, clientName: string, businessName: string) => void;
  selectClient: (id: string) => void;
  setIndustry: (industry: string) => void;
  setBasePackage: (pkg: BasePackageId) => void;
  toggleSubFeature: (subId: string) => void; // Added
  addCustomFeature: (name: string, price: number) => void; // Added
  removeCustomFeature: (id: string) => void; // Added
  updateCustomFeature: (id: string, name: string, price: number) => void;
  updateInfrastructure: (updates: Partial<ClientDocument['publicView']['infrastructure']>) => void;
  updateClientDetails: (updates: Partial<Pick<ClientDocument, 'clientName' | 'businessName'> & { clientRequirements?: Record<string, string> }>) => void;
  toggleAddon: (addon: AddonId) => void;
  addSpecialIncentive: (amount: number, reason: string) => void;
  removeSpecialIncentive: (id: string) => void;
  addDiscount: (amount: number, reason: string) => void;
  removeDiscount: (id: string) => void;
  updateInternalNotes: (notes: string) => void;
  setFollowUpSchedule: (schedule: '3_days' | '7_days' | '14_days' | null) => void;
}

const recalculatePrices = (client: ClientDocument): ClientDocument => {
  const basePkg = BasePackages[client.publicView.basePackage];
  const basePrice = basePkg.price;
  
  const deductions = client.publicView.uncheckedSubFeatures.reduce((sum, subId) => {
    const feature = basePkg.features.find(f => f.id === subId);
    return sum + (feature ? feature.deductionValue : 0);
  }, 0);

  const addonsPrice = client.publicView.selectedAddons.reduce((sum, addonId) => sum + ModularAddons[addonId].price, 0);
  const customFeaturesPrice = client.publicView.customFeatures.reduce((sum, cf) => sum + cf.price, 0);
  const totalDiscounts = client.privateView.discounts.reduce((sum, d) => sum + d.amount, 0);
  const totalIncentives = client.publicView.specialIncentives.reduce((sum, d) => sum + d.amount, 0);

  const infra = client.publicView.infrastructure;
  let hostingYear1 = 0;
  let hostingRenewal = 0;
  if (infra.hostingProvider === 'devzilla') {
    hostingYear1 = 3000;
    hostingRenewal = 3000;
  } else if (infra.hostingProvider === 'assisted') {
    hostingYear1 = infra.hostingYearlyCost;
    hostingRenewal = infra.hostingYearlyCost;
  }
  
  const domainYear1 = infra.domainStatus === 'new' ? infra.domainFirstYearCost : 0;
  const domainRenewal = infra.domainStatus === 'new' ? infra.domainRenewalCost : 0;
  
  const dueTodayInfra = hostingYear1 + domainYear1;
  const recurringFromYear2 = hostingRenewal + domainRenewal;

  const baseCostWithoutInfra = basePrice - deductions + addonsPrice + customFeaturesPrice;
  const oneTimePrice = Math.max(0, baseCostWithoutInfra - totalIncentives);
  
  const baseCost = baseCostWithoutInfra + dueTodayInfra; // Just for margin calc
  const finalPrice = Math.max(0, oneTimePrice + dueTodayInfra - totalDiscounts); // Total Due Today

  return {
    ...client,
    publicView: {
      ...client.publicView,
      finalPrice,
      oneTimePrice,
      dueTodayInfra,
      recurringFromYear2,
    },
    privateView: {
      ...client.privateView,
      baseCost,
      margin: finalPrice, 
    }
  };
};

export const useAgencyStore = create<AgencyState>((set) => ({
  currentClient: null,
  clients: [
    {
      id: 'demo-client-1',
      clientName: 'Rahul Sharma',
      businessName: 'Spice Route Restaurant',
      industry: 'Restaurant',
      publicView: { 
        basePackage: 'standard_restaurant', 
        uncheckedSubFeatures: [], 
        customFeatures: [], 
        selectedAddons: ['online_ordering'], 
        infrastructure: { hostingProvider: 'devzilla', domainStatus: 'new', durationYears: 1, domainName: '', domainFirstYearCost: 1000, domainRenewalCost: 1000, hostingYearlyCost: 0 },
        specialIncentives: [],
        clientRequirements: '',
        finalPrice: 28999,
        oneTimePrice: 24999,
        dueTodayInfra: 4000,
        recurringFromYear2: 4000
      },
      privateView: { baseCost: 28999, discounts: [{ id: 'd1', amount: 2000, reason: 'Early close' }], margin: 26999, internalNotes: 'High priority', followUpSchedule: '3_days' }
    },
    {
      id: 'demo-client-2',
      clientName: 'Priya Patel',
      businessName: 'Vogue Boutique',
      industry: 'E-Commerce',
      publicView: { 
        basePackage: 'premium_restaurant', 
        uncheckedSubFeatures: [], 
        customFeatures: [], 
        selectedAddons: ['payment_gateway', 'admin_panel'], 
        infrastructure: { hostingProvider: 'client', domainStatus: 'owned', durationYears: 1, domainName: '', domainFirstYearCost: 1000, domainRenewalCost: 1000, hostingYearlyCost: 0 },
        specialIncentives: [],
        clientRequirements: '',
        finalPrice: 31999,
        oneTimePrice: 31999,
        dueTodayInfra: 0,
        recurringFromYear2: 0
      },
      privateView: { baseCost: 31999, discounts: [], margin: 31999, internalNotes: 'Budget strict', followUpSchedule: '7_days' }
    }
  ],

  initClient: (id) => set(() => {
    // Legacy fallback
    const initialClient: ClientDocument = {
      id,
      clientName: 'New Client',
      businessName: 'Unknown Business',
      industry: 'General',
      publicView: {
        basePackage: 'basic_bhojnalaya',
        uncheckedSubFeatures: [],
        customFeatures: [],
        selectedAddons: [],
        infrastructure: { hostingProvider: 'devzilla', domainStatus: 'new', durationYears: 1, domainName: '', domainFirstYearCost: 1000, domainRenewalCost: 1000, hostingYearlyCost: 0 },
        specialIncentives: [],
        clientRequirements: '',
        finalPrice: BasePackages['basic_bhojnalaya'].price + 4000, // +4000 for 1yr domain & hosting
        oneTimePrice: BasePackages['basic_bhojnalaya'].price,
        dueTodayInfra: 4000,
        recurringFromYear2: 4000,
      },
      privateView: {
        baseCost: BasePackages['basic_bhojnalaya'].price + 4000,
        discounts: [],
        margin: BasePackages['basic_bhojnalaya'].price + 4000,
        internalNotes: '',
        followUpSchedule: null,
      }
    };
    return { currentClient: initialClient, clients: [...useAgencyStore.getState().clients, initialClient] };
  }),

  initClientWithDetails: (id: string, clientName: string, businessName: string) => set((state) => {
    const initialClient: ClientDocument = {
      id,
      clientName,
      businessName,
      industry: 'General',
      publicView: {
        basePackage: 'basic_bhojnalaya',
        uncheckedSubFeatures: [],
        customFeatures: [],
        selectedAddons: [],
        infrastructure: { hostingProvider: 'devzilla', domainStatus: 'new', durationYears: 1, domainName: '', domainFirstYearCost: 1000, domainRenewalCost: 1000, hostingYearlyCost: 0 },
        specialIncentives: [],
        clientRequirements: '',
        finalPrice: BasePackages['basic_bhojnalaya'].price + 4000,
        oneTimePrice: BasePackages['basic_bhojnalaya'].price,
        dueTodayInfra: 4000,
        recurringFromYear2: 4000,
      },
      privateView: {
        baseCost: BasePackages['basic_bhojnalaya'].price + 4000,
        discounts: [],
        margin: BasePackages['basic_bhojnalaya'].price + 4000,
        internalNotes: '',
        followUpSchedule: null,
      }
    };
    return { currentClient: initialClient, clients: [...state.clients, initialClient] };
  }),

  selectClient: (id) => set((state) => {
    const client = state.clients.find(c => c.id === id);
    if (client) {
      return { currentClient: { ...client } };
    }
    return state;
  }),

  updateClientDetails: (updates) => set((state) => {
    if (!state.currentClient) return state;
    const updatedClient = {
      ...state.currentClient,
      clientName: updates.clientName !== undefined ? updates.clientName : state.currentClient.clientName,
      businessName: updates.businessName !== undefined ? updates.businessName : state.currentClient.businessName,
      publicView: {
        ...state.currentClient.publicView,
        clientRequirements: updates.clientRequirements !== undefined ? updates.clientRequirements : state.currentClient.publicView.clientRequirements
      }
    };
    return { currentClient: recalculatePrices(updatedClient) };
  }),

  toggleSubFeature: (subId) => set((state) => {
    if (!state.currentClient) return state;
    const currentUnchecked = state.currentClient.publicView.uncheckedSubFeatures;
    const newUnchecked = currentUnchecked.includes(subId)
      ? currentUnchecked.filter(id => id !== subId)
      : [...currentUnchecked, subId];

    return {
      currentClient: recalculatePrices({
        ...state.currentClient,
        publicView: { ...state.currentClient.publicView, uncheckedSubFeatures: newUnchecked }
      })
    };
  }),

  addCustomFeature: (name, price) => set((state) => {
    if (!state.currentClient) return state;
    const newFeature = { id: Date.now().toString(), name, price };
    return {
      currentClient: recalculatePrices({
        ...state.currentClient,
        publicView: { 
          ...state.currentClient.publicView, 
          customFeatures: [...state.currentClient.publicView.customFeatures, newFeature] 
        }
      })
    };
  }),

  removeCustomFeature: (id) => set((state) => {
    if (!state.currentClient) return state;
    return {
      currentClient: recalculatePrices({
        ...state.currentClient,
        publicView: { 
          ...state.currentClient.publicView, 
          customFeatures: state.currentClient.publicView.customFeatures.filter(f => f.id !== id) 
        }
      })
    };
  }),

  updateCustomFeature: (id, name, price) => set((state) => {
    if (!state.currentClient) return state;
    return {
      currentClient: recalculatePrices({
        ...state.currentClient,
        publicView: { 
          ...state.currentClient.publicView, 
          customFeatures: state.currentClient.publicView.customFeatures.map(f => f.id === id ? { ...f, name, price } : f) 
        }
      })
    };
  }),

  updateInfrastructure: (updates) => set((state) => {
    if (!state.currentClient) return state;
    return {
      currentClient: recalculatePrices({
        ...state.currentClient,
        publicView: {
          ...state.currentClient.publicView,
          infrastructure: {
            ...state.currentClient.publicView.infrastructure,
            ...updates
          }
        }
      })
    };
  }),

  setIndustry: (industry) => set((state) => {
    if (!state.currentClient) return state;
    
    // Auto-fill template logic based on industry
    let prefilledAddons: AddonId[] = [];
    let basePkg: BasePackageId = state.currentClient.publicView.basePackage;

    switch(industry) {
      case 'Restaurant':
        basePkg = 'standard_restaurant';
        prefilledAddons = ['online_ordering', 'table_reservation', 'advanced_seo'];
        break;
      case 'Hospital':
        basePkg = 'standard_restaurant';
        prefilledAddons = ['table_reservation', 'live_chat'];
        break;
      case 'E-Commerce':
        basePkg = 'premium_restaurant';
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

  addSpecialIncentive: (amount, reason) => set((state) => {
    if (!state.currentClient) return state;
    const newIncentive = { id: Date.now().toString(), amount, reason };
    return {
      currentClient: recalculatePrices({
        ...state.currentClient,
        publicView: {
          ...state.currentClient.publicView,
          specialIncentives: [...state.currentClient.publicView.specialIncentives, newIncentive]
        }
      })
    };
  }),

  removeSpecialIncentive: (id) => set((state) => {
    if (!state.currentClient) return state;
    return {
      currentClient: recalculatePrices({
        ...state.currentClient,
        publicView: {
          ...state.currentClient.publicView,
          specialIncentives: state.currentClient.publicView.specialIncentives.filter(d => d.id !== id)
        }
      })
    };
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
