const bestSellersBookshelf = document.querySelector("#best-sellers-bookshelf");
const novelsBookshelf = document.querySelector("#novels-bookshelf");
const sciFiBookshelf = document.querySelector("#sci-fi-bookshelf");
const searchResults = document.querySelector("#search-results");
const bestSellersBookContainer = document.querySelector("#best-sellers-book-container");
const novelBookContainer = document.querySelector("#novel-book-container");
const sciFiBookContainer = document.querySelector("#sci-fi-book-container");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const searchResultsContainer = document.querySelector("#search-results-container");
const typeSelection = document.querySelector("#type-selection");
const orderSelection = document.querySelector("#order-selection");

const apiKey = "AIzaSyDuUyytYz0OAoxTiqQefzhgYdG1K5v9Q3k";

const getBooksInfo = (id) => {
    fetch(`https://www.googleapis.com/books/v1/users/110316076195152108075/bookshelves/${id}/volumes?key=${apiKey}`)
    .then(res =>  res.json())
    .then(data => {
      if (id == 1001) {
        createHTML(data.items, bestSellersBookContainer);
      }
      else if (id == 1002) {
        createHTML(data.items, novelBookContainer);
      }
      else if (id == 1003) {
        createHTML(data.items, sciFiBookContainer);
      }
    })
  }
  
getBooksInfo(1001);
getBooksInfo(1002);
getBooksInfo(1003);

const createHTML = (books, container) => {
    const bookCard = books.reduce((acc, curr) => {
        if (curr.volumeInfo.title.length >= 30) {
          shortTitle = curr.volumeInfo.title.slice(0, 30);
          curr.volumeInfo.title = shortTitle.concat("...");
        }

        return acc + `
        <figure class="book-card">
            <div class="book-image-container">
                <img src="${curr.volumeInfo.imageLinks.thumbnail}" class="book-image">
            </div>
            <figcaption class="book-info">
                <h4 class="book-name">${curr.volumeInfo.title}</h4>
                <span class="book-more-details">More details</span>
            </figcaption>
        </figure>
        `
    }, "");

    container.innerHTML = bookCard;
}

searchForm.onsubmit = (e) => {
  e.preventDefault();

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&langRestrict=en&maxResults=12&key=${apiKey}`)
  .then(res =>  res.json())
  .then(data => {
    console.log(data);
    searchResults.classList.remove("hidden-bookshelf");
    searchResults.classList.add("bookshelf");
    bestSellersBookshelf.classList.add("hidden-bookshelf");
    novelsBookshelf.classList.add("hidden-bookshelf");
    sciFiBookshelf.classList.add("hidden-bookshelf");
    applyTypeFilters();
  })
}

const applyTypeFilters = () => {
  if (typeSelection.value === "paid-ebooks") {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&filter=paid-ebooks&langRestrict=en&printType=books&maxResults=12&key=${apiKey}`)
    .then(res =>  res.json())
    .then(data => {
      createHTML(data.items, searchResultsContainer);
    })
  }
  else if (typeSelection.value === "free-ebooks") {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&filter=free-ebooks&langRestrict=en&printType=books&maxResults=12&key=${apiKey}`)
    .then(res =>  res.json())
    .then(data => {
      createHTML(data.items, searchResultsContainer);
    })
  }
  else if (typeSelection.value === "all-ebooks") {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&filter=ebooks&langRestrict=en&printType=books&maxResults=12&key=${apiKey}`)
    .then(res =>  res.json())
    .then(data => {
      createHTML(data.items, searchResultsContainer);
    })
  }
}