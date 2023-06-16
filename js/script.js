// COPY TO CLIPBOARD

const copyToClipboardButtons = document.querySelectorAll('[data-copy-text]');

for (const button of copyToClipboardButtons) {
  button.addEventListener('click', () => {
    // Create a new textarea element
    const textarea = document.createElement('textarea');
    // Set the value of the textarea to the text you want to copy
    textarea.value = button.dataset.copyText;

    // Append the textarea to the HTML document
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the textarea from the HTML document
    document.body.removeChild(textarea);

    // Change button text
    button.querySelector('.button-text').textContent = 'Copied!';
  });
}
