import React from "react";

interface PaperItemProps {
  item: {
    title: string;
    author: string;
    date: string;
    doi: string;
  };
}

const PaperItem: React.FC<PaperItemProps> = ({ item }) => {
  return (
    <div>
      <div className="title">{item.title}</div>
      <div className="author">{item.author}</div>
      <div className="date">{item.date}</div>
      <div className="doi">{item.doi}</div>
    </div>
  );
};

export default PaperItem;
