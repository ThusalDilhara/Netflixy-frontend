
document.getElementById('registerform').addEventListener('submit', function(event) {
            event.preventDefault();
            const user = {

                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                age: document.getElementById('age').value,
                country:document.getElementById('country').value,
                interest: document.getElementById('interest').value
            };

            fetch('http://localhost:8080/api/users/register', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                if (response.ok) {
                    showContainer('container2',this);
                } else {
                    return response.json().then(error => {
                        alert('Failed to register: ' + (error.message || 'Unknown error'));
                    });
                }
            })
            .catch(error => {
                alert('Failed to register');
            });
        });
    