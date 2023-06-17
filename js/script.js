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

// ESCAPE - tab logic

const initialiseTabs = () => {
  const tabbedContent = document.querySelectorAll('.tabbed-content');

  for (const tabBlock of tabbedContent) {
    const tabHeaders = tabBlock.querySelectorAll('[data-tab-ref]');
    const tabs = tabBlock.querySelectorAll('[data-tab-id]');

    if (tabHeaders.length === 0) return;
    if (tabs.length === 0) return;

    for (const tabHeader of tabHeaders) {
      const tabRef = tabHeader.dataset.tabRef;
      tabHeader.addEventListener('click', (e) => {
        e.preventDefault();
        for (const tabHeader of tabHeaders) {
          tabHeader.classList.remove('selected');
        }
        tabHeader.classList.add('selected');
        for (const tab of tabs) {
          tab.classList.remove('active');
          tab.classList.remove('animate');
        }
        const tab = tabBlock.querySelector(`[data-tab-id="${tabRef}"]`);
        if (tab) {
          tab.classList.add('active');
        }
      });
    }
  }
};

// Run all logic on DOM load

document.addEventListener('DOMContentLoaded', () => {
  initialiseTabs();
});
