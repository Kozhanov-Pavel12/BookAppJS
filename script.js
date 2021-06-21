
const listOfBooks = [
    {
        bookTitle: 'The Clean Coder: A Code of Conduct for Professional Programmers',
        author: 'Martin, Robert',
        publicationYear: 2011,
        rating: 9,
        isbn: '978-0137081073',
    },
    {
        bookTitle: '7 Habits Of Highly Effective People',
        author: 'Covey, Stephen R.',
        publicationYear: 2004,
        rating: 9,
        isbn: '978-1863500296',
    },
    {
        bookTitle: 'The Color of Magic',
        author: 'Pratchett, Terry',
        publicationYear: 2013,
        rating: 8,
        isbn: '9780062225672',
    },
    {
        bookTitle: 'Press Reset: Ruin and Recovery in the Video Game Industry',
        author: 'Jason Schreier',
        publicationYear: 2021,
        rating: 7,
        isbn: '',
    },
    {
        bookTitle: 'The Inmates Are Running the Asylum',
        author: 'Cooper, Alan',
        publicationYear: 2004,
        rating: 8,
        isbn: '978-0672326141',
    },
    {
        bookTitle: 'The Three Musketeers',
        author: 'Alexandre Dumas',
        publicationYear: '',
        rating: '',
        isbn: '',
    },
    {
        bookTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        publicationYear: 2008,
        rating: 9,
        isbn: '978-0132350884',
    },
    {
        bookTitle: 'George and the Big Bang',
        author: 'Hawking, Stephen; Hawking, Lucy',
        publicationYear: 2013,
        rating: '',
        isbn: '978-1442440067',
    },
];


