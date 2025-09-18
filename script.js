// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const formMessage = document.getElementById("formMessage");

  if(name && email && message){
    formMessage.style.color = "green";
    formMessage.textContent = "Thank you! Your message has been sent.";
    this.reset();
  } else {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill in all fields.";
  }
});

// Smooth scroll (optional extra)
const links = document.querySelectorAll('header nav ul li a');
links.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
