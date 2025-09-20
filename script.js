// Mobile Sidebar
function openNav(){ document.getElementById("mySidebar").classList.add("open"); }
function closeNav(){ document.getElementById("mySidebar").classList.remove("open"); }

// Smooth scroll
document.querySelectorAll('header nav ul li a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior:'smooth' });
  });
});

// Contact form validation
const contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const formMessage = document.getElementById("formMessage");
    if(name && email && message){
      formMessage.style.color="green";
      formMessage.textContent="Thank you! Your message has been sent.";
      this.reset();
    } else {
      formMessage.style.color="red";
      formMessage.textContent="Please fill in all fields.";
    }
  });
}

