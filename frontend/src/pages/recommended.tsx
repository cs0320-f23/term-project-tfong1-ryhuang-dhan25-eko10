import React from "react";
import { Link } from "react-router-dom";
import PaperItem from "../components/PaperItem";
import { Grid } from "@mui/material";
import PageHeader from "../components/Pageheader.tsx";
import { useLocation } from "react-router-dom";


function recommended() {
  const location = useLocation();
  const recommendedResults = location.state?.recommendedResults || [];
  return (
    <div>
      <div style={{ marginTop: "30px" }}></div>
      <PageHeader />

      <div style={{ marginTop: "30px" }}></div>
      <h1>Recommended Papers</h1>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {recommendedResults.map(
          (
            item: { title: string; author: string; date: string; doi: string },
            index: React.Key | null | undefined
          ) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link
                to={{
                  pathname: "/research_display",
                  state: { some: item },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="card">
                  <PaperItem item={item} />
                </div>
              </Link>
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
}

export default recommended;
