import React from "react";

import "./app.less";

import LeftSidebar from "../../component/LeftSidebar/LeftSidebar";
import RightSidebar from "../../component/RightSidebar/RightSidebar";
import BookContent from "../../component/BookContent/BookContent";

export default function App() {
    return (
        <div className="app">
            <LeftSidebar />
            <BookContent />
            <RightSidebar />
        </div>
    );
}
