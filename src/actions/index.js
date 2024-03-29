
// export const fetchFilters = (request) => (dispatch) => {
//     request("http://localhost:3001/filters")
//         .then(data => dispatch(filtersFetched(data)))
//         .catch((e) => console.log(e));
// }

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetching = createAction('HEROES_FETCHING');
//
// export const heroesFetched = createAction('HEROES_FETCHED');
//
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
//
// export const heroDelete = createAction('HERO_DELETE');
//
// export const heroAdd = createAction('HERO_ADD');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroDelete = (id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: id
//     }
// }

// export const heroAdd = (hero) => {
//     return {
//         type: 'HERO_ADD',
//         payload: hero
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }
//
// export const changeFilter = (filter) => {
//     return {
//         type: 'CHANGE_FILTER',
//         payload: filter
//     };
// }

// export const changeFilter = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'CHANGE_FILTER',
//             payload: filter
//         })
//     }, 1000);
// }