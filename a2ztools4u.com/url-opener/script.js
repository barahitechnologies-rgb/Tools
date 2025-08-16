document.getElementById('openUrls').addEventListener('click', function () {
  const urlsText = document.getElementById('urls').value;
  const urls = urlsText.split('\n').filter(url => url.trim() !== '');

  if (urls.length === 0) {
    alert('Please enter at least one URL.');
    return;
  }

  urls.forEach((url, index) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    // Add slight delay to avoid popup blocking
    setTimeout(() => {
      window.open(url, '_blank');
    }, index * 100); // 100ms interval between opens
  });
});

// ... (keep remaining JavaScript code unchanged) ...