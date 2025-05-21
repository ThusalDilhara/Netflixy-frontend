document.addEventListener('DOMContentLoaded', function() {
  // Retrieve user name from local storage
  const userName = localStorage.getItem('userName');
  
  // Display user name on the home page
  if (userName) {
      document.getElementById('username').textContent = userName;
  } else {
      alert("error");
  }
});


//Get movie list according to user interest
document.addEventListener('DOMContentLoaded', function() {
  const userInterest = localStorage.getItem('userInterest');
  //alert(userInterest);
  if (userInterest) {
      fetch(`http://localhost:8080/api/movies/getdetails/${userInterest}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Failed to get member interest');
          }
      })
      .then(movie => {
          const movieList=movie;
          var imgElement = document.getElementsByClassName('film');
          var forYouFilmsName=document.getElementsByClassName('forYouFilms');
          for(let i = 0; i < imgElement.length; i++){
            imgElement[i].src = movieList[i].imgUrl;
            forYouFilmsName[i].innerText =movieList[i].name;
            imgElement[i+6].src = movieList[i].imgUrl;
            forYouFilmsName[i+6].innerText =movieList[i].name;
          }
      })
  } else {
     alert("No user data available");
  }
});

//Set pupular movies random
document.addEventListener('DOMContentLoaded', function() {
    const userInterest = localStorage.getItem('userInterest');
    //alert(userInterest);
    if (userInterest) {
        fetch(`http://localhost:8080/api/movies/getAllFilms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to get All Films');
            }
        })
        .then(allMovies => {
            const allMovieList=allMovies;
            var popularFilmsImg = document.getElementsByClassName('popularFilm');
            var popularFilmsName=document.getElementsByClassName('popularYouFilms');
            const randomNumbers = [];
            for (let i = 0; i < 12; i++) {
                const randomNumber = Math.floor(Math.random() * (allMovieList.length- 0 + 1)) + 0;
                randomNumbers.push(randomNumber);
            }
            //alert(randomNumbers);
            for(let i = 0; i < allMovieList.length; i++){
              popularFilmsImg[i].src = allMovieList[randomNumbers[i]].imgUrl;
              popularFilmsName[i].innerText =allMovieList[randomNumbers[i]].name;

            }
        })
    } else {
       alert("No user data available");
    }
  });

  //search film
  function search(name){
    var imageURL;
    var filmName;
    if (name) {
        fetch(`http://localhost:8080/api/movies/searchFilm/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to get member interest');
            }
        })
        .then(movie => {
            const searchMovie=movie;
            filmName=searchMovie.name;
            imageURL=searchMovie.imgUrl;
            document.getElementById('searchFilmname').innerText=filmName;
            document.getElementById('searchFilm').src = imageURL;
            document.getElementById('search').style.display = 'block';
            document.getElementById('overlay').style.display = 'block'; 
        })
    } else {
       alert("No This Film available in Database, Try Again..!");
    }
    

}
