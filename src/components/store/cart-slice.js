import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
name: 'cart',
initialState: {
    items: [],
    totalQuantity: 0,
},
reducers:{
  addItemToCart(state, action){
    const newItem = action.payload;
    console.log({ newItem });

    const tempArr = [...state.items];
    const existingItemIdx = tempArr.findIndex(
      (item) => item.id === newItem.id);
    state.totalQuantity++;
   // console.log(newItem);
    console.log(existingItemIdx);
   // console.log(action);
    if (existingItemIdx !== -1) {
      tempArr[existingItemIdx].quantity += 1;
      tempArr[existingItemIdx].totalPrice += newItem.price;
      console.log({ tempArr}); 
      state.items = tempArr;
    } else {
        state.items.push({
            id: newItem.id,
            price: newItem.price,
            quantity: 1,
            totalPrice: newItem.price,
            title: newItem.title,
            description: newItem.description
        });
    } 
  },
  removeItemFromCart(state, action){
    const id = action.payload;
    const existingItem = state.items.find((item) => item.id === id);
    state.totalQuantity--;
    if (existingItem.quantity === 1) {
       state.items = state.items.filter((item) => item.id !== id);
    } else {
        existingItem.quantity--;
    }
  }
},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;