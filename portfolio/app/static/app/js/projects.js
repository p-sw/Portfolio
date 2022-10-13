document.addEventListener('wheel', function(e) {
    // scroll to the center of next of .project element that has attribute data-current
    // if the scroll is down
    // if the scroll is up, scroll to the previous element
    // using scrollTo

    // if the scroll is down
    if (e.deltaY > 0) {
        var current = document.querySelector('.project[data-current]');
        var next = current.nextElementSibling;
        if (next) {
            next.setAttribute('data-current', true);
            current.removeAttribute('data-current');
            window.scrollTo({
                top: next.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        }
    }
    // if the scroll is up
    else if (e.deltaY < 0) {
        var current = document.querySelector('.project[data-current]');
        var previous = current.previousElementSibling;
        if (previous) {
            previous.setAttribute('data-current', true);
            current.removeAttribute('data-current');
            window.scrollTo({
                top: previous.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        }
    }
});

document.querySelector('.projects').children[0].setAttribute('data-current', '');