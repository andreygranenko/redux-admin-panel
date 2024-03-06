import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
import {createSelector} from "reselect";

const heroesAdapter = createEntityAdapter();

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle'
});

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
      heroesAdapter.removeOne(state, action.payload);
    },
    heroAdd: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => { state.heroesLoadingStatus = 'loading'})
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        // state.heroes = action.payload;
        heroesAdapter.setAll(state, action.payload);
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, (state) => { state.heroesLoadingStatus = 'error'; })
      .addDefaultCase(state => state)
  }
});

const {actions, reducer} = heroesSlice;
export default reducer;

const {selectAll} = heroesAdapter.getSelectors((state) => state.heroes);

export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (activeFilter, heroes) => {
    if (activeFilter === "all") {
      return heroes;
    } else {
      return heroes.filter(hero => hero.element === activeFilter);
    }
  }
);
export const {heroesFetching, heroesFetched, heroesFetchingError, heroDelete, heroAdd} = actions;