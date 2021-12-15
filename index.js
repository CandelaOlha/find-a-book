const bestSellersBookContainer = document.querySelector("#best-sellers-book-container");
const novelBookContainer = document.querySelector("#novel-book-container");
const sciFiBookContainer = document.querySelector("#sci-fi-book-container");

const getBooksInfo = (id) => {
    fetch(`https://www.googleapis.com/books/v1/users/110316076195152108075/bookshelves/${id}/volumes?key=AIzaSyDuUyytYz0OAoxTiqQefzhgYdG1K5v9Q3k`)
    .then(res =>  res.json())
    .then(data => {
      console.log(data);
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
        return acc + `
        <figure class="book-card">
            <div class="book-image-container">
                <img src="${curr.volumeInfo.imageLinks.thumbnail}" class="book-image">
            </div>
            <figcaption class="book-info">
                <h4 class="book-name">${curr.volumeInfo.title}</h4>
                <a href="" class="book-link">More details</a>
            </figcaption>
        </figure>
        `
    }, "");

    container.innerHTML = bookCard;
}