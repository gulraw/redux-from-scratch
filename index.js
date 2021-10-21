// ACTION TYPES
const actionTypes = {
  ADD_BUG: "ADD_BUG",
  REMOVE_BUG: "REMOVE_BUG",
  RESOLVE_BUG: "RESOLVE_BUG",
  UNRESOLVE_BUG: "UNRESOLVE_BUG",
};

// REDUCER
let lastId = 0;

function reducer(state = [], action) {
  if (action.type === actionTypes.ADD_BUG) {
    return [
      ...state,
      {
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      },
    ];
  } else if (action.type === actionTypes.REMOVE_BUG) {
    return state.filter((bug) => bug.id !== action.payload.id);
  } else if (action.type === actionTypes.RESOLVE_BUG) {
    return state.map((bug) =>
      bug.id === action.payload.id ? { ...bug, resolved: true } : bug
    );
  } else if (action.type === actionTypes.UNRESOLVE_BUG) {
    return state.map((bug) =>
      bug.id === action.payload.id ? { ...bug, resolved: false } : bug
    );
  }
  return state;
}

// STORE
function createStore(reducer) {
  let state;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    // call the reducer to get the new state
    state = reducer(state, action);
    // notify the subscribers
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  };
}

// ACTIONS
// actions definitions
const addBug = (description) => {
  return {
    type: actionTypes.ADD_BUG,
    payload: {
      description: description,
    },
  };
};

const removeBug = (id) => {
  return {
    type: actionTypes.REMOVE_BUG,
    payload: {
      id: id,
    },
  };
};

const resolveBug = (id) => {
  return {
    type: actionTypes.RESOLVE_BUG,
    payload: {
      id: id,
    },
  };
};

const unresolveBug = (id) => {
  return {
    type: actionTypes.UNRESOLVE_BUG,
    payload: {
      id: id,
    },
  };
};

// actions object
const actions = {
  addBug,
  removeBug,
  resolveBug,
  unresolveBug,
};

// MAIN INDEX
const store = createStore(reducer);

store.subscribe(() => {
  console.log("Store changed", store.getState());
});

// test solution:
store.dispatch(addBug("Bug I"));
store.dispatch(resolveBug(1));
store.dispatch(addBug("Bug II"));
store.dispatch(unresolveBug(1));
store.dispatch(removeBug(2));
