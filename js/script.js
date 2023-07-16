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

// TAB LOGIC

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
        }
        const tab = tabBlock.querySelector(`[data-tab-id="${tabRef}"]`);
        if (tab) {
          tab.classList.add('active');
        }
      });
    }
  }
};

// Modals

const initialiseModals = () => {
  const artistBlocks = document.querySelectorAll('.artist-block:not(.placeholder)');
  const closeButton = document.querySelector('[data-close-modal]');
  const modal = document.querySelector('[data-modal]');

  for (const artistBlock of artistBlocks) {
    artistBlock.addEventListener('click', () => {
      populateModalContent({
        image: artistBlock.querySelector('.artist-img-frame img')?.cloneNode(true),
        title: artistBlock.querySelector('h4')?.cloneNode(true),
        description: artistBlock.querySelector('.description')?.cloneNode(true),
        socials: artistBlock.querySelector('.socials-wrapper')?.cloneNode(true),
      });
      openModal();
    });
    closeButton.addEventListener('click', () => {
      closeModal();
    });
  }

  const openModal = () => {
    modal.showModal();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.close();
    document.body.style.overflow = 'auto';
  };

  const populateModalContent = ({ image, title, description, socials }) => {
    const modalImage = modal.querySelector('.img-frame img');
    const modalTitle = modal.querySelector('h4');
    const modalDescr = modal.querySelector('.description');
    const modalSocials = modal.querySelector('.socials-wrapper');

    // clear current contents
    modalImage.src = '';
    modalImage.alt = '';
    modalTitle.textContent = '';
    modalDescr.textContent = '';
    modalSocials.textContent = '';

    if (image) modalImage.parentNode.replaceChild(image, modalImage);
    if (title) modalTitle.parentNode.replaceChild(title, modalTitle);
    if (description) modalDescr.parentNode.replaceChild(description, modalDescr);
    if (socials) modalSocials.parentNode.replaceChild(socials, modalSocials);
  };

  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });
};

// Run all logic on DOM load

document.addEventListener('DOMContentLoaded', () => {
  initialiseTabs();
  initialiseModals();
});
