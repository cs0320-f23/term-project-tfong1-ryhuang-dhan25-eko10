import BackButton from "./BackButton";
import SearchBar from "./SearchBar";
import Bookmark from "./BookmarkButton";

const PageHeader = () => {
  return (
    <div className="container">
      <BackButton />
      <SearchBar />
      <Bookmark />
    </div>
  );
};

export default PageHeader;
