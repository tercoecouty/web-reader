import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./slice/bookSlice";
import noteReducer from "./slice/noteSlice";
import bookmarkReducer from "./slice/bookmarkSlice";

const store = configureStore({
    reducer: {
        book: bookReducer,
        note: noteReducer,
        bookmark: bookmarkReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
