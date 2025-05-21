document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const loginData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
  };

  fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Failed to login');
      }
  })
  .then(user => {
   // Store user information in local storage
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userInterest', user.interest);
    window.location.href = 'home Page.html','profile.html';  
  })
  .catch(error => {
      alert("invalid Email or password");
  });
});

function showAddContent(){
    document.getElementById('window').style.display = 'none';
        document.getElementById('addContent').style.display = 'block';
    }

