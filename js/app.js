/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');




// Build menu 

const navbarList = document.querySelector('ul');
const fragment = document.createDocumentFragment();
// loop over section
sections.forEach(section => {
    // anchor text
    let dataNav = section.getAttribute('data-nav');
    let li = document.createElement('li');
    let a = document.createElement('a');
    //textcontent for anchor tag 
    let text = document.createTextNode(dataNav);
    let secID =section.id;
    //class for anchor tag
    a.classList.add('menu__link');
    //attribute for anchor tag
    a.href = `#${secID}`;
    //for better performance append elements to fragment then append fragment to ul outside loop 
    a.appendChild(text);
    li.appendChild(a);
    fragment.appendChild(li);
 });
 // append fragmet to ul
  navbarList.appendChild(fragment);


// Scroll to section on link clickusing scrollTO event, resorce: "https://webdesign.tutsplus.com/"

//links variable 
const links = document.querySelectorAll('a');

// loob over links 
 for (const link of links) {
    link.addEventListener('click', clickHandler);
}
function clickHandler(e) {
    // stoping the default behavior 
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
   // adding smooth scroll 
    scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  };

  // Add class 'active' to section when near top of viewport, inspired by: "Dev Ed on Youtube"
// options for observer
const Options ={
    threshold: 0.7
};
// i used intersectionobserver to detrmaine when section is in the viewport 
let observer = new IntersectionObserver(navCheck, Options);
    
//Declaring  observer's function
 function navCheck(entries) {
    entries.forEach(entry => {
      
         //remove class when not in viewport
         sections.forEach(section => section.classList.remove("your-active-class"));
         //add class when in viewport
         entry.target.classList.add("your-active-class");
        // highlite active link
         for (const link of links) { 
           if (link.textContent == entry.target.dataset.nav) {
             link.classList.add("active");
           } else {
             link.classList.remove("active");
           };
         };
         
    });
};
//tell the observer to watch the sections
sections.forEach(section => {
    observer.observe(section);
    });
//scroll to top button rsource: www.css-tricks.com
const scrollToTopBtn = document.getElementById("scrollToTopBtn")
const rootElement = document.documentElement

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
scrollToTopBtn.addEventListener("click", scrollToTop)

//animations 

gsap.from('.page__header', {duration: 1, y: '-100%', ease: 'sine'}) 
gsap.from('.menu__link', {duration: 1, opacity: 0, delay: .8, stagger: .3})
gsap.from('.main__hero', {duration: 1, x: "-100%", ease: 'back.out(1.7)'})


AOS.init({
  offset: 400,
  duration: 1000
});
