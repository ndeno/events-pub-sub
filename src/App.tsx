import * as React from "react";
import "./App.css";
import { store } from "./store";

// typed JHerr use external store
// https://github.com/jherr/syncexternalstore/tree/main/csr

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

function App() {
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

export default App;
