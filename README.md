# Paper Pilot
### term-project-tfong1-ryhuang-dhan25-eko10
### Hours Spent: >20hrs

### Contribution
tfong1: Front end design grid layout, front end recommended page, search box, React Routing, testing, crossref API.

dhan25: Backend integration, front end features, backend database, CSV parsing->pickle file, front-end testing.

eko10: Backend integration, front end recommended page, bookmarking functionality, adding and querying database functionality, google firebase.

ryhuang: Backend, DoctoVec, kd_tree algorithmic complexity, vector_search, React Routing. 


Repo Link: https://github.com/cs0320-f23/term-project-tfong1-ryhuang-dhan25-eko10.git

## Features
Paper Pilot is a webapp where users can upload a DOI link of their choice, and the application will recommend papers similar to that DOI link. It utilizes React Routing to navigate to the different pages, google's firebase to store the user's bookmarked papers, a DocToVec model that converts each paper into a vector, a kd-tree algorithm that finds organizes relevant papers based on how close they are to each other in the higher k-dimensional space. In addition, the model was trained on a 800,000 pickle file of research papers, with additional features such as caching so that the user doesn't have to wait long for the search results to appear.

## To run:
cd backend/
run the vector_search.py flask application.
cd ..
cd frontend/
npm run dev


## Design Decisions
The initial design layout was done in the figma below:
https://www.figma.com/file/CS2UO05JW2bVgarHbbQB9v/Paper-Rec-Figma?type=design&node-id=0-1&mode=design
In order to navigate between the different pages, a pages/ directory was created to contain the different pages the user would navigate to. Other design decisions included using Google's firebase for storing the bookmarks, as well as utilizing Doc2Vec to convert each paper into a unique vector that can be easily analyzed for similarity. In addition, the cross ref open-source API (https://api.crossref.org/swagger-ui/index.html) was used to convert each paper into a json that can be parsed into the abstract, title, and authors which the backend can analyze.

## Bugs 
Since the database is shared among all users, adding a bookmark on one computer will add to the bookmarks in the database, which another user will be able to see. 

## Tests
    - test that DOIs load correctly. 
    - test recommended data shows after uploading the DOI link. 
    - test that the backend correctly outputs a json of k-items.
    - test frontend for a valid DOI upload and valid search results showing up. 
    - test for enter or submit button functionality. 
    - test back button functionality. 
