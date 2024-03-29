import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useState } from "react";

const Wastes = ({ wastesObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newWastes, setNewWastes] = useState(wastesObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete?");
    if (ok) {
      await deleteDoc(doc(dbService, `wastes/${wastesObj.id}`));
      await deleteObject(ref(storageService, wastesObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(wastesObj, newWastes);
    await updateDoc(doc(dbService, `wastes/${wastesObj.id}`), {
      text: newWastes,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    setNewWastes(event.target.value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your wastes"
              value={newWastes}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Wates" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{wastesObj.text}</h4>
          {wastesObj.attachmentUrl && (
            <img
              src={wastesObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete wastes</button>
              <button onClick={toggleEditing}>Edit wastes</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Wastes;
