import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  counter: 1,
  basket: [], // Assuming this is your basket state
};

// Slice creation
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Reducer functions
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      if (state.counter > 0) {
        state.counter -= 1;
      }
    },
    addToOrders: (state, action) => {
      const newProduct = action.payload;
      if (newProduct && newProduct.id) {
        const existingProduct = state.basket.find(
          (item) => item.id === newProduct.id
        );

        if (!existingProduct) {
          state.basket.push(newProduct);
          // Update local storage here if necessary
        }
      }
    },
    removeFromOrders: (state, action) => {
      state.basket = state.basket.filter(
        (item) => item.id !== action.payload.id
      );
      // Update local storage here if necessary
    },
    clearOrders: (state) => {
      state.basket = [];
      // Update local storage here if necessary
    },
  },
});

// Export actions and reducer
export const {
  increment,
  decrement,
  addToOrders,
  removeFromOrders,
  clearOrders,
} = counterSlice.actions;

export default counterSlice.reducer;
