import React from "react";

import "./app.less";

import LeftSidebar from "./LeftSidebar/LeftSidebar";
import RightSidebar from "./RightSidebar/RightSidebar";
import Book from "./Book/Book";

export default function App() {
    return (
        <div className="app">
            <LeftSidebar />
            <Book />
            <RightSidebar />
        </div>
    );
}
