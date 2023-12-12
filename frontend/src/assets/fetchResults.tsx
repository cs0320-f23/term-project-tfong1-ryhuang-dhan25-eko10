//UNFINISHED
//example:http://127.0.0.1:5000/knn?query=western%20blot&k=20
export async function getPaper(query: string) {
    return fetch("http://127.0.0.1:5000/knn?query="+query+"&k=40")
    .then(response => response.json())
    .then(json => {
        const type = json.type;
        if(type == "success") {
            const result: string[] = json.result;
        }
        else {
            console.log(json.type);
        }
    })
    .catch(e => {console.log(["Server error"])});
} 