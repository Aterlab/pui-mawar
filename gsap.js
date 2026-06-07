// Smooth scroll (gsap + lenis)

const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical'
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);


// Hero

window.addEventListener('load', () => {
    const desc = new SplitType('#desc', { type: 'words, lines', mask: 'lines', linesClass: 'line++' });
    gsap.from(desc.words, { opacity: 0, y: 100, duration: 0.8, delay: 0.2, ease: 'power4.out', stagger: { amount: 0.25, from: 'start' } });

    const headline = new SplitType('.headline', { type: 'chars, lines', mask: 'lines', linesClass: 'line++' });
    gsap.from(headline.chars, { opacity: 0, y: 200, duration: 0.8, delay: 0.2, ease: 'power4.out', stagger: { amount: 0.25, from: 'start' } });

    const notice = new SplitType('#notice', { type: 'chars, lines', mask: 'lines', linesClass: 'line++' });
    gsap.from(notice.chars, { opacity: 0, y: 100, duration: 0.8, delay: 0.2, ease: 'power4.out', stagger: { amount: 0.25, from: 'start' } });
});


// Projects

// this might be moved to desktop-only

document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll(".counter .dot");
    const images = document.querySelectorAll(".images img");
    const texts = document.querySelectorAll(".texts .text");
    const buttons = document.querySelectorAll(".project-info .buttons .button");

    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");

    let currentIndex = 0;
    const duration = 0; // it's already in css

    function switchToIndex(index) {
        if (index < 0 || index >= dots.length) return;
        if (index === currentIndex) return;

        document.querySelector(".counter .dot.active")?.classList.remove("active");
        dots[index].classList.add("active");

        const currentImage = document.querySelector(".images img.active");
        const nextImage = images[index];

        if (currentImage) {
            currentImage.classList.remove("active");
            gsap.to(currentImage, { opacity: 0, duration: duration, ease: "power2.inOut" });
        }
        if (nextImage) {
            nextImage.classList.add("active");
            gsap.to(nextImage, { opacity: 1, duration: duration, ease: "power2.inOut" });
        }

        const currentText = document.querySelector(".texts .text.active");
        const nextText = texts[index];

        if (currentText) {
            currentText.classList.remove("active");
            gsap.to(currentText, {
                opacity: 0,
                duration: duration,
                filter: "blur(10px)",
                ease: "power2.inOut"
            });
        }

        setTimeout(() => {
            if (nextText) {
                nextText.classList.add("active");
                gsap.to(nextText, {
                    opacity: 1,
                    duration: duration,
                    filter: "blur(0px)",
                    ease: "power2.inOut"
                });
            }
        }, 200);

        const currentButton = document.querySelector(".project-info .buttons .button.active");
        const nextButton = buttons[index];

        if (currentButton) {
            currentButton.classList.remove("active");
            gsap.to(currentButton, {
                opacity: 0,
                duration: duration,
                filter: "blur(10px)",
                ease: "power2.inOut",
            });
        }

        setTimeout(() => {
            if (nextButton) {
                nextButton.classList.add("active");
                gsap.to(nextButton, {
                    opacity: 1,
                    duration: duration,
                    filter: "blur(0px)",
                    ease: "power2.inOut",
                });
            }
        }, 200);

        currentIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            switchToIndex(index);
        });
    });

    prevBtn?.addEventListener("click", () => {
        let targetIndex = currentIndex - 1;
        if (targetIndex < 0) {
            targetIndex = dots.length - 1;
        }
        switchToIndex(targetIndex);
    });

    nextBtn?.addEventListener("click", () => {
        let targetIndex = currentIndex + 1;
        if (targetIndex >= dots.length) {
            targetIndex = 0;
        }
        switchToIndex(targetIndex);
    });
});

let projectsSection = document.querySelectorAll("#projects");

projectsSection.forEach(function (elem, index) {
    const headline = new SplitType(elem.querySelectorAll("#projects .x-big-text"));
    let headlineChars = headline.chars;

    const description = new SplitType(elem.querySelector(".medium-text"));
    let descriptionChars = description.chars;

    const counter = document.querySelector(".counter");
    const staticButton = document.querySelector(".buttons #static");
    const arrows = document.querySelector(".right-info")

    gsap.from(headlineChars, {
        scrollTrigger: {
            trigger: elem,
            start: "bottom bottom",
            end: "bottom top",
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: 'power4.out',
        stagger: {
            amount: 0.25,
            from: 'start'
        }
    });

    gsap.from(descriptionChars, {
        scrollTrigger: {
            trigger: elem,
            start: "bottom bottom",
            end: "bottom top",
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: 'power4.out',
        stagger: {
            amount: 0.25,
            from: 'start'
        }
    });

    gsap.from(counter, {
        scrollTrigger: {
            trigger: elem,
            start: "bottom bottom",
            end: "bottom top",
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: 'power4.out',
    });

    gsap.from(staticButton, {
        scrollTrigger: {
            trigger: elem,
            start: "bottom bottom",
            end: "bottom top",
        },
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: "power4.out",
    });

    gsap.from(arrows, {
        scrollTrigger: {
            trigger: elem,
            start: "bottom bottom",
            end: "bottom top",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power4.out",
    });
});

// let aboutPin = ScrollTrigger.create({
//     trigger: "#about",
//     pin: "#about",
//     start: "top 20px",
//     end: "+=3500",
// });

const tl = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#hero",
        start: "top 40px",
        endTrigger: "#projects",
        end: "bottom 50%",
    },
});

tl.to("#hero", {
    opacity: "0",
    scale: "0.8",
    y: 800,
});



// About

const aboutSection = document.getElementById("about");
const aboutText = new SplitType(document.querySelector("#about-section-desc"));
const aboutChars = aboutText.chars;

const bottomGradientBlur = document.getElementById("bottom-gradient-blur")

gsap.from(aboutChars, {
    scrollTrigger: {
        trigger: aboutSection,
        start: "top 20px",
        end: "+=3500",
    },
    opacity: 0,
    y: 100,
    duration: 0.6,
    ease: 'power4.out',
    stagger: {
        amount: 0.4,
        from: 'start',
    }
});

gsap.from(bottomGradientBlur, {
    scrollTrigger: {
        trigger: aboutSection,
        start: "bottom bottom",
        end: "+=4000",
        toggleActions: "play reverse play reverse",
    },
    opacity: 0,
    duration: 0.6,
    ease: 'power4.out',
});

var randomOffset = gsap.utils.random(-1200, -1800, true); // Random offset for imgs

const img1 = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#about #image-1",
        start: "top top",
        endTrigger: "#services",
        end: "+=3500",
        ease: "linear"
    },
});

