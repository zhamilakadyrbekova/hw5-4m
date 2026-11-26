import React from "react";
import {Counter, FilteredList} from "./components/MemoTasks.jsx";

export default function App() {
    return (
        <div style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 640 }}>
            <Counter />
            <FilteredList />
        </div>
    );
}
