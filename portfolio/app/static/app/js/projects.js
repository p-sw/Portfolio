function nextMove() {
    var current = document.querySelector('.current.project');
    var next = current.nextElementSibling;
    if (next) {
        next.classList.remove("next");
        next.classList.add("current");
        current.classList.remove("current");
        current.classList.add("prev");
    }
}

function prevMove() {
    var current = document.querySelector('.current.project');
    var previous = current.previousElementSibling;
    if (previous) {
        previous.classList.remove("prev");
        previous.classList.add("current");
        current.classList.remove("current");
        current.classList.add("next");
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
    startPoint = e.pageX;
});

mainElement.addEventListener("mouseup", (e) => {
    endPoint = e.pageX;
    if (startPoint < endPoint) {
        prevMove();
    } else if (startPoint > endPoint) {
        nextMove();
    }
});

mainElement.addEventListener('touchstart', (e) => {
    startPoint = e.touches[0].pageX;
    console.log(startPoint);
});

mainElement.addEventListener('touchend', (e) => {
    endPoint = e.changedTouches[0].pageX;
    console.log(endPoint);
    if (startPoint < endPoint) {
        prevMove();
    } else if (startPoint > endPoint) {
        nextMove();
    }
})

document.querySelector('.projects').children[0].classList.add("current");
document.querySelector('.projects').children[0].classList.remove("next");