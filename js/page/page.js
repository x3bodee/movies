let path = "http://image.tmdb.org/t/p/w1280";
let url = window.location.href+"";
let id = url.split('=')[1];
console.log(url)
console.log(id)
axios({
    method: 'get',
    url: 'https://api.themoviedb.org/3/movie/'+id+'?api_key=91609f28d0b59402f583b8e9c2172647&language=en-US',
})
.then((response)=>{
    let movie = response.data;
    console.log(movie)
    $(".main").css('background-image', 'url(' + path+movie.backdrop_path + ')');
})
.catch(err=>{
    console.log()
});