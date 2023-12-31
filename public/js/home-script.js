
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVlMWQ3MjBiZTFmZTU1ZGIyNjljZjNhMjI0ZDA2ZCIsInN1YiI6IjY0OWJhMjkyOTYzODY0MDEzYTMyOGJjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rOay6VCKjklJe8o05Efj_HMuLs7I6uJBoKpA1f0-ipk'
  }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    console.log('API response:', data);
    const results = data.results;
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    for (let i = 0; i < results.length && i < 10; i++) {
      const imageUrl = 'https://image.tmdb.org/t/p/w500' + results[i].poster_path;
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = 'Movie Poster';
      imgElement.classList.add('swiper-slide');

      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      swiperSlide.appendChild(imgElement);
      swiperWrapper.appendChild(swiperSlide);

      // Click event listener for movie poster
      imgElement.addEventListener('click', () => {
        const movieId = results[i].id;
       // const movieRating = results[i].rating;
        // Function to display movie details
        displayMovieDetails(movieId);
        
      });
    }
  })
  .catch(error => {
    console.log('Error:', error); 
  });

 // export{ movieRating, movieId, imageUrl };


// Zip Code Search Button
const searchButton = document.getElementById('search-button');
const zipcodeInput = document.getElementById('zipcode-input');
const recommendationElement = document.getElementById('recommendation');

const searchZipCode = () => {
  const zipcode = zipcodeInput.value.trim();

  if (zipcode !== '') {
    // Stores searched zip code
    localStorage.setItem('searchedZipCode', zipcode);
    console.log('Zip code searched:', zipcode);

    // Update the recommended zip code display
    recommendationElement.textContent = `Zipcode: ${zipcode}`;

    // Clear the zip code from the search bar
    zipcodeInput.value = '';
  }
};

searchButton.addEventListener('click', searchZipCode);

zipcodeInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchZipCode();
  }
});

// Display stored zip code
const storedZipCode = localStorage.getItem('searchedZipCode');
if (storedZipCode) {
  console.log('Stored zip code:', storedZipCode);
  recommendationElement.textContent = `Zipcode: ${storedZipCode}`;
}

// Click event for recommended zip code
recommendationElement.addEventListener('click', () => {
  const recommendedZipCode = recommendationElement.textContent.split(':')[1].trim();
  zipcodeInput.value = recommendedZipCode;
});
