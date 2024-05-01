document.addEventListener('DOMContentLoaded', async function () {
    const accessKey = '3psx-Rx0hEm7Z5KxEGjDfQcfaVOo6bAnv9t9jOkS8_w';
    
    try {
        // Функция для загрузки случайного изображения из Unsplash
        async function fetchRandomPhoto(accessKey) {
            const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
        
            try {
                const response = await fetch(apiUrl);
                const photoData = await response.json();
                return photoData;
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
                return null;
            }
        }

        // Функция для сохранения изображения в localStorage
        async function savePhotoToLocalstorage(photoData) {
            try {
                // Получаем сохраненные ранее фотографии из localStorage
                let savedPhotos = JSON.parse(localStorage.getItem('savedPhotos')) || [];

                // Проверяем, есть ли уже такое изображение в сохраненных
                const existingPhotoIndex = savedPhotos.findIndex(photo => photo.id === photoData.id);

                // Если изображение еще не сохранено, добавляем его в localStorage
                if (existingPhotoIndex === -1) {
                    savedPhotos.push(photoData);
                    localStorage.setItem('savedPhotos', JSON.stringify(savedPhotos));
                }
            } catch (error) {
                console.error('Ошибка сохранения в localStorage:', error);
            }
        }
       

        // Загрузка случайного изображения
        const photoData = await fetchRandomPhoto(accessKey);
        await savePhotoToLocalstorage(photoData);

        // Отображение изображения и информации о фотографе
        const photoElement = document.getElementById('photo');
        photoElement.src = photoData.urls.regular;

        const photographerInfo = document.getElementById('photographer-info');
        photographerInfo.innerHTML = `Photo by <a href="${photoData.user.links.html}" target="_blank">${photoData.user.name}</a>`;

        // Инициализация счетчика лайков и обработчика события для кнопки "Лайк"
        const likeButton = document.getElementById('like-btn');
        const likeCount = document.getElementById('like-count');
        let likes = localStorage.getItem('likes') ? parseInt(localStorage.getItem('likes')) : 0;
        likeCount.textContent = likes;

        likeButton.addEventListener('click', async function () {
            // Проверяем, лайкал ли уже пользователь это изображение
            if (!localStorage.getItem(photoData.id)) {
                likes++;
                likeCount.textContent = likes;
                localStorage.setItem('likes', likes);
                localStorage.setItem(photoData.id, 'liked');
            } else {
                likes--;
                likeCount.textContent = likes;
                localStorage.removeItem(photoData.id);
                localStorage.setItem('likes', likes);
            }
        });
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
});
