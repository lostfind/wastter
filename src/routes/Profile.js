import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyWateses = async () => {
    const wasteses = await dbService
      .collection("wastes")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
  };

  useEffect(() => {
    getMyWateses();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display name"
        />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};

export default Profile;
