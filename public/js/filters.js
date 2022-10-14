let searchForm = document.getElementById("search-from")
console.log(searchForm)
let movies_section = document.getElementById("movies-section")
console.log(movies_section)

searchForm.addEventListener('submit' , function (e){
    e.preventDefault();
    const payload = new FormData(searchForm);
    const formDataObj = Object.fromEntries(payload.entries());
    console.log(formDataObj)
    axios.post("/movies/all" ,formDataObj)
        .then((data)=>{
            console.log(data.data)
            showData(data.data);
        })
        .catch(err => console.log(err))
    }
)

let showData =  (data)=> {
    if(data.length < 1){
        movies_section.innerHTML = "<h1>No Results Matching</h1>";
    }else {
        let results = `
        <table>
        <thead>
            <th>Title</th>
            <th>Description</th>
            <th>Rate</th>
            <th>Category</th>
            <th>Show</th>
            <th>Edit</th>
            <th>Delete</th>
        </thead>`
        for(let movie of data){
            let result = `
            <tbody>
                <td>${movie.Title}</td>
                <td>${movie.Description}</td>
                <td>${movie.Rate}</td>
                <td>${movie.Category.Title}</td>
                <td><a href="/movies/show/${movie._id}">Show</a></td>
                <td><a href="/movies/edit/${movie._id}">Edit</a></td>
                <td>
                    <form action="/movies/delete/${movie._id}?_method=DELETE" method="POST">
                        <button type="submit">delete</button>
                    </form>
                </td>
            </tbody>
            `
            results += result; 
        }
        movies_section.innerHTML = results;
    }
}