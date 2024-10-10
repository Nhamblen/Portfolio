const container = document.getElementById('container')
const button = document.getElementById('sizeButton')

function createGrid (size) {
    container.innerHTML = '';
    const totalSize = 800;
    const squareSize = totalSize / size;

    container.style.width = `${totalSize}px`
    container.style.height = `${totalSize}px`

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.style.width = `${squareSize}px`;
        div.style.height = `${squareSize}px`;
        div.style.border = '1px solid black';
        div.style.boxSizing = 'border-box'
        container.appendChild(div);
        }
    }

container.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'DIV') {
        e.target.style.backgroundColor = 'black';
    }
});

button.addEventListener('click', () => {
    let size = prompt ('Enter the number of squares you would like for the new grid (max 100)');
    size = parseInt(size);

    if (size > 100){
        alert ('Please enter a valid number');
    }


    else if (!isNaN(size) && size > 0) {
        createGrid(size);
    }

    else {
        alert ('Please enter a valid number');
    }
})

createGrid(16);