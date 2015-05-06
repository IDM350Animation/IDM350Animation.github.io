var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
var bodyElement = document.querySelector("body");
var floatie = document.querySelector("#floatie");
var currentScrollPosition;
var iteration;
var start = false;
function setup() {
    // do something when the up arrow is clicked
    floatie.addEventListener("click", animateToTopOfPage, false);
    // deal with the mouse wheel
    bodyElement.addEventListener("mousewheel", stopEverything, false);
    bodyElement.addEventListener("DOMMouseScroll", stopEverything, false);
    // wheeeeeeee!
    animationLoop();
}
setup();
//
// kick of the animation to scroll your window back to the top
//
function animateToTopOfPage(e) {
    currentScrollPosition = getScrollPosition();
    start ^= true;
    iteration = 0;
}
//
// stop the animation and reset start and iteration
//
function stopEverything() {
    start = false;
}
//
// a cross-browser (minus Opera) way of getting the current scroll position
//
function getScrollPosition() {
    if (document.documentElement.scrollTop == 0) {
        return document.body.scrollTop;
    } else {
        return document.documentElement.scrollTop;
    }
}
//
// kicks into high gear only when the start variable is true
//
function animationLoop() {
    // start is true when you click on the up arrow
    if (start) {
        // where the magic happens
        window.scrollTo(0, easeInOutQuad(iteration,
                                         currentScrollPosition,
                                         -currentScrollPosition,
                                         100));
        iteration++;
        // once you reach the top of the document, stop the scrolling
        if (getScrollPosition() <= 0) {
            stopEverything();
        }
    }
    requestAnimationFrame(animationLoop);
}

// just querying the DOM...like a boss!
var links = document.querySelectorAll(".itemLinks");
var wrapper = document.querySelector("#wrapper");
// the activeLink provides a pointer to the currently displayed item
var activeLink = 0;
// setup the event listeners
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', setClickedItem, false);
    // identify the item for the activeLink
    link.itemID = i;
}
// set first item as active
links[activeLink].classList.add("active");
function setClickedItem(e) {
    removeActiveLinks();
    var clickedLink = e.target;
    activeLink = clickedLink.itemID;
    changePosition(clickedLink);
}
function removeActiveLinks() {
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
}
// Handle changing the slider position as well as ensure
// the correct link is highlighted as being active
function changePosition(link) {
    link.classList.add("active");
    var position = link.getAttribute("data-pos");
    wrapper.style.left = position;
}
