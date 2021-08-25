let rand = Math.floor(Math.random() * 20);
console.log(rand)

// http://image.tmdb.org/t/p/w1280/
// ,"backdrop_sizes":["w300","w780","w1280","original"]
let path = "http://image.tmdb.org/t/p/w1280";
let path1 = "http://image.tmdb.org/t/p/w780";
// https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US


axios({
    method: 'get',
    // url: 'https://api.themoviedb.org/3/movie/latest?api_key=91609f28d0b59402f583b8e9c2172647&language=en-US',
    // url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=91609f28d0b59402f583b8e9c2172647&language=en-US&page=1',
    url: 'https://api.themoviedb.org/3/movie/popular?api_key=91609f28d0b59402f583b8e9c2172647&language=en-US&page=1',
    // url: 'https://api.themoviedb.org/3/movie/550?api_key=91609f28d0b59402f583b8e9c2172647',
})
    .then(function (response) {
        console.log(response.data)
        let movie = response.data.results[rand];
        console.log(movie)
        console.log(path+movie.backdrop_path)
        $(".main").css('background-image', 'url(' + path+movie.backdrop_path + ')');

        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=91609f28d0b59402f583b8e9c2172647&language=en-US&page=1',
        })
            .then(function (response) {
                let result = selectTen(response.data.results);
                console.log(result)
                result.forEach((element,i) => {
                    $("#c"+i).css('background-image', 'url(' + path1+element.poster_path + ')');
                    // console.log(element)
                    
                    let a = document.createElement("a");
                    a.setAttribute('href',"/movie/id/"+element.id);
                    a.setAttribute('target',"_blank");
                    let btn =document.createElement("button");
                    btn.className = "button_str";
                    a.append(btn)

                    let bSpan = document.createElement("span");
                    bSpan.className="span-back"
                    let span = document.createElement("span");
                    span.className="span-back"
                    span.className="fa fa-star checked rate"
                    span.innerText=span.innerText+" "+element.vote_average+"/10"
                    bSpan.append(span)
                    $("#c"+i).append(a);
                    $("#c"+i).append(bSpan);
                    
                });
                let card = document.getElementById('latest-cards');
                console.log(card);
                let str1 = '<div class="flip-card ms-3"> <div class="flip-card-inner"> <div class="flip-card-front" style=" background-image: url('
                let str2 = ')"></div> <div class="flip-card-back"> <h1 id="movie_title">';
                let str3 = '</h1> <h5>';
                let str4 = '</h5> <h5>';
                let str5 = '</h5> <button type="button" onclick="location.href=\'/./movie.html?id=';
                let str6 = '\'" class="btn btn-outline-dark" id="btn-bottom">go to movie</button> </div> </div> </div>';
                axios({
                    method: 'get',
                    url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=91609f28d0b59402f583b8e9c2172647&language=en-US&page=1',
                })
                    .then(function (response) {
                        let arr = response.data.results;
                        // console.log(response.data.results);
                        console.log(card.innerHTML)
                        arr.forEach((ele)=>{
                            let rate= ele.release_date.substring(0,4);
            
                            // console.log(rate)
                            card.innerHTML=card.innerHTML+str1+path1+ele.poster_path+str2+ele.title+str3+ele.vote_average+str4+rate+str5+ele.id+str6;
                        })
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err) => {
                console.log(err)
            });
    }).catch((err) => {
        console.log(err)
    });


    // this method just to randomly select 10 from 20 movies
    function selectTen(data){
        let result = [];
        let n=20;
        for (let index = 0; 0 < 10; index++) {
            if(n <= 10 )break;
            let rand = Math.floor(Math.random() * n);
            result.push(data[rand]);
            data.splice(rand, 1);
            n--;
        }
        return result;
    }