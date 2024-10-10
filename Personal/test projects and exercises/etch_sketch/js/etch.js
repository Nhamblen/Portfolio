const container = document.getElementById('container')
const button = document.getElementById('sizeButton')

function createGrid (size) {
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        container.appendChild(div);
    }

}

container.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'DIV') {
        e.target.style.backgroundColor = 'black';
    }
});

button.addEventListener('click', () => {
    let squaresPerSide = prompt ('Enter the number of squares you would like for the new grid');
    squaresPerSide = parseInt(squaresPerSide);

    if (!isNaN(squaresPerSide) && squaresPerSide > 0) {
        createGrid(squaresPerSide);
    }
    else {
        alert ('Please enter a valid number');
    }
})

createGrid(16);