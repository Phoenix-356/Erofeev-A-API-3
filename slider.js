document.addEventListener('DOMContentLoaded', async function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    let currentIndex = 0;
    let savedPhotos = JSON.parse(localStorage.getItem('savedPhotos')) || [];

    console.log('Saved photos from localStorage:', savedPhotos); // Отладочное сообщение

    function displaySavedPhotos() {
        sliderWrapper.innerHTML = '';
        savedPhotos.forEach((photo, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            if (index === currentIndex) {
                slide.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}">`;
            }
            sliderWrapper.appendChild(slide);
        });
    }

    displaySavedPhotos();

    prevButton.addEventListener('click', function () {
        if (currentIndex === 0) {
            currentIndex = savedPhotos.length - 1;
        } else {
            currentIndex--;
        }
        displaySavedPhotos();
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex === savedPhotos.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        displaySavedPhotos();
    });
    
});
