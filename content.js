//Add a content with Film name, Category and Image url
document.getElementById('addContent').addEventListener('submit', function(event) {
    
    event.preventDefault();
    
    const movie = {
        name: document.getElementById('filmName').value,
        category: document.getElementById('filmC').value,
        imgUrl: document.getElementById('imageURL').value,
    };
    fetch('http://localhost:8080/api/movies/savemovie', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
    .then(response => {
        if (response.ok) {
            alert("Add Content Successfully..!");
        } else {
            return response.json().then(error => {
                alert('Failed to Add: ' + (error.message || 'Unknown error'));
            });
        }
    })
    .catch(error => {
        alert('Failed to Add');
    });
});



