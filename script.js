// Key:
// edc91eb0ee4ba7113da7c1fb1914ed24

// Secret:
// 058633405b7ef01c

let photoNum = 0;



// drop down list
$('.dropdown button').click(function(){
    $('#selected').text($(this).text());
  });


$('.dropdown-menu button').on('click',function() {
  photoNum = $(this).val();
});


window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      console.log("Bottom of page");
      makeApiCall();
    }
  };

 $('#submitBtn').on('click', function() { // This event fires when a button is clicked
    onload = makeApiCall();
});


function makeApiCall(){
    let api_key = 'edc91eb0ee4ba7113da7c1fb1914ed24';
    let tags = document.getElementById("searchTxt").value;

    let url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + api_key + '&tags=' + tags + '&privacy_filter=1&safe_search=1?&extras=url_sq&format=json&page=' + photoNum + '&nojsoncallback=?';
    
    console.log(url);

    let output = document.querySelector('.output');
    output.innerHTML = "";

    $.ajax({ // start ajax
        url: url, 
        type: "GET", 
        success: function (data) {         
            let row;
            for(i = 0; i < data.photos.page; i++){
                
                if(i === 0 || (i % 4 === 0)) // generate row every 4 elements
                {
                    row = document.createElement('div');
                    row.classList = 'row justify-content-center';
                }   
                

                let card = document.createElement('div');

                card.classList = 'card col-md-3 col-lg-3 col-sm-6 col-6 p-5';

                let img = document.createElement('img');
                img.classList = 'card-img-top';
                img.setAttribute('src', data.photos.photo[i].url_sq)

                let cardBody = document.createElement('div');
                cardBody.classList = 'card-body';

                let h5 = document.createElement('h5');
                h5.classList = 'card-title';
                h5.innerText = data.photos.photo[i].title;

                cardBody.appendChild(h5);
                card.appendChild(img);
                card.appendChild(cardBody);

                row.appendChild(card);

                output.appendChild(row); 	

            }
        },
    })
}

