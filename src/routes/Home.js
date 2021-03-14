import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [waste, setWaste] = useState("");
  const [wastes, setWastes] = useState([]);
  const getWastes = async () => {
    const dbWastes = await dbService.collection("wastes").get();
    dbWastes.forEach((document) => {
      const wasteObject = {
        ...document.data(),
        id: document.id,
      };
      setWastes((prev) => [wasteObject, ...prev]);
    });
  };
  useEffect(() => {
    getWastes();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("wastes").add({
      waste,
      createAt: Date.now(),
    });
    setWaste("");
  };
  const onChange = (event) => {
    setWaste(event.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={waste}
          onChange={onChange}
          type="text"
          placeholder="Input your waste"
          maxLength={120}
        />
        <input type="submit" value="Wastteed" />
      </form>
      <div>
        {wastes.map((waste) => (
          <div key={waste.id}>
            <h4>{waste.waste}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
