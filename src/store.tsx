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

export { store };
