async function editFormHandler(event) {
    event.preventDefault();


    const title = document.querySelector('input[name="post-name"]').value;
    const post_text = document.querySelector('textarea[name="post-desc"]').value;

    const response = await fetch('/api/posts/:id', {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editFormHandler);