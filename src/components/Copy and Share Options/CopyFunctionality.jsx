// src/components/CopyButton.js

import React from "react";

const CopyButton = ({ text }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  return <button onClick={() => copyToClipboard(text)}>Copy</button>;
};

export default CopyButton;
