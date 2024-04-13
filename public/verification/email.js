  // Function to validate email
  function validateEmail() {
    var emailField = document.getElementById("email_for_signup").value;
    var emailerror = document.getElementById("email-error");
  
    if (emailField.trim() === "") {
      emailerror.innerText = ""; // Clear the error message if email field is empty
    } else if (!emailField.match(/^([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-]+)\.([a-zA-Z]{2,5})$/)) {
      emailerror.innerText = "Please enter a valid email address";
    } else {
      emailerror.innerText = ""; // Clear the error message if email is valid
    }
  }
  
  // Add event listener to the email input field
  document.getElementById("email_for_signup").addEventListener("input", validateEmail);
  