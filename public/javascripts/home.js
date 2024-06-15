

const header = document.querySelector("header");
const hamburgerBtn = document.querySelector("#hamburger-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

hamburgerBtn.addEventListener("click", () => header.classList.toggle("show-mobile-menu"));

let myVariable = false;
// Close mobile menu on close button click
closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());

document.getElementById("signInBtn").addEventListener("click", displayLoginBoard);
document.getElementById("becomeVolunteer").addEventListener("click", displayLoginBoard);
document.getElementById("signUpBtn").addEventListener("click", displayLogupBoard);


function displayLogupBoard() {
  const container = document.querySelector(".container");
  const logup = document.querySelector(".registration");
  const login = document.querySelector(".login");
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "block";
  container.style.display = "block";
  logup.style.display = "block";
  login.style.display = "none";


  const input = document.getElementById("inputpas"),
    showHide = document.querySelector(".show_hide"),
    indicator = document.querySelector(".indicator1"),
    confirmPassword = document.getElementById("confirmPassword"),
    iconText = document.querySelector(".icon-text"),
    text = document.getElementById("text2");

  // js code to show & hide password

  showHide.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      confirmPassword.type = "text";
      showHide.classList.replace("fa-eye-slash", "fa-eye");
    } else {
      input.type = "password";
      confirmPassword.type = "password";
      showHide.classList.replace("fa-eye", "fa-eye-slash");
    }
  });

  // js code to show password strength (with regex)

  let alphabet = /[a-zA-Z]/, //letter a to z and A to Z
    numbers = /[0-9]/, //numbers 0 to 9
    scharacters = /[!,@,#,$,%,^,&,*,?,_,(,),-,+,=,~]/; //special characters

  input.addEventListener("keyup", () => {
    indicator.classList.add("active");

    let val = input.value;
    if (val.match(alphabet) || val.match(numbers) || val.match(scharacters)) {
      text.textContent = "Password is weak (characters, nums, sympol)";
      input.style.borderColor = "#FF6333";
      showHide.style.color = "#FF6333";
      iconText.style.color = "#FF6333";
    }
    if (val.match(alphabet) && val.match(numbers) && val.length >= 6) {
      text.textContent = "Password is medium";
      input.style.borderColor = "#cc8500";
      showHide.style.color = "#cc8500";
      iconText.style.color = "#cc8500";
    }
    if (val.match(alphabet) && val.match(numbers) && val.match(scharacters) && val.length >= 8) {
      text.textContent = "Password is strong";
      input.style.borderColor = "#22C32A";
      showHide.style.color = "#22C32A";
      iconText.style.color = "#22C32A";
      myVariable = true;

    } else {
      myVariable = false;

    }

    if (val == "") {
      indicator.classList.remove("active");
      input.style.borderColor = "#A6A6A6";
      showHide.style.color = "#A6A6A6";
      iconText.style.color = "#A6A6A6";
    }
  });


  const eye = document.getElementById('fa-eye-slash');
  const passwordInput = document.getElementById('inputpas');

  passwordInput.addEventListener('input', function () {
    var password = passwordInput.value;
    if (!password) {
      eye.style.display = "none";
    } else {
      eye.style.display = "block";
    }
  });
}

function displayLoginBoard() {
  const container = document.querySelector(".container");
  const logup = document.querySelector(".registration");
  const login = document.querySelector(".login");
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "block";
  container.style.display = "block";
  logup.style.display = "none";
  login.style.display = "block";


}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const faq = button.nextElementSibling;
    const icon = button.children[1];

    faq.classList.toggle('show');
    icon.classList.toggle('rotate');
  });
});

document.addEventListener("click", function (event) {
  const container = document.querySelector(".container");

  const overlay = document.querySelector(".overlay");
  if (!container.contains(event.target) && event.target.id !== "becomeVolunteer" && event.target.id !== "signInBtn" && event.target.id !== "signUpBtn") {
    container.style.display = "none";
    overlay.style.display = "none";
    clearErrorMessage('emailError');
    clearErrorMessage('emailError1');
    clearErrorMessage('passwordError');
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('signemail').value = '';
    document.getElementById('inputpas').value = '';
    document.getElementById("text2").innerText = '';
    document.getElementById('inputpas').style.borderColor = '#cccccc';
    document.getElementById("icon-wa").style.display = 'none';
    document.getElementById('fa-eye-slash').style.display = 'none';
    document.getElementById('load').style.display = 'none';
  }



});

document.addEventListener("click", function (event) {
  const otp = document.getElementById('otp');
  document.querySelector(".overlay").style.display = 'block';
  // Check if the clicked element is not part of the OTP display
  if (
    !otp.contains(event.target) && // Check if the clicked element is not inside the OTP display
    event.target.id !== "otp" &&   // Check if the clicked element is not the OTP display itself
    event.target.id !== "otp_inp" && // Check if the clicked element is not an input field inside OTP
    event.target.id !== "otp-btn"    // Check if the clicked element is not a button inside OTP
  ) {
    otp.style.display = 'none'; // Hide the OTP display
    document.querySelector(".overlay").style.display = 'none';
  }
});

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function showErrorMessage(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function clearErrorMessage(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}



function Login(Email, Password) {


  if (!validateEmail(Email)) {
    showErrorMessage('emailError', 'Please enter a valid email address.');
  } else {
    clearErrorMessage('emailError');

    var requestBody = {
      email: Email,
      password: Password
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Login successful
          console.log("Login successful");
          window.location.href = 'user.html';

        }
        else {
          // Request failed
          console.error("Error:", xhr.status);
          document.getElementById('emailError').style.display = 'block';
          document.getElementById('emailError').innerText = 'incorrect password or username';
        }
      }
    };

    // Convert requestBody to JSON string and send the request
    xhr.send(JSON.stringify(requestBody));

    // Optionally submit the form or perform other actions here
  }
}


function checkEmailSignin() {
  const Email = document.getElementById('signemail').value;
  const Password = document.getElementById('inputpas').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!validateEmail(Email)) {
    showErrorMessage('emailError1', 'Please enter a valid email address.');
  } else {
    clearErrorMessage('emailError1');

    // Optionally submit the form or perform other actions here
  }


  if (myVariable) {
    if (Password != confirmPassword) {
      showErrorMessage('passwordError', 'The password is not match!');
    } else {

      clearErrorMessage('passwordError');
      if (validateEmail(Email)) {
        var requestBody = {
          email: Email,
          password: Password
        };
        document.getElementById('load').style.display = 'block';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/sentotp", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              // Request was successful
              document.getElementById('app').style.display = 'none';
              document.getElementById('otp').style.display = 'block';
              document.getElementById('ans-otp').innerText = 'A OTP Code has sent to your gmail: ' + Email;
              var otpButton = document.getElementById('otp-btn');

              // Attach an event listener to the button
              otpButton.addEventListener('click', function () {
                // Get the OTP value from the input field
                var otpValue = document.getElementById('otp_inp').value;
                var data = {
                  email: Email,
                  password: Password,
                  otp: otpValue
                };
                // Make a POST request to the server
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/signup", true);
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onreadystatechange = function () {
                  if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 201) {
                      // Request was successful


                      console.log("OTP verified successfully");
                      const otp = document.getElementById('otp');
                      otp.style.display = 'none'; // Hide the OTP display
                      const newuser = document.getElementById('newuser');
                      newuser.style.display = 'block';
                      document.getElementById("submit").addEventListener('click', function () {

                        //get user info input
                        var fullname = document.getElementById("fullname").value;
                        var address = document.getElementById("address").value;
                        var phone = document.getElementById("phone").value;
                        var date = document.getElementById("date").value;
                        var linkedurl = document.getElementById("url").value;
                        var useremail = data.email;

                        let userinfo = {
                          FullName: fullname,
                          LinkedURL: linkedurl,
                          Email: useremail,
                          Phone: phone,
                          DateOfBirth: date,
                          Address: address
                        };

                        var xhttp = new XMLHttpRequest();
                        xhttp.open('POST', '/add_user', true);
                        xhttp.setRequestHeader("Content-type", "application/json");

                        xhttp.onreadystatechange = function () {
                          if (xhttp.readyState == XMLHttpRequest.DONE) {
                            if (xhttp.status === 201) {
                              console.log("Information form finished");
                              document.querySelector(".overlay").style.display = 'none';
                              newuser.style.display = 'none';
                              Login(data.email, data.password);

                            } else {
                              console.error("Error:", xhttp.status);
                              document.getElementById('infoError').innerText = xhttp.responseText;

                            }
                          }
                        };
                        xhttp.send(JSON.stringify(userinfo));
                      });
                      // Optionally, you can perform actions after successful verification
                    } else {
                      // Request failed
                      console.error("Error:", xhr.status);
                      document.getElementById('otpError').innerText = xhr.responseText;
                      // Optionally, you can handle errors here
                    }
                  }
                };



                // Convert the data object to JSON string before sending
                xhr.send(JSON.stringify(data));
              });



            } else {
              // Request failed
              console.error("Error:", xhr.status);
              showErrorMessage('emailError1', xhr.responseText);
              document.getElementById('load').style.display = 'none';
            }
          }
        };


        // Convert requestBody to JSON string and send the request
        xhr.send(JSON.stringify(requestBody));
      }
    }
  }
}




function login() {
  const Password = document.getElementById("password").value;
  const Email = document.getElementById("email").value;

  if (!validateEmail(Email)) {
    showErrorMessage('emailError', 'Please enter a valid email address.');
  } else {
    clearErrorMessage('emailError');

    var requestBody = {
      email: Email,
      password: Password
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Login successful
          const userRole = xhr.responseText.toString();
          console.log(userRole);

          // Redirect based on user role
          if (userRole === '01') {
            window.location.href = 'user.html';
          } else if (userRole === '02') {
            window.location.href = 'manager.html';
          } else if (userRole === '03') {
            window.location.href = 'admin.html';
          } else {
            console.error('Unknown user role');
          }
          document.getElementById('emailError').style.display = 'none';
          // Optionally redirect to another page or perform other actions
        } else {
          // Request failed
          console.error("Error:", xhr.status);
          document.getElementById('emailError').style.display = 'block';
          document.getElementById('emailError').innerText = 'incorrect password or username';
        }
      }
    };

    // Convert requestBody to JSON string and send the request
    xhr.send(JSON.stringify(requestBody));

    // Optionally submit the form or perform other actions here
  }
}





