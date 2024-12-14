export function cloneListItems(listId, itemClass, numCopies) {
    const list = document.getElementById(listId);
    const items = list ? list.querySelectorAll(itemClass) : [];
    if (!items.length) return;

    for (let i = 0; i < numCopies; i++) {
        items.forEach((item) => {
            const clonedItem = item.cloneNode(true);
            list.appendChild(clonedItem);
        });
    }
}