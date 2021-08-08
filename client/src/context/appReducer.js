const AppReducer =  (state, action) => {
    switch (action.type) {
      case 'USER_DATA':
        return {
          ...state,
          users: [...state.users, ...action.payload],
        };
        case 'GET_DATA':
          return {
            ...state,
            users: action.payload,
          };
          case 'DELETE_DATA':
            return {
              ...state,
              users: action.payload,
            };
      default:
        return state;
    }
  };

export default AppReducer;