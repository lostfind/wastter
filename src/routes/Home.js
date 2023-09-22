import Wastes from "components/Wastes";
import { dbService } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import WastesFactory from "components/WastesFactory";

const Home = ({ userObj }) => {
  const [wastes, setWastes] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "wastes"), (snapshot) => {
      const wasteArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWastes(wasteArray);
    });
  }, []);

  return (
    <div>
      <WastesFactory userObj={userObj} />
      <div>
        {wastes.map((waste) => (
          <Wastes
            key={waste.id}
            wastesObj={waste}
            isOwner={waste.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
