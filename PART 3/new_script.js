document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('contactForm');
  const name = document.getElementById('name')
  const nameOutput = document.getElementById('name-error')
  const email = document.getElementById("email");
  const emailOutput = document.getElementById("email-error");
  const comments = document.getElementById("comments");
  const commentsInfo = document.getElementById("comments-info");
  const commentsOutput = document.getElementById("comments-error");
  const tempRegex = /[a-zA-Z0-9.,!? ]/g;
  let formErrors = [];

  function displayAndFadeOutError(outputElement, message) {
    outputElement.textContent = message;
    outputElement.classList.add('fade-out');
    outputElement.style.opacity = 1;

    setTimeout(() => {
        outputElement.style.opacity = 0;
    }, 2000);
}

  name.addEventListener("input", function(event) {
    if(name.validity.valueMissing) {
      name.setCustomValidity("Please fill in the required field");
      // nameOutput.textContent = name.validationMessage;
      formErrors.push({field: name.id, message: name.validationMessage});
      displayAndFadeOutError(nameOutput, name.validationMessage);

    }
    else{
      name.setCustomValidity('');
    }
  });

  email.addEventListener("input", function(event) {
    if(email.validity.valueMissing) {
      email.setCustomValidity("Please fill in the required field");
      // emailOutput.textContent = email.validationMessage;
      formErrors.push({field: email.id, message: email.validationMessage});
      displayAndFadeOutError(emailOutput, email.validationMessage);
    }
    else if (email.validity.typeMismatch) {
      email.setCustomValidity("Please enter a valid email");
      // emailOutput.textContent = email.validationMessage;
      formErrors.push({field: email.id, message: email.validationMessage});
      displayAndFadeOutError(emailOutput, email.validationMessage);
    } 
    else{
      email.setCustomValidity('');
    }
  });

  comments.addEventListener("input", function(event) {
    if(comments.validity.valueMissing) {
      comments.setCustomValidity("Please fill in the required field");
      formErrors.push({field: comments.id, message: comments.validationMessage});
      displayAndFadeOutError(commentsOutput, comments.validationMessage);

    }
    else if (!tempRegex.test(comments.value)) {
      comments.setCustomValidity("Valid characters are alphanumeric and basic punctuations (Illegal character present)");
      formErrors.push({field: comments.id, message: comments.validationMessage});
      displayAndFadeOutError(commentsOutput, comments.validationMessage);
    } 
    else{
      comments.setCustomValidity('');
    }
  });

  comments.addEventListener("input", function(event) {
    const maxLength = comments.getAttribute('maxlength');
    const currentCount = comments.value.length;
    const remainingCount = maxLength - currentCount;
    commentsInfo.textContent = `${remainingCount} characters remaining`;

    if (remainingCount >= 50) {
      commentsInfo.classList.add('fine');
      commentsInfo.classList.remove('error', 'warn');
    }
    if (remainingCount < 50 && remainingCount > 20) {
      commentsInfo.classList.add('warn');
      commentsInfo.classList.remove('fine', 'error');
    }
    else {
      commentsInfo.classList.add('error');
      commentsInfo.classList.remove('fine', 'warn');
    }
  });

  form.addEventListener('submit', function (event) {
    console.log('Submit called');
    if(!form.checkValidity() || formErrors.length > 0) {
      console.log("Form invalid")
      event.preventDefault();
      document.getElementById('form-errors').value = JSON.stringify(formErrors);
      formErrors=[]
    }
    else {
      form.submit();
    }
  });

});

const darkMode = localStorage.getItem('darkMode') === 'true';
if (darkMode) {
    document.body.classList.add('dark-mode');
}
document.getElementById('toggleTheme').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const darkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkMode);
});