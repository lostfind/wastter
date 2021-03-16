import { dbService } from "fbase";
import { useState } from "react";

const Wastes = ({ wastesObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newWastes, setNewWastes] = useState(wastesObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete?");
    if (ok) {
      await dbService.doc(`wastes/${wastesObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(wastesObj, newWastes);
    await dbService.doc(`wastes/${wastesObj.id}`).update({ text: newWastes });
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
