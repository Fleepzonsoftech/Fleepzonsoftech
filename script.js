// =======================
// Mobile Sidebar
// =======================
function openNav() {
  document.getElementById("mySidebar").classList.add("open");
}

function closeNav() {
  document.getElementById("mySidebar").classList.remove("open");
}

// =======================
// Smooth Scroll & Link Handling
// =======================
document.querySelectorAll('header nav ul li a, .sidebar a').forEach(link => {
  const href = link.getAttribute('href');

  if (href.startsWith('#')) { // internal anchor links only
    link.addEventListener('click', e => {
      e.preventDefault(); // prevent default scroll for anchors
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      closeNav(); // close sidebar on mobile after clicking
    });
  } else { // external page links
    link.addEventListener('click', () => {
      closeNav(); // close sidebar on mobile, allow normal navigation
    });
  }
});

// =======================
// Contact Form Validation
// =======================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const formMessage = document.getElementById("formMessage");

    if (name && email && message) {
      formMessage.style.color = "green";
      formMessage.textContent = "Thank you! Your message has been sent.";
      this.reset();
    } else {
      formMessage.style.color = "red";
      formMessage.textContent = "Please fill in all fields.";
    }
  });
}