img1.to("#about #image-1", {
    y: randomOffset,
});

const img2 = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#about #image-2",
        start: "top top",
        endTrigger: "#services",
        end: "+=3500",
        ease: "linear"
    },
});

img2.to("#about #image-2", {
    y: randomOffset,
});

const img3 = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#about #image-3",
        start: "center center",
        endTrigger: "#services",
        end: "+=3500",
        ease: "linear",
    },
});

img3.to("#about #image-3", {
    y: randomOffset,
});

const img4 = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#about #image-4",
        start: "center center",
        endTrigger: "#services",
        end: "+=3500",
        ease: "linear"
    },
});

img4.to("#about #image-4", {
    y: randomOffset,
});

const img5 = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#about #image-5",
        start: "center center",
        endTrigger: "#services",
        end: "+=3500",
        ease: "linear"
    },
});

img5.to("#about #image-5", {
    y: randomOffset,
});

const img6 = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#about #image-6",
        start: "center center",
        endTrigger: "#services",
        end: "+=3500",
        ease: "linear"
    },
});

img6.to("#about #image-6", {
    y: randomOffset,
});

const mm = gsap.matchMedia();

// Every animation that isn't in desktop or mobile query plays always (staggers, enter anims etc..)

// Run only on DESKOTP (gsap pins, which broke the layout and caused it to scroll back suddenly)
mm.add("(min-width: 798px)", () => {
    // Pins
    let projectPin = ScrollTrigger.create({
        trigger: "#projects",
        pin: "#projects",
        start: "top 20px",
        end: "+=500",
    });

    let aboutPin = ScrollTrigger.create({
        trigger: "#about",
        pin: "#about",
        start: "top 20px",
        end: "+=3500",
    });

    let servicesPin = ScrollTrigger.create({
        trigger: "#services",
        pin: "#services",
        start: "top 20px",
        end: "+=700",
    });
});

let reviewsPin = ScrollTrigger.create({
    trigger: "#reviews",
    pin: "#reviews",
    start: "top 20px",
    end: "+=3500",
})


// Services section

const servicesSection = document.getElementById("services");
const servicesText = new SplitType(document.querySelector("#services .big-text"));
const servicesChars = servicesText.chars;

gsap.from(servicesChars, {
    scrollTrigger: {
        trigger: servicesSection,
        start: "top 20px",
        end: "+=300",
    },
    opacity: 0,
    y: 100,
    duration: 0.6,
    ease: 'power4.out',
    stagger: {
        amount: 0.4,
        from: 'start',
    }
});

gsap.registerPlugin(Draggable, InertiaPlugin)

Draggable.create('.categories', {
    type: 'x',
    bounds: document.querySelector('.categories-wrapper'),
    inertia: true,
    // onClick: function () {
    //     console.log('clicked');
    // },
    // onDragEnd: function () {
    //     console.log('drag ended');
    // } gsap debugging
});

// Draggables cursor
gsap.set("#drag-cursor", { xPercent: -65, yPercent: -65 })

window.addEventListener("mousemove", e => {
    gsap.to("#drag-cursor", {
        x: e.x,
        y: e.y,
        duration: 0.25,
        ease: "power4.out",
        overwrite: "auto",
    });
});

const categories = document.querySelector(".categories");
const dragCursor = document.querySelector("#drag-cursor")

categories.addEventListener('mouseover', (e) => {
    dragCursor.classList.add("hovering");
})

categories.addEventListener('mouseleave', (e) => {
    dragCursor.classList.remove("hovering")
})

// Reviews

const reviewsSection = document.getElementById("reviews");
const reviewsText = new SplitType(document.getElementById("reviews-text"));
const reviewsChars = reviewsText.chars;

gsap.from(reviewsChars, {
    scrollTrigger: {
        trigger: reviewsSection,
        start: "top 20px",
        end: "+=300",
    },
    opacity: 0,
    y: 100,
    duration: 0.6,
    ease: 'power4.out',
    stagger: {
        amount: 0.4,
        from: 'start',
    }
});

// Run only on MOBILE (mostly not used, just in case)
mm.add("(max-width: 767px)", () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            scrub: 1, // only this is changed, since on deskop theres already Lenis for smooth scrolling, but on mobile it doesnt work so scrubbing will help here
            pin: false,
            trigger: "#hero",
            start: "top 40px",
            endTrigger: "#projects",
            end: "bottom 50%",
        },
    });
});