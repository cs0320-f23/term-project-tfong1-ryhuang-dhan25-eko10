import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import PageHeader from "../components/Pageheader";
import PaperItem from "../components/PaperItem";
import { db } from "../firebase";
import { get, ref } from "firebase/database";
import mockedResult from "../assets/mockedResults.json";
import item from "../components/PaperItem";

function Bookmark() {
  const navigate = useNavigate();

  const [data, setData] = useState<
    {
      item: {
        title: string;
        author: string[];
        date: string[];
        doi: string;
      };
    }[]
  >([]);


  useEffect(() => {
    const databaseRef = ref(db);
    get(databaseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          console.log("Fetched data:", fetchedData);
        const paperItemsArray = Object.keys(fetchedData).map(
          (key) => fetchedData[key].paperItem
        );
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
    <div>
      <div style={{ marginTop: "30px" }}></div>
      <PageHeader />

      <div style={{ marginTop: "30px" }}></div>
      <h1>Bookmarks</h1>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {data.map((item, index) => (
          <Grid item xs={3} key={index}>
            <div
                onClick={() =>
                  navigate("/research_display", { state: { item } })
                }
                // to={{
                //   pathname: "/research_display",
                //   state: { },
                // }}
                style={{ textDecoration: "none" }}
              >
              <div className="card">
                <PaperItem item={item} />
              </div>
              </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Bookmark;
