import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back by one step in the history
  };

  return (
    <button
      className="duration-300 bg-white text-purple-500 to-pink-500 px-6 py-3 font-bold rounded-md hover:scale-110 transition ease-in-out text-3xl"
      onClick={goBack}
    >
      Back
    </button>
  );
};

export default BackButton;