const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

let xValue = 0, yValue = 0;
let rotateDegree = 0;
let menuOpen = false;

closeMenu();
updateBG();
startTime();

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

  function updateBG() {
    let time = new Date().getHours();
    var bg = document.querySelector(".bg-img");

    switch(time) {
        case 2:
        case 3:
        case 4:
            bg.src = "/imgs/BG/BG1.svg";
            break;
        case 5:
        case 6:
        case 7:
            bg.src = "/imgs/BG/BG2.svg";
            break;
        case 8:
        case 9:
            bg.src = "/imgs/BG/BG3.svg";
            break;
        case 10:
        case 11:
        case 12:
            bg.src = "/imgs/BG/BG4.svg";
            break;
        case 13:
        case 14:
            bg.src = "/imgs/BG/BG5.svg";
            break;
        case 15:
        case 16:
        case 17:
            bg.src = "/imgs/BG/BG6.svg";
            break;
        case 18:
        case 19:
            bg.src = "/imgs/BG/BG7.svg";
            break;
        case 20:
        case 21:
        case 22:
            bg.src = "/imgs/BG/BG8.svg";
            break;
        case 23:
        case 0:
        case 1:
            bg.src = "/imgs/BG/BG9.svg";
            break;
        default:
            bg.src = "/imgs/BG/BG1.svg";
    }
  }