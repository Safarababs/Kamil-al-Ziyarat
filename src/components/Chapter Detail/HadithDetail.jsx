import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const HadithDetail = () => {
  const { chapterNumber, hadithNumber } = useParams();
  const [hadith, setHadith] = useState(null);

  useEffect(() => {
    const fetchHadith = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/get-hadith/${chapterNumber}/${hadithNumber}`
        );
        if (response.ok) {
          const data = await response.json();
          setHadith(data);
        } else {
          console.error("Failed to fetch hadith");
        }
      } catch (error) {
        console.error("Error fetching hadith:", error);
      }
    };

    fetchHadith();
  }, [chapterNumber, hadithNumber]);

  return (
    <div>
      {hadith ? (
        <div>
          <h3>Hadith Details</h3>
          <p>
            <strong>Hadith Number:</strong> {hadith.hadithNumber}
          </p>
          <p>
            <strong>Raavi:</strong> {hadith.raavi}
          </p>
          <p>
            <strong>Black Text One:</strong> {hadith.blackTextOne}
          </p>
          <p>
            <strong>Arabic Text:</strong> {hadith.arabicText}
          </p>
          <p>
            <strong>Black Text Two:</strong> {hadith.blackTextTwo}
          </p>
          <p>
            <strong>English Text:</strong> {hadith.englishText}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HadithDetail;
