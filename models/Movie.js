// used to get movies in theaters
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjM5Yjk2NTVjNGE3ZGEzMzQ3NjY2OGU4YWNkMTEzMiIsInN1YiI6IjY0OWNlNzlmMDkxZTYyMDBjYWRmYjZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8uAnm-resVWAld0Y609cbLVPTtQpCbndOYs9nmZbDE8'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));