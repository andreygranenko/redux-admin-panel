import {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
  heroDelete,
  heroAdd
} from "../actions";
import {createReducer} from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, {
  [heroesFetching]: (state) => {
    state.heroesLoadingStatus = 'loading';
  },
  [heroesFetched]: (state, action) => {
    state.heroes = action.payload;
    state.heroesLoadingStatus = 'idle';
  },
  [heroesFetchingError]: (state) => {
    state.heroesLoadingStatus = 'error';
  },
  [heroDelete]: (state, action) => {
    state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
  },
  [heroAdd]: (state, action) => {
    state.heroes = [...state.heroes, action.payload];
  },
}, [],
  state => state
)

// const heroes = createReducer(initialState, (builder) => {
//   builder
//     .addCase(heroesFetching, (state) => {
//       state.heroesLoadingStatus = 'loading';
//     })
//     .addCase(heroesFetched, (state, action) => {
//       state.heroes = action.payload;
//       state.heroesLoadingStatus = 'idle';
//     })
//     .addCase(heroesFetchingError, (state) => {
//       state.heroesLoadingStatus = 'error';
//     })
//     .addCase(heroDelete, (state, action) => {
//       state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
//     })
//     .addCase(heroAdd, (state, action) => {
//       state.heroes = [...state.heroes, action.payload];
//     })
//     .addDefaultCase((state) => state);
// })




// const heroes = (state = initialState, action) => {
//   switch (action.type) {
//     case 'HEROES_FETCHING':
//       return {
//         ...state,
//         heroesLoadingStatus: 'loading'
//       }
//     case 'HEROES_FETCHED':
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: 'idle'
//       }
//     case 'HEROES_FETCHING_ERROR':
//       return {
//         ...state,
//         heroesLoadingStatus: 'error'
//       }
//     case 'HERO_DELETE':
//       return {
//         ...state,
//         heroes: state.heroes.filter(hero => hero.id !== action.payload)
//       }
//     case 'HERO_ADD':
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload]
//       }
//     default: return state
//   }
// }

export default heroes;