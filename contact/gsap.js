const noDelay = 0.2
const secondaryDelay = 0.2
const thirdDelay = 0.2


window.addEventListener('load', () => {
    const allColumns = document.querySelectorAll(".column");

    allColumns.forEach(column => {
        gsap.from(column, {
            width: 0,
            delay: thirdDelay,
            ease: "power4.inOut",
            duration: 1,
        })
    });

    const showreel = document.querySelector(".showreel-content")
    const playBtn = document.getElementById("playBtn")

    gsap.from(showreel, {
        width: 0,
        delay: thirdDelay,
        ease: "power4.inOut",
        duration: 1,
        scale: 1.1,
    })

    gsap.from(playBtn, {
        opacity: 0,
        delay: thirdDelay,
        ease: "power4.inOut",
        duration: 0.25,
    })

    gsap.to(playBtn, {
        opacity: 1,
        delay: thirdDelay + 1,
        ease: "power4.inOut",
        duration: 0.25,
    })

    const navRight = document.querySelector("nav .right")
    const navLeft = document.querySelector("nav .left")
    const heroInfoBtn = document.getElementById("heroInfoBtn")

    gsap.from(navRight, {
        opacity: 0,
        x: "100%",
        delay: secondaryDelay,
        ease: "power4.inOut",
        duration: 1,
    })

    gsap.from(navLeft, {
        opacity: 0,
        x: "-100%",
        delay: secondaryDelay,
        ease: "power4.inOut",
        duration: 1,
    })

    gsap.from(heroInfoBtn, {
        opacity: 0,
        delay: secondaryDelay,
        ease: "power4.inOut",
        duration: 0.25,
    })

    gsap.to(heroInfoBtn, {
        opacity: 1,
        delay: secondaryDelay + 0.1,
        ease: "power4.inOut",
        duration: 0.25,
    })

    const text = new SplitType('#gsap-text', { type: 'chars, lines', mask: 'lines', linesClass: 'line++' });
    gsap.from(text.chars, { opacity: 0, y: 100, duration: 0.8, delay: secondaryDelay, ease: 'power4.out', stagger: { amount: 0.25, from: 'start' } });
});

gsap.fromTo(document.body,
    { opacity: 0 },
    {
        opacity: 1,
        duration: 1,
        ease: "power4.out"
    }
);

const nextButtons = document.querySelectorAll(".next");
const sectionWrapper = document.querySelector(".section-wrapper")

var xOffset = 0;

nextButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        xOffset += 1;
        sectionWrapper.style.opacity = 0
        setTimeout(() => {
            sectionWrapper.style.transform = `translateX(calc((${xOffset} * (100dvw + 20px)) * -1))`;
        }, 250);
        setTimeout(() => {
            sectionWrapper.style.opacity = 1;
        }, 250);
    });
});

const categories = document.querySelectorAll(".category")

categories.forEach((category) => {
    category.addEventListener('click', (e) => {
        category.classList.toggle('active')
    })
})