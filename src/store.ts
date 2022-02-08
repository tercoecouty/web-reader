import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./reducer/bookReducer";
import noteReducer from "./reducer/noteReducer";
import bookmarkReducer from "./reducer/bookmarkReducer";

const store = configureStore({
    reducer: {
        book: bookReducer,
        note: noteReducer,
        bookmark: bookmarkReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
