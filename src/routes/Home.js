import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [waste, setWaste] = useState("");
  const [wastes, setWastes] = useState([]);
  useEffect(() => {
    dbService.collection("wastes").onSnapshot((snapshot) => {
      const wasteArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWastes(wasteArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("wastes").add({
      text: waste,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
            <h4>{waste.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
