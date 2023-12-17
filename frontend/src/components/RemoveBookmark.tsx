// import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/database';

// interface RemoveBookmarkProps {
//     bookmarkId: string;
// }

// const RemoveBookmark: React.FC<RemoveBookmarkProps> = ({ bookmarkId }) => {
//     const handleRemoveBookmark = () => {
//         // Remove the bookmark from the Firebase Realtime Database
//         firebase.database().ref(`bookmarks/${bookmarkId}`).remove();
//     };

//     return (
//         <button onClick={handleRemoveBookmark}>Remove Bookmark</button>
//     );
// };

// export default RemoveBookmark;
