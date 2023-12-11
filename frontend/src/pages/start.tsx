import SearchBar from "../components/SearchBar";
import BookmarkButton from "../components/BookmarkButton";

export default function Start() {
  return (
    <div className="flex-col flex justify-between items-center mt-52 h-screen">
      <div>
        <h1 className="text-8xl font-bold mb-5">Research Recommender</h1>
        <div>
          <SearchBar />
        </div>
        <div style={{ marginBottom: "20px" }}></div>
        <div>
          <BookmarkButton />
        </div>
      </div>
      <div>
        <h4>Made by Eric, David, Ryan, and Tim</h4>
      </div>
    </div>
  );
}
