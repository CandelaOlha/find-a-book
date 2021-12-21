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
const bookDetailsSection = document.querySelector(".book-details");
const heroSection = document.querySelector(".hero-section");
const searchBar = document.querySelector(".search-bar");
const firstPageButton = document.querySelector("#first-page");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const lastPageButton = document.querySelector("#last-page");

const apiKey = "AIzaSyDuUyytYz0OAoxTiqQefzhgYdG1K5v9Q3k";

let currentPage = 0;

const getMyBookshelves = (id) => {
    fetch(`https://www.googleapis.com/books/v1/users/110316076195152108075/bookshelves/${id}/volumes?key=${apiKey}`)
    .then(res =>  res.json())
    .then(data => {
      if (id == 1001) {
        displayBooksInHTML(data.items, bestSellersBookContainer);
        getBookCardID();
      }
      else if (id == 1002) {
        displayBooksInHTML(data.items, novelBookContainer);
        getBookCardID();
      }
      else if (id == 1003) {
        displayBooksInHTML(data.items, sciFiBookContainer);
        getBookCardID();
      }
    })
  }
  
getMyBookshelves(1001);
getMyBookshelves(1002);
getMyBookshelves(1003);

const displayBooksInHTML = (books, container) => {
    const bookCard = books.reduce((acc, curr) => {
        if (curr.volumeInfo.title.length >= 30) {
          shortTitle = curr.volumeInfo.title.slice(0, 30);
          curr.volumeInfo.title = shortTitle.concat("...");
        }

        return acc + `
        <figure class="book-card" data-id=${curr.id}>
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

const getBooksInfo = () => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&filter=${typeSelection.value}&langRestrict=en&printType=books&orderBy=${orderSelection.value}&startIndex=${currentPage}&maxResults=12&key=${apiKey}`)
  .then(res =>  res.json())
  .then(data => {
    console.log(data)
    searchResults.classList.remove("hidden-bookshelf");
    searchResults.classList.add("bookshelf");
    bestSellersBookshelf.classList.add("hidden-bookshelf");
    novelsBookshelf.classList.add("hidden-bookshelf");
    sciFiBookshelf.classList.add("hidden-bookshelf");
    displayBooksInHTML(data.items, searchResultsContainer);
    getBookCardID();
    createPagination();
  })
}

searchForm.onsubmit = (e) => {
  e.preventDefault();

  getBooksInfo();
}

const getBookDetails = (id) => {
  fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    displayBookDetailsInHTML(data);
  })
}

const getBookCardID = () => {
  const bookCards = document.querySelectorAll(".book-card");
  for (let i = 0; i < bookCards.length; i++) {
    bookCards[i].onclick = () => {
      bookCardID = bookCards[i].dataset.id;
      console.log(bookCardID);
      getBookDetails(bookCardID);
    }
  }
}

const getBookImage = (book) => {
  if (book.volumeInfo.imageLinks.small) {
    return `<img src="${book.volumeInfo.imageLinks.small}" class="book-image">`;
  }
  else {
    return `<img src="images/empty-image.svg" class="book-image">`;
  }
}

const getBookCategory = (book) => {
  if (Array.isArray(book.volumeInfo.categories)) { // Esto es para que devuelva solo la primera categoría, porque en algunos casos el array es demasiado largo.
    return book.volumeInfo.categories[0];
  }
  else {
    return book.volumeInfo.categories;
  }
}

const getAverageRating = (book) => {
  if (book.volumeInfo.averageRating == 1) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    </div>`
  }
  else if (book.volumeInfo.averageRating == 1.5) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="fas fa-star-half-alt"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    </div>`
  }
  else if (book.volumeInfo.averageRating == 2) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    </div>`
  }
  else if (book.volumeInfo.averageRating == 2.5) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star-half-alt"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    </div>`
  }
  else if (book.volumeInfo.averageRating == 3) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    </div>`
  }
  else if (book.volumeInfo.averageRating == 3.5) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star-half-alt"></i>
    <i class="far fa-star"></i>
    </div>`
  }
  else if (book.volumeInfo.averageRating == 4) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="far fa-star"></i>
    </div>`
  }
  else if (book.volumeInfo.averageRating == 4.5) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star-half-alt"></i>
    </div>`
  }
  else if (book.volumeInfo.averageRating == 5) {
    return `<div class="rating-number">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    </div>`
  }
}

const displayBookDetailsInHTML = (book) => {
  const bookDetails = `
    <div class="book-text-container">
      <h2 class="book-name">${book.volumeInfo.title}</h2>
      <p class="author-name">Written by <span>${book.volumeInfo.authors}</span</p>
      <div class="book-description">${book.volumeInfo.description}</div>
      <p class="book-category">Category: <span>${getBookCategory(book)}</span></p>
      <div class="book-rating">${getAverageRating(book)} <p class="opinions">Based on ${book.volumeInfo.ratingsCount} opinions</p></div>
      <a href="${book.saleInfo.buyLink}" class="buy-link" target="_blank">Buy on Google Play</a>
    </div>
    <div class="book-image-container">
      ${getBookImage(book)}
    </div>
    `

  bookDetailsSection.innerHTML = bookDetails;

  bookDetailsSection.style.display = "flex";
  heroSection.style.display = "none";
  searchBar.style.display = "none";
  bestSellersBookshelf.classList.add("hidden-bookshelf");
  novelsBookshelf.classList.add("hidden-bookshelf");
  sciFiBookshelf.classList.add("hidden-bookshelf");
  searchResults.classList.add("hidden-bookshelf");
  
  const bookDescription = document.querySelector(".book-description");
  const bookCategory = document.querySelector(".book-category");
  const bookRating = document.querySelector(".book-rating");
  const buyLink = document.querySelector(".buy-link");

  if (book.volumeInfo.description === undefined) {
    bookDescription.textContent = "No information about this book has been added yet."
  }

  if (book.volumeInfo.categories === undefined) {
    bookCategory.style.display = "none";
  }

  if (book.volumeInfo.averageRating === undefined) {
    bookRating.style.display = "none";
  }

  if (book.saleInfo.saleability === "NOT_FOR_SALE") {
    buyLink.style.display = "none";
  }
}

const createPagination = () => {
  firstPageButton.onclick = () => {
    currentPage = 0;
  
    firstPageButton.disabled = true;
    prevButton.disabled = true;
  
    getBooksInfo();
  }
  
  prevButton.onclick = () => {
    currentPage--;
  
    if (currentPage === 0) {
      firstPageButton.disabled = true;
      prevButton.disabled = true;
    }
  
    getBooksInfo();
  }
  
  nextButton.onclick = () => {
    currentPage++;
  
    firstPageButton.disabled = false;
    prevButton.disabled = false;
  
    // if (currentPage == lastPage) {
    //   lastPageButton.disabled = true;
    //   nextButton.disabled = true;
    // }
  
    getBooksInfo();
  }
  
  // lastPageButton.onclick = () => {
  //   currentPage = lastPage;
  
  //   firstPageButton.disabled = false;
  //   prevButton.disabled = false;
  //   lastPageButton.disabled = true;
  //   nextButton.disabled = true;
  // }
}

firstPageButton.disabled = true;
prevButton.disabled = true;

// Falta calcular la última página.