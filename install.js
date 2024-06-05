let deferredPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => {
        console.log('Service Worker registered successfully');
    })
    .catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});

window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed');
});
