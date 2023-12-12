

export async function getPaper(query: string) {
    return fetch("http://127.0.0.1:5000/pinecone/"+query)
    .then(response => response.json())
    .then(json => {
        const matches = json.matches;
        if(matches == "success") {
            const result: string[][] = json.result;
            // setDisplay([result]);
        }
        else {
            const error = json.error_type
            // setDisplay(error);
        }
    })
    // .catch(e => {setDisplay(["Server error"])});
} 