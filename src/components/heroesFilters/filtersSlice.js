import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus =  'idle';
    },
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    }
  }
});

const {reducer, actions} = filtersSlice;
export default reducer;
export const {filtersFetched, changeFilter} = actions;