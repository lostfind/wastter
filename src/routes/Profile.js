import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { query, where, orderBy, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyWateses = async () => {
    return await query(
      collection(dbService, "wastes"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    );
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
