document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('.form-control').value;
    const messageElement = document.querySelector('.subscription-message');
    const formElement = document.querySelector('.newsletter-form');
    const titleElement = document.querySelector('.email-form-title');

    fetch('subscribe.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            email: email,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            messageElement.style.display = 'block';
            messageElement.style.color = 'green';
            messageElement.textContent = data.message;

            formElement.style.display = 'none';
            titleElement.style.display = 'none';
        } else {
            messageElement.style.display = 'block';
            messageElement.style.color = 'red';
            messageElement.textContent = data.message;
        }
    })
    .catch(error => {
        messageElement.style.display = 'block';
        messageElement.style.color = 'red';
        messageElement.textContent = 'An error occurred. Please try again later.';
    });
});
