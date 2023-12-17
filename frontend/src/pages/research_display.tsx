import PageHeader from "../components/Pageheader";
import { useLocation } from "react-router-dom";
import '../assets/paper.css';
const research_display = () => {
  const location = useLocation();
  const items = location.state?.item || [];
  let authors:string = items.author.join(', ');
  let date: string = items.date.join('/');
  return (
    <div>
      <div style={{ marginTop: "20px" }}></div>
      <PageHeader />
      <div className="paper-display">
        <h1>{items.title}</h1>
        <h2>{authors}</h2>
        <h3>{date}</h3>
      </div>
      
      <a href={'http://dx.doi.org/'+items.doi}>{items.doi}</a>

      <div className="abstract">{items.abstract}</div>
    </div>
  );
};

export default research_display;
