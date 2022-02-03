import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./reducer/bookReducer";
import noteReducer from "./reducer/noteReducer";

const store = configureStore({
    reducer: {
        book: bookReducer,
        note: noteReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
