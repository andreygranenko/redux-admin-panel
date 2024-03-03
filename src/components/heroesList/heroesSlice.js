import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
}

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  () => {
    const {request} = useHttp();
    return request("http://localhost:3001/heroes");
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroDelete: (state, action) => {
      state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
    },
    heroAdd: (state, action) => {
      state.heroes = [...state.heroes, action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => { state.heroesLoadingStatus = 'loading'})
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, (state) => { state.heroesLoadingStatus = 'error'; })
      .addDefaultCase(state => state)
  }
});

const {actions, reducer} = heroesSlice;
export default reducer;
export const {heroesFetching, heroesFetched, heroesFetchingError, heroDelete, heroAdd} = actions;