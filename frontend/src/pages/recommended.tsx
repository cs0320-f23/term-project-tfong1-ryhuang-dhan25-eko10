import { Link } from "react-router-dom";
import mockedResult from "../assets/mockedResults.json";
import PaperItem from "../components/PaperItem.tsx";
import { Grid } from "@mui/material";
import PageHeader from "../components/Pageheader.tsx";
function recommended() {
  // const divs = [];

  // for (let i = 0; i < 15; i++) {
  //   divs.push(
  //     <div key={i} style={{border: '1px solid black', padding: '10px'}}>
  //       Author: {i + 1}
  //       <button id="title"><Link to = "/research_display">Title!</Link></button>
  //       <button id="bookmark">Bookmark!</button>
  //     </div>
  //   );
  // }

  // return (
  //   <div id="mainContent" className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(200px, auto)'}}>
  //     {divs}

  //   </div>
  // );

  //going to make container a class with all of them
  return (
    <div>
      <div style={{ marginTop: "30px" }}></div>
      <PageHeader />

      <div style={{ marginTop: "30px" }}></div>
      <h1>Recommended Papers</h1>
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

export default recommended;
