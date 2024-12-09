import { fetchProductIcons } from '/js/api/api';

const renderProductIcons = async () => {
    const productsListContainer = document.querySelector('.products-wrap');

    try {
        const icons = await fetchProductIcons();

        console.log(`Fetched ${icons.length} icons from the backend.`);

        if (!icons.length) {
            productsListContainer.innerHTML = '<p>No icons available</p>';
            return;
        }

        const shuffledIcons = icons.sort(() => Math.random() - 0.5);

        const rows = 4;
        const itemsPerRow = Math.ceil(shuffledIcons.length / rows);

        productsListContainer.innerHTML = '';

        for (let i = 0; i < rows; i++) {
            const ul = document.createElement('ul');
            ul.classList.add('products-list');
            ul.dataset.row = i;
            productsListContainer.appendChild(ul);
        }

        const lists = productsListContainer.querySelectorAll('.products-list');
        shuffledIcons.forEach((icon, index) => {
            const rowIndex = index % rows;
            const li = document.createElement('li');
            li.classList.add('products-item');

            li.innerHTML = `
        <img
          src="${icon.url}"
          alt="${icon.name}"
          width="100"
          height="100"
        />
      `;

            lists[rowIndex].appendChild(li);
        });

        console.log('Icons rendered successfully.');

        const startScrolling = () => {
            const allLists = document.querySelectorAll('.products-list');

            allLists.forEach((list, index) => {
                const direction = index % 2 === 0 ? -1 : 1;
                const speed = 1;
                let position = 0;
                const originalWidth = list.scrollWidth;

                const animate = () => {
                    position += speed * direction;

                    if (direction === -1 && position <= -originalWidth) {
                        position = 0;
                    } else if (direction === 1 && position >= originalWidth) {
                        position = 0;
                    }

                    list.style.transform = `translateX(${position}px)`;

                    const clone = list.nextElementSibling;
                    if (clone) {
                        clone.style.transform = `translateX(${position + originalWidth}px)`;
                    }

                    if (Math.abs(position) < originalWidth) {
                        requestAnimationFrame(animate);
                    }
                };

                animate();
            });
        };

        startScrolling();
    } catch (error) {
        console.error('Error rendering product icons:', error);
        productsListContainer.innerHTML = `<p>Error loading icons: ${error.message}</p>`;
    }
};

renderProductIcons();