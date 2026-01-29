/**
 * Purpose: Configuration Slice (Redux).
 * Manages vehicle configuration state, including model selection, options, and pricing calculations.
 */
import { createSlice } from '@reduxjs/toolkit';

// Helper to calculate totals
const calculateTotals = (state) => {
    // 1. Base Price
    const modelPrice = state.selectedModel ? (state.selectedModel.basePrice || state.selectedModel.price) : 0;
    const basePrice = parseFloat(modelPrice || 0);

    // 2. Add-ons Total
    // Iterate over selectedOptions and sum their prices
    // Note: selectedOptions stores the OPTION ID. We need the price.
    // Storing { id, price } in selectedOptions would be easier than looking it up every time we need total.
    // Let's change state structure slightly to store metadata.

    // Actually, `selectedOptions` in redux: { [baseId]: { optionId, price, label, etc } } is better.
    let addOnsTotal = 0;
    Object.values(state.selectedOptions).forEach(opt => {
        if (opt && opt.price) {
            addOnsTotal += opt.price;
        }
    });

    // 3. Totals
    const totalPerUnit = basePrice + addOnsTotal;
    const grandTotal = totalPerUnit * state.quantity;

    state.pricing = {
        basePrice,
        addOnsTotal,
        totalPerUnit,
        grandTotal
    };
};

const initialState = {
    selectedModel: null, // { id, name, basePrice, imagePath }
    quantity: 1,
    defaultComponents: [],
    // Map of BaseComponentID -> { optionId, price, label, subType }
    selectedOptions: {},
    pricing: {
        basePrice: 0,
        addOnsTotal: 0,
        totalPerUnit: 0,
        grandTotal: 0
    },
    // Adding checking specifically for "isInitialized" to handle page refreshes if needed in future
    isInitialized: false
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        // Start new configuration (Welcome Page)
        startConfiguration: (state, action) => {
            const { model, quantity } = action.payload;
            state.selectedModel = model;
            state.quantity = quantity;
            state.selectedOptions = {}; // Reset options
            state.defaultComponents = [];
            state.pricing.basePrice = model.basePrice || model.price || 0;
            state.isInitialized = true;
            calculateTotals(state);

            // Persist basic info relative to "current order"
            // We can still write to localStorage for redundancy/refresh-safety if we want to mimic old behavior
            localStorage.setItem('current_order_selection', JSON.stringify({
                model,
                quantity,
                basePrice: model.basePrice
            }));
        },

        // Initialize defaults (Default Config Page)
        setDefaultComponents: (state, action) => {
            state.defaultComponents = action.payload;
            // We could auto-select defaults here if we want our state to reflect full config
            // For now, just storing them for reference
        },

        // Update a single option (Modify Config Page)
        selectOption: (state, action) => {
            const { baseComponentId, option } = action.payload;
            // option: { compId, price, label... }

            // If option is null/empty, we might remove the key? Or set to null.
            if (!option) {
                delete state.selectedOptions[baseComponentId];
            } else {
                state.selectedOptions[baseComponentId] = {
                    optionId: option.compId,
                    price: option.price || 0,
                    label: option.subType || option.componentName, // Fallback
                    ...option
                };
            }
            calculateTotals(state);
        },

        // Set entire config state (e.g. recovering from localStorage)
        restoreConfig: (state, action) => {
            // Payload should match our state structure roughly
            const { model, quantity, options, defaults } = action.payload;
            if (model) state.selectedModel = model;
            if (quantity) state.quantity = quantity;
            if (defaults) state.defaultComponents = defaults;
            if (options) state.selectedOptions = options;

            state.isInitialized = true;
            calculateTotals(state);
        },

        resetConfig: () => {
            return initialState;
        }
    }
});

export const { startConfiguration, setDefaultComponents, selectOption, restoreConfig, resetConfig } = configSlice.actions;
export default configSlice.reducer;
