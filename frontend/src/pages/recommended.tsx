import React from "react";
import { useNavigate } from "react-router-dom";
import PaperItem from "../components/PaperItem";
import { Grid } from "@mui/material";
import PageHeader from "../components/Pageheader.tsx";
import { useLocation } from "react-router-dom";
import AddBookmark from "../components/AddBookmark.tsx";


function recommended() {
  const navigate = useNavigate();
  const location = useLocation();
  const recommendedResults = location.state?.recommendedResults || [];
  const title = location.state?.title || '';
   console.log("Recommended Results:", recommendedResults);
  return (
    <div>
      <div style={{ marginTop: "30px" }}></div>
      <PageHeader />

      <div style={{ marginTop: "30px" }}></div>
      <div style={{display:'flex', justifyContent:'center'}}>
        <div className="color-bar info-bar">
          <div>Finding papers similar to:</div>
          <div style={{fontWeight:'bold'}}>{title}</div>
        </div>

      </div>

      <h1>Recommended Papers</h1>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {recommendedResults.map(
          (
            item: {
              title: string;
              author: string[];
              date: string[];
              doi: string;
            },
            index: React.Key | null | undefined
          ) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                <div aria-label={index + "paper"} className="card">
                  <PaperItem item={item}  />
                </div>
              </div>
              <AddBookmark paperItem={item} />
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
}

export default recommended;
