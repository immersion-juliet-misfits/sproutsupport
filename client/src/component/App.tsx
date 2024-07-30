import React from "react";
import { Routes, Route } from "react-router-dom";
import OwnedPlants from "./PlantCare/OwnedPlants";

const App = () => {
    return (
        <div>
            Sprout Support
        <Routes>
            {/* <Route path="/" element={<Login />}> */}
            {/* <Route path="/home" element={<Homepage />}> */}
            <Route path="/myplants" element={<OwnedPlants />}></Route>
        </Routes>
        </div>
    )
}

export default App;
