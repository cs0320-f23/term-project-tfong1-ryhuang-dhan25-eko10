import React from "react";

interface PaperItemProps {
  item: {
    title: string;
    author: string[];
    date: string[];
    doi: string;
  };
}

const PaperItem: React.FC<PaperItemProps> = ({ item }) => {
  return (
    <div aria-label='paper-item'>
      <div className="title" aria-label={item.title}>{item.title}</div>
      {/* <div className="author">{"Authors : " + item.author}</div> */}
      <div className="date">{"Date : " + item.date}</div>
      <div className="doi">{"DOI : " + item.doi}</div>
    </div>
  );
};

export default PaperItem;
