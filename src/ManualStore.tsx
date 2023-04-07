import * as React from "react";
import "./App.css";

// typed JHerr use external store
// https://github.com/jherr/syncexternalstore/tree/main/csr

// TODO - add selector

function createStore<
  T extends Record<string, number>,
  U extends React.Dispatch<React.SetStateAction<T>>
>(initState: T) {
  let currentState: T = initState;
  const listeners = new Set<U>();

  return {
    getState: () => currentState,
    setState: (newState: T) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe: (listener: U) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const store = createStore({
  valueOne: 1,
  valueTwo: 2,
});

const useStore = () => {
  const [state, setState] = React.useState(store.getState());

  React.useEffect(() => {
    store.subscribe(setState);
  }, []);

  return state;
};

type ItemProp = {
  item: keyof ReturnType<typeof useStore>;
};

const DisplayValue = ({ item }: ItemProp) => (
  <div>
    {item} : {useStore()[item]}
  </div>
);

const IncrementItem = ({ item }: ItemProp) => (
  <button
    onClick={() => {
      const state = store.getState();
      store.setState({
        ...state,
        [item]: state[item] + 1,
      });
    }}
  >
    Increment {item}
  </button>
);

function ManualStoreApp() {
  return (
    <div className="App">
      <h1>Events Here</h1>
      <IncrementItem item="valueOne" />
      <DisplayValue item="valueOne" />
      <IncrementItem item="valueTwo" />
      <DisplayValue item="valueTwo" />
    </div>
  );
}

export default ManualStoreApp;
