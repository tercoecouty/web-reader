import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./app/Book/bookReducer";
import noteReducer from "./app/RightSidebar/noteReducer";
import bookmarkReducer from "./app/Bookmark/bookmarkReducer";

const store = configureStore({
    reducer: {
        book: bookReducer,
        note: noteReducer,
        bookmark: bookmarkReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
