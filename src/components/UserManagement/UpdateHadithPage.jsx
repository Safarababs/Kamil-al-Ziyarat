import React, { useState } from "react";
import UpdateHadithForm from "../Update Hadith Form/UpdateHadithForm";

const UpdateHadithPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [hadiths, setHadiths] = useState([]);

  const handleUpdate = (updatedHadith) => {
    setHadiths((prev) =>
      prev.map((hadith) =>
        hadith._id === updatedHadith._id ? updatedHadith : hadith
      )
    );
  };

  const handleClose = () => {
    console.log("Form closed");
  };

  return (
    <div>
      <h1>Update Hadith</h1>
      <UpdateHadithForm onUpdate={handleUpdate} onClose={handleClose} />
    </div>
  );
};

export default UpdateHadithPage;
