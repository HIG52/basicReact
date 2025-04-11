import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

interface MenuState {
  items: MenuItem[];
  selectedCategory: number | null;
}

const initialState: MenuState = {
  items: [],
  selectedCategory: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { setMenuItems, setSelectedCategory, addMenuItem } = menuSlice.actions;
export default menuSlice.reducer; 