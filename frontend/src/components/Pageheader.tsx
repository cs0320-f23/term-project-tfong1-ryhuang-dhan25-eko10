import BackButton from "./BackButton";
import SearchBar from "./SearchBar";
import Bookmark from "./BookmarkButton";

const PageHeader = () => {
  return (
    <div className="container" aria-label="page-header">
      <BackButton />
      <SearchBar />
      <Bookmark />
    </div>
  );
};

export default PageHeader;
