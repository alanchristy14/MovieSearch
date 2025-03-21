const movies = [
    { name: "Iron Man", genre: "Action", year: 2008, actor: "Robert Downey Jr.", image: "C:/Users/ELCOT/Desktop/loop/1.jpg" },
    { name: "Frozen", genre: "Animation", year: 2013, actor: "Idina Menzel", image: "C:/Users/ELCOT/Desktop/loop/2.jpg" },
    { name: "Joker", genre: "Drama", year: 2019, actor: "Joaquin Phoenix", image: "C:/Users/ELCOT/Desktop/loop/3.jpg" },
    { name: "The Conjuring", genre: "Horror", year: 2013, actor: "Patrick Wilson", image: "C:/Users/ELCOT/Desktop/loop/4.jpg" },
  ];
  
  const movieList = document.getElementById("movieList");
  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");
  const yearFilter = document.getElementById("yearFilter");
  
  // Debounce function to optimize API calls
  function debounce(func, delay) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
  }
  
  // Display movies with smooth animations
  function displayMovies(filteredMovies) {
    movieList.innerHTML = "";
  
    if (filteredMovies.length === 0) {
      movieList.innerHTML = "<p>No movies found</p>";
      return;
    }
  
    filteredMovies.forEach(movie => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");
  
      movieCard.innerHTML = `
        <img src="${movie.image}" alt="${movie.name}" />
        <h3>${movie.name}</h3>
        <p>Genre: ${movie.genre}</p>
        <p>Year: ${movie.year}</p>
        <p>Actor: ${movie.actor}</p>
      `;
      movieList.appendChild(movieCard);
    });
  }
  
  // Filter movies based on search and filters
  function filterMovies() {
    const searchText = searchInput.value.toLowerCase();
    const genre = genreFilter.value;
    const year = parseInt(yearFilter.value);
  
    const filteredMovies = movies.filter(movie => {
      const matchName = movie.name.toLowerCase().includes(searchText) || movie.actor.toLowerCase().includes(searchText);
      const matchGenre = genre ? movie.genre === genre : true;
      const matchYear = year ? movie.year === year : true;
      return matchName && matchGenre && matchYear;
    });
  
    displayMovies(filteredMovies);
  }
  
  // Initial load
  setTimeout(() => displayMovies(movies), 1000); // Simulate API loading
  
  // Add event listeners with debounce
  searchInput.addEventListener("input", debounce(filterMovies, 300));
  genreFilter.addEventListener("change", filterMovies);
  yearFilter.addEventListener("input", debounce(filterMovies, 300));