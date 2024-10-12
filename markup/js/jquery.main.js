const items = document.querySelectorAll('li');
const header = document.getElementById('header');
const menuLinks = document.querySelectorAll('#header a');
const navOpener = document.querySelector('.nav-opener');
const body = document.body;

function activateOnScroll() {
  const windowHeight = window.innerHeight;
  
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    
    if (rect.top >= 0 && rect.top <= windowHeight / 2) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function handleHeaderOnScroll() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > 0) {
    header.classList.add('header-scroll');
  } else {
    header.classList.remove('header-scroll');
  }
}

function scrollToItem(index) {
  items[index].scrollIntoView({ behavior: 'smooth' });
  
  items.forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    scrollToItem(index);
  });
});

menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const headerHeight = header.offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});

navOpener.addEventListener('click', () => {
  body.classList.toggle('nav-active');
});

window.addEventListener('scroll', () => {
  activateOnScroll();
  handleHeaderOnScroll();
});

activateOnScroll();

document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const emailFormTitle = document.querySelector('.email-form-title');
  const messageElement = document.querySelector('.subscription-message');
  const emailInput = document.querySelector('.form-control').value;
  
  fetch('subscribe.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      email: emailInput,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      emailFormTitle.style.display = 'none';
      messageElement.style.display = 'block';
      messageElement.textContent = data.message;
    } else {
      messageElement.style.display = 'block';
      messageElement.textContent = data.message;
    }
  })
  .catch(error => {
    messageElement.style.display = 'block';
    messageElement.textContent = 'An error occurred. Please try again later.';
  });
});
