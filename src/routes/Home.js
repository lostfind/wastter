import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [waste, setWaste] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("wastes").add({
      waste,
      createAt: Date.now(),
    });
    setWaste("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setWaste(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={waste}
        onChange={onChange}
        type="text"
        placeholder="Input your waste"
        maxlength={120}
      />
      <input type="submit" value="Wastteed" />
    </form>
  );
};
export default Home;
