document.getElementById('myForm').addEventListener('submit', saveBookmark)

function saveBookmark(e) {
    //prevent the default submit
    e.preventDefault()

    //form values
    const siteName = document.getElementById('siteName').value
    const siteUrl = document.getElementById('siteUrl').value
    //check  the validation
    if (!validateForm(siteName, siteUrl)) {
        return false
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    //check if there is any value present in localstorage
    if (localStorage.getItem('bookmarks') === null) {
        //initialize the array
        let bookmarks = []
        //add to the array
        bookmarks.push(bookmark)
        //set to the local storage by converting from json to string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    } else {
        //get bookmarks from local storage
        //convert it to json 
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        //add to the array
        bookmarks.push(bookmark)
        //set it to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }

    //delete the input value
    document.getElementById('siteName').value = ''
    document.getElementById('siteUrl').value = ''

    //refetch again to show the updatevalue
    fetchBookmarks()
}
//delete bookmark function
function deleteBookmark(url) {
    //get the bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    //loop through the result
    for (let i = 0; i < bookmarks.length; i++) {
        //if it matching then it will delete the item
        if (bookmarks[i].url === url) {
            bookmarks.splice(i, 1)
        }
    }
    //again set it to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    //refetch again to show the updatevalue
    fetchBookmarks()
}

function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

    let color = ['alert-success', 'alert-info', 'alert-warning', 'alert-danger', 'alert-primary']
    // get the output id
    const bookmarksResult = document.getElementById('bookmarkesResult');

    bookmarkesResult.innerHTML = ``

    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name
        let url = bookmarks[i].url

        bookmarksResult.innerHTML += `<div class="alert ${color[(2 * i + 1) % bookmarks.length]}">
                                        <h3>${name}</h3>
                                        <a class="btn btn-info" target="_blank" href='${url}'>Visit</a>
                                        <a class="btn btn-danger" onClick="deleteBookmark('${url}')" href="#">Delete</a>
                                      </div>`
    }
}
//form validation
function validateForm(siteName, siteUrl) {
    //set validation if input field is empty
    if (!siteName || !siteUrl) {
        alert('please fill the form !!!')
        return false
    }
    //validation for url
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    let regex = new RegExp(expression)

    if (!siteUrl.match(regex)) {
        alert('Please use a vaild URL')
        return false
    }
    return true
}