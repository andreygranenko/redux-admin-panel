const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle'
      }
    case 'CHANGE_FILTER':
      return {
        ...state,
        activeFilter: action.payload
      }
    default: return state
  }
}

export default filters;