import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import PageHeader from "../components/Pageheader";
import PaperItem from "../components/PaperItem";
import { db } from "../firebase";
import { get, ref } from "firebase/database";
import mockedResult from "../assets/mockedResults.json";
import item from "../components/PaperItem";
import RemoveBookmark from "../components/RemoveBookmark";

interface PaperItem {
  abstract: string;
  author: string[];
  date: number[];
  doi: string;
  title: string;
}

interface DataItem {
  paperItem: PaperItem;
  uuid: string;
}
function Bookmark() {
  const navigate = useNavigate();
  // const [bookmarkID, setBookmarkID] = useState<string[]>([]);
 const [data, setData] = useState<DataItem[]>([]);
 
const removeDataItem = (index: number) => {
  setData((prevData) => prevData.filter((item, i) => i !== index));
};

  useEffect(() => {
    const databaseRef = ref(db);
    get(databaseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          console.log("Fetched data:", fetchedData);
        const paperItemsArray = Object.keys(fetchedData).map(
          (key) => fetchedData[key]
        );
        //  const bookmarkIDArray = Object.keys(fetchedData).map(
        //    (key) => fetchedData[key]
        //  );
          // setData(bookmarkIDArray);
         console.log(" data:", paperItemsArray);
          setData(paperItemsArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error getting data", error);
      });
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div key={data.length}>
      <div style={{ marginTop: "30px" }}></div>
      <PageHeader />

      <div style={{ marginTop: "30px" }}></div>
      <h1>Bookmarks</h1>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {data.map((item, index) => (
          <Grid item xs={3} key={index}>
            <div
              onClick={() =>
                navigate("/research_display", {
                  state: { item: item.paperItem },
                })
              }
              // to={{
              //   pathname: "/research_display",
              //   state: { },
              // }}
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <PaperItem item={item.paperItem} />
              </div>
            </div>
            <RemoveBookmark
              bookmarkId={item.uuid}
              index={index}
              removeDataItem={removeDataItem}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Bookmark;
