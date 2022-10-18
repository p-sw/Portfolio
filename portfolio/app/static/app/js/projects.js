function nextMove() {
    var current = document.querySelector('.current.project');
    var next = current.nextElementSibling;
    if (next) {
        next.classList.remove("down");
        next.classList.add("current");
        current.classList.remove("current");
        current.classList.add("up");
    }
}

function prevMove() {
    var current = document.querySelector('.current.project');
    var previous = current.previousElementSibling;
    if (previous) {
        previous.classList.remove("up");
        previous.classList.add("current");
        current.classList.remove("current");
        current.classList.add("down");
    }
}

document.addEventListener('wheel', function(e) {
    if (e.deltaY > 0) {
        nextMove();
    }
    else if (e.deltaY < 0) {
        prevMove();
    }
});

mainElement = document.querySelector('main');

mainElement.addEventListener("mousedown", (e) => {
    startPoint = e.pageY;
});

mainElement.addEventListener("mouseup", (e) => {
    endPoint = e.pageY;
    if (startPoint < endPoint) {
        prevMove();
    } else if (startPoint > endPoint) {
        nextMove();
    }
});

mainElement.addEventListener('touchstart', (e) => {
    startPoint = e.touches[0].pageY;
});

mainElement.addEventListener('touchend', (e) => {
    endPoint = e.changedTouches[0].pageX;
    if (startPoint < endPoint) {
        prevMove();
    } else if (startPoint > endPoint) {
        nextMove();
    }
})

document.querySelector('.projects').children[0].classList.add("current");
document.querySelector('.projects').children[0].classList.remove("down");