import { Link } from "react-router-dom";

const BookmarkButton = () => {
  return (
    <>
      <button aria-label="bookmarks" className="duration-300 bg-white text-purple-500 to-pink-500 px-6 py-3 font-bold rounded-md hover:scale-110 transition ease-in-out text-3xl">
        <Link to="/bookmark">Bookmarks</Link>
      </button>
    </>
  );
};

export default BookmarkButton;