(function() {

    const sortedBookList = sortArray(listOfBooks);
    const bestBook = getTheBestBook(listOfBooks);

    const objOfBooks = sortedBookList.reduce(( acc, book ) => { //create an arr for easy work
        acc[ book.bookTitle ] = book;
        return acc;
    }, {});

    //Elements UI
    const listContainer = document.querySelector('.book-list-section .list-group');
    const bestBookListContainer = document.querySelector('.best-book-section .best-book-item');

    //Form elements UI
    const form = document.forms['my-form'];
    const inputTitle = form.elements['bookTitleInput'];
    const inputAuthor = form.elements['bookAuthorInput'];
    const inputYear = form.elements['bookYear'];
    const inputRating = form.elements['bookRating'];
    const inputISBN = form.elements['ISBN'];
    const sotrtingBtns = document.querySelector('.sorting-section');

    renderAllBooks( sortedBookList );
    bestBookTemplate( bestBook );

    //Events
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);
    sotrtingBtns.addEventListener('click', sortingFunction);


    function renderAllBooks( bookList ) {
        if( !bookList ) {
            console.error('Pass the list of books!'); //check that list of book has been transmitted
            return;
        };

        const fragment = document.createDocumentFragment();
        Object.values( bookList ).forEach( book => { //get values from object of books
            const li = listItemTemplate( book );
            fragment.append( li );
        } );

        listContainer.append( fragment );
    };


    //Create li-element (only creat separate "LI")
    function listItemTemplate({ bookTitle, author, publicationYear, rating, isbn } = {}) {
        const li = document.createElement('li');
        li.classList.add('li-item');
        li.setAttribute('data-book-item', 'delete-item'); //to be able to delete

        const bookName = document.createElement('h3');
        bookName.textContent = bookTitle;
        bookName.classList.add('li-title');

        const bookAuthor = document.createElement('h3');
        bookAuthor.textContent = `Author: ${author || ''}`
        bookAuthor.classList.add('li-item-elem');

        const bookYear = document.createElement('h3');
        bookYear.textContent = `Publication year: ${publicationYear || '-'}`
        bookYear.classList.add('li-item-elem');

        const bookRating = document.createElement('h3');
        bookRating.textContent = `Rating: ${rating || 'rating not specified'}`
        bookRating.classList.add('li-item-elem');

        const bookISBN = document.createElement('h3');
        bookISBN.textContent = `ISBN: ${isbn || '-'}`;
        bookISBN.classList.add('li-item-elem');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete book';
        deleteBtn.classList.add('delete-btn');

        li.append( bookName );
        li.append( bookAuthor );
        li.append( bookYear );
        li.append( bookRating );
        li.append( bookISBN );
        li.append( deleteBtn );

        return li;
    }


    //Button's target (calling different functions)
    function sortingFunction(e) {
        if(e.target.classList.contains('rating-btn')) {
            sortByRating();
        } else if(e.target.classList.contains('author-btn')) {
            sortByAuthor();
        } else if(e.target.classList.contains('year-btn')){
            sortAlphabet( listOfBooks );
        }
    }


    //Sort listOfBooks
    function sortArray( array ) {
        const sortedArray = array.sort((a, b) => b.publicationYear - a.publicationYear); //sort bt years

        const arr = sortedArray.sort((a, b) => {
            if (a.publicationYear === b.publicationYear) {
                if(a.bookTitle.toLowerCase() < b.bookTitle.toLowerCase()) { //sort by alphabet in "year block"
                    return -1
                };
                if(a.bookTitle.toLowerCase() > b.bookTitle.toLowerCase()) {
                    return 1
                };
            };
        });
        return arr;
    };


    //Sort by alphabet and year
    function sortAlphabet( array ) {
        if(listContainer.children.length) {  //checking for the existence of elements in the container
            clearContainer(listContainer);
        }
        const sortedArray = array.sort((a, b) => b.publicationYear - a.publicationYear);
        const arr = sortedArray.sort((a, b) => {
            if (a.publicationYear === b.publicationYear) {
                if(a.bookTitle.toLowerCase() < b.bookTitle.toLowerCase()) {
                    return -1
                };
                if(a.bookTitle.toLowerCase() > b.bookTitle.toLowerCase()) {
                    return 1
                };
            };
        });
        renderAllBooks(arr);
    };
    


    //sort by rating
    function sortByRating() {
        const ratingList = listOfBooks.sort((a, b) => b.rating - a.rating); //sort by rating (descending)
        if(listContainer.children.length) { //checking for the existence of elements in the container
            clearContainer(listContainer);
        }
        renderAllBooks(ratingList);
    }


    //sorting by author
    function sortByAuthor() {
        const arr = listOfBooks.sort((a, b) => {
            if(a.author.toLowerCase() < b.author.toLowerCase()) {
                return -1
            };
            if(a.author.toLowerCase() > b.author.toLowerCase()) {
                return 1
            };
        });

        if(listContainer.children.length) {
            clearContainer(listContainer);
        }

        renderAllBooks(arr);
    }
    

    //getting the best book
    function getTheBestBook( array ) {
        const curentYear = 2021;

        const best = array.filter(book => book.publicationYear <= (curentYear - 3)); //check year
        const bestBook = best.reduce((acc, curr) => acc.rating > curr.rating ? acc : curr); //check rating
        return bestBook;
    }


    //create li for best book
    function bestBookTemplate( {bookTitle, rating} = {} ) {
        const fragment = document.createDocumentFragment();

        const li = document.createElement('li');
        li.style.marginBottom = '20px';
        li.style.listStyleType = 'none';
        li.style.color = 'white';

        const bookName = document.createElement('h3');
        bookName.textContent = bookTitle;
        bookName.classList.add('li-title');

        const bookRating = document.createElement('h3');
        bookRating.textContent = `Rating: ${rating || 'rating not specified'}`
        bookRating.classList.add('li-item-elem');

        li.append( bookName );
        li.append( bookRating );

        fragment.append( li );

        bestBookListContainer.append(fragment);

        return li;
    };

    
    //get input fields values
    function onFormSubmitHandler(e) {
        e.preventDefault();

        const titleValue = inputTitle.value;
        const authorValue = inputAuthor.value;
        const yearValue = inputYear.value;
        const ratingValue = inputRating.value;
        const isbnValue = inputISBN.value;

        if(!titleValue || !authorValue) {
            alert('Введите пожалуйста данные в форму!'); 
            return;
        };

        createNewBook( titleValue, authorValue, yearValue, ratingValue, isbnValue );
        form.reset();
    }


    //create different book from input field
    function createNewBook( bookTitle, author, publicationYear, rating, isbn ) {

        const newBook = {
            bookTitle,
            author,
            publicationYear,
            rating,
            isbn,
        };

        if(listContainer.children.length) {
            clearContainer(listContainer);
        }

        sortedBookList.push(newBook);
        const a = sortArray(sortedBookList);
        renderAllBooks(a);

        return { ...newBook };
    }


    // clear li from conrainer
    function clearContainer(container) {
        let child = container.lastElementChild;
        while(child) {
        container.removeChild(child);
        child = container.lastElementChild;
        };
    };


    //delete Book
    function onDeleteHandler(e) {
        if(e.target.classList.contains('delete-btn')) {
          const parent = e.target.closest('[data-book-item]'); //looking for the closest element
          const confirmed = deleteBook();
          deleteBookFromHtml(confirmed, parent);
        };
    };


    //delete confirmation
    function deleteBook() {
        const isConfirm = confirm('Вы действительно ходите удалить книгу?');
        if(!isConfirm) return isConfirm;
        delete objOfBooks[parent];
  
        return isConfirm;
    };
  
  
    //delete book element from html
    function deleteBookFromHtml(confirmed, element) {
      if(!confirmed) return;
      element.remove();
    };


}( listOfBooks ));


