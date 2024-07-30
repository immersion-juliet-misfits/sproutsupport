import React, {useState, useEffect} from "react";

const PlantFinder = () => {
    const [input, setInput] = useState('')

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.value)
      setInput(e.currentTarget.value)
    }

    return (
        <div>
            <h1>Plant Finder</h1>
            <h3>{`Searched: ${input}`}</h3>
            {/* will eventually be used with cards... */}
            <input type="text" placeholder="Plant name" onChange={(e) => handleInput(e)}></input>
            <input type="button" value="Search"></input>
        </div>
    )
}

export default PlantFinder;
