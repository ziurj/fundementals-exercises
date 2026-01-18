function showNavBar() {
    let navLinksElement = document.querySelector('.navigation__links');

    if (navLinksElement.classList.contains('navigation__links__hidden')) {
        navLinksElement.classList.remove('navigation__links__hidden');
    } else {
        navLinksElement.classList.add('navigation__links__hidden');
    }
}