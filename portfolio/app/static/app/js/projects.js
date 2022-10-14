document.addEventListener('wheel', function(e) {
    if (e.deltaY > 0) {
        var current = document.querySelector('.current.project');
        var next = current.nextElementSibling;
        if (next) {
            next.classList.remove("down");
            next.classList.add("current");
            current.classList.remove("current");
            current.classList.add("up");
        }
    }
    else if (e.deltaY < 0) {
        var current = document.querySelector('.current.project');
        var previous = current.previousElementSibling;
        if (previous) {
            previous.classList.remove("up");
            previous.classList.add("current");
            current.classList.remove("current");
            current.classList.add("down");
        }
    }
});

document.querySelector('.projects').children[0].classList.add("current");
document.querySelector('.projects').children[0].classList.remove("down");