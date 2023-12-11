import { Link } from "react-router-dom"
import mockedResult from "../assets/mockedResults.json";
import PaperItem from "../components/PaperItem.tsx";
import { Grid } from "@mui/material";
import PageHeader from "../components/Pageheader.tsx";

function bookmark() {
  return (
    <div>
      <div style={{ marginTop: "30px" }}></div>
      <PageHeader />

      <div style={{ marginTop: "30px" }}></div>
      <h1>Bookmarks</h1>

      <Grid container rowSpacing={1} columnSpacing={1}>
        {mockedResult.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Link to={`/research_display`} style={{ textDecoration: "none" }}>
              <div className="card">
                <PaperItem item={item} />
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default bookmark;