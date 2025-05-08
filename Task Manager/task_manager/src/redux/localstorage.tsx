export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("taskState");
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      console.warn("Could not load state:", e);
      return undefined;
    }
  };
  
  export const saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("taskState", serializedState);
    } catch (e) {
      console.warn("Could not save state:", e);
    }
  };
  