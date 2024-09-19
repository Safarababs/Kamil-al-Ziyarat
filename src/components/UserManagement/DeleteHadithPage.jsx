import React from "react";
import DeleteHadithForm from "../Delete Hadith Form/DeleteHadithForm";

const DeleteHadithPage = () => {
  const handleDelete = (id) => {
    console.log(`Hadith with ID ${id} deleted`); // You can replace this with your logic
  };

  return (
    <div className="delete-hadith-container">
      <DeleteHadithForm
        onClose={() => console.log("Form closed")}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DeleteHadithPage;
