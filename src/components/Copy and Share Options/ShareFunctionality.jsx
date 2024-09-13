// src/components/ShareButton.js

import React from "react";

const ShareButton = ({ text }) => {
  const shareContent = (text) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Kamil al-Ziyarat",
          text: text,
          url: window.location.href,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      alert("Sharing not supported");
    }
  };

  return <button onClick={() => shareContent(text)}>Share</button>;
};

export default ShareButton;
