import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import { loadState, saveState } from "./localstorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
  preloadedState: {
    task: preloadedState?.task || { tasks: [] },
  },
});

store.subscribe(() => {
  saveState({
    task: store.getState().task,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
