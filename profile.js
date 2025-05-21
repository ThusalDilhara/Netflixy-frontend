document.addEventListener('DOMContentLoaded', function() {
  
  const userEmail = localStorage.getItem('userEmail');
  
  if (userEmail) {
      fetch(`http://localhost:8080/api/users/getdetails/${userEmail}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Failed to fetch user data');
          }
      })
      .then(user => {
          
        document.getElementById('viewName').innerHTML = user.name;
        document.getElementById('viewEmail').innerHTML = user.email;
        document.getElementById('viewAge').innerHTML = user.age;
        document.getElementById('viewOption').innerHTML = user.interest;
        document.getElementById('viewPassword').innerHTML = user.password;
        document.getElementById('viewCountry').innerHTML = user.country;

        document.getElementById('editname').value = user.name;
        document.getElementById('editemail').value = user.email;
        document.getElementById('editage').value = user.age;
        document.getElementById('editinterest').value = user.interest;
        document.getElementById('editpassword').value = user.password;
        document.getElementById('editcountry').value = user.country;
      })
      .catch(error => {
          alert(error.message);    
      });
  } else {
     alert("No user data available");
  }



    document.getElementById('saveButton').addEventListener('click', function() {
    const updatedUser = {
        name: document.getElementById('editname').value,
        email: userEmail,
        age: document.getElementById('editage').value,
        interest: document.getElementById('editinterest').value,
        password: document.getElementById('editpassword').value,
        country: document.getElementById('editcountry').value,
    };

    fetch(`http://localhost:8080/api/users/updateuser`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update user data');
        }
    })
    .then(data => {
        alert('User details updated successfully');
        updateProfileView(data);
    })
    .catch(error => {
        alert(error.message);
    });
});


function updateProfileView(user) {
document.getElementById('viewName').innerHTML = user.name;
document.getElementById('viewEmail').innerHTML = user.email;
document.getElementById('viewAge').innerHTML= user.age;
document.getElementById('viewOption').innerHTML = user.interest;
document.getElementById('viewCountry').innerHTML= user.country;
document.getElementById('viewPassword').innerHTML = user.password;
localStorage.setItem('userInterest',(user.interest));
}
});

 
 

//delete function
document.getElementById('deleteButton').addEventListener('click', function() {
  const userEmail = localStorage.getItem('userEmail');

  fetch(`http://localhost:8080/api/users/delete/${userEmail}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (response.ok) {
          localStorage.removeItem('userDetails');
          localStorage.removeItem('userEmail');
      } else {
          throw new Error('Failed to delete user account');
      }
  })
  .catch(error => {
      alert(error.message);
  });
});
