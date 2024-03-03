import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
}

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  () => {
    const {request} = useHttp();
    return request("http://localhost:3001/filters");
  }
)

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus =  'idle';
      })
      .addCase(fetchFilters.rejected, (state, action, e) => {
        console.log(e);
      })
      .addDefaultCase(state => state);
  }
});

const {reducer, actions} = filtersSlice;
export default reducer;
export const {filtersFetched, changeFilter} = actions;