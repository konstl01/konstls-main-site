const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

let xValue = 0, yValue = 0;
let rotateDegree = 0;
let menuOpen = false;

closeMenu();

function openMenu() {
    if(!menuOpen) {
        if(window.innerWidth >= 725) {
            menuOpen = true;
            sidebar.style.width = "33%";
            overlay.style.width = "100vw";
        } else {
            menuOpen = true;
            sidebar.style.width = "100vw";
            overlay.style.width = "100vw";
        }
    }
}

function closeMenu() {
    if(menuOpen) {
        menuOpen = false;
        sidebar.style.width = "0";
        overlay.style.width = "0";
    }
}

hamburger.addEventListener("click", () => {
    if(menuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener("click", () => {
    closeMenu();
});


function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.getAttribute("data-speedx");
        let speedy = el.getAttribute("data-speedy");
        let speedz = el.getAttribute("data-speedz");
        let speedRotate = el.getAttribute("data-speedRotate");

        let isInLeft = 
            parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = cursorPosition - parseFloat(getComputedStyle(el).left) * isInLeft * 0.1;

        el.style.transform = `
        translateX(calc(-50% + ${-xValue * speedx}px)) 
        translateY(calc(-50% + ${yValue * speedy}px)) 
        perspective(2300px) 
        translateZ(${zValue * speedz}px) 
        rotateY(${rotateDegree * speedRotate}deg)`;
    });
}

/* GSAP Animation */

/*let timeline = gsap.timeline();

Array.from(parallax_el).filter(el => !el.classList.contains("text")).forEach((el) => {
    timeline.from(
        el, {
            top: `${el.offsetHeight / 2 + +el.getAttribute("data-distance")}px`,
            duration: 5,
            ease: "power3.out"
        },
        "1"
    );
});*/

update(0);

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - (window.innerWidth / 2);
    yValue = e.clientY - (window.innerHeight / 2);

    rotateDegree = xValue / (window.innerWidth / 2) * 20;

    update(e.clientX);
});

if(window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

// Automatic Title change

window.addEventListener("blur", () => {
    document.title = "Come back!";
})
window.addEventListener("focus", () => {
    document.title = "Pine Trees";
})

// Clock

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }