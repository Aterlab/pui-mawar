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
const noDelay = 0.2
const secondaryDelay = 1.2
const thirdDelay = 1.8

window.addEventListener('load', () => {
    const desc = new SplitType('#desc', { type: 'words, lines', mask: 'lines', linesClass: 'line++' });
    gsap.from(desc.words, { opacity: 0, y: 100, duration: 0.8, delay: secondaryDelay, ease: 'power4.out', stagger: { amount: 0.25, from: 'start' } });

    const headline = new SplitType('.headline', { type: 'chars, lines', mask: 'lines', linesClass: 'line++' });
    gsap.from(headline.chars, { opacity: 0, y: 200, duration: 0.8, delay: noDelay, ease: 'power4.out', stagger: { amount: 0.25, from: 'start' } });

    const notice = new SplitType('#notice', { type: 'chars, lines', mask: 'lines', linesClass: 'line++' });
    gsap.from(notice.chars, { opacity: 0, y: 100, duration: 0.8, delay: secondaryDelay, ease: 'power4.out', stagger: { amount: 0.25, from: 'start' } });

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
});


// Projects

document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll(".counter .dot");
    const images = document.querySelectorAll(".images img");
    const texts = document.querySelectorAll(".texts .text");
    const buttons = document.querySelectorAll(".project-info .buttons .button");

    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");

    let currentIndex = 0;
    const duration = 0;
    let isAnimating = false; // <-- 1. Add a lock flag

    function switchToIndex(index) {
        if (index < 0 || index >= dots.length) return;
        if (index === currentIndex) return;
        if (isAnimating) return; // <-- 2. Ignore clicks if a transition is in progress

        isAnimating = true; // <-- 3. Lock it down

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

            isAnimating = false; // <-- 4. Unlock after the longest timeout finishes
        }, 200);

        currentIndex = index;
    }

    // --- Event Listeners stay exactly as you wrote them ---
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

// gsap.from(bottomGradientBlur, {
//     scrollTrigger: {
//         trigger: aboutSection,
//         start: "bottom bottom",
//         end: "+=4000",
//         toggleActions: "play reverse play reverse",
//     },
//     opacity: 0,
//     duration: 0.6,
//     ease: 'power4.out',
// });

var randomOffset = gsap.utils.random(-1200, -1800, true); // Random offset for imgs
var randomScrub = gsap.utils.random(0.1, 1.2, true); // Random scrub (about imgs and reviews)


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
    ease: "linear"
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
    ease: "linear"
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
    ease: "linear"
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
    ease: "linear"
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
    ease: "linear"
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
    ease: "linear"
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

    let reviewsPin = ScrollTrigger.create({
        trigger: "#reviews",
        pin: "#reviews",
        start: "top 20px",
        end: "+=3500",
    })

    const reviewMove = gsap.timeline({
        scrollTrigger: {
            scrub: 0,
            pin: false,
            trigger: "#reviews .reviews",
            start: "top top",
            endTrigger: "#contact",
            end: "+=3500",
            ease: "linear"
        },
    });

    reviewMove.to("#reviews .reviews", {
        y: "-300vh",
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            scrub: 0,
            pin: false,
            trigger: "#hero",
            start: "top 40px",
            endTrigger: "#projects",
            end: "bottom 50%",
        },
        ease: "linear"
    });

    tl.to("#hero", {
        opacity: "0",
        scale: "0.8",
        y: "120dvh",
    });
});


// Services section

const servicesSection = document.getElementById("services");
const servicesText = new SplitType(document.querySelector("#services .text-wrapper .big-text"));
const servicesChars = servicesText.chars;

const servicesSmallText = new SplitType(document.querySelector("#services .text-wrapper .small-text"));
const servicesSmallChars = servicesSmallText.chars;

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

gsap.from(servicesSmallChars, {
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

const categoriesGradients = document.querySelectorAll(".gradients .gradient");

gsap.set(categoriesGradients, { opacity: 0 });

Draggable.create('.categories', {
    type: 'x',
    bounds: document.querySelector('.categories-wrapper'),
    inertia: true,

    onDragStart: function () {
        console.log('drag started');
        gsap.to(categoriesGradients, { opacity: 1, duration: 0.5, ease: "power4.out" });
    },
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

// Contact

const contactRect = document.querySelector(".rect");
const navBlur = document.getElementById("nav-blur");
const navBar = document.getElementById("navBar");
const contactSection = document.getElementById("contact")

gsap.to(navBar, {
    scrollTrigger: {
        trigger: contactSection,
        start: "top 20px",
        end: "+=300",
        toggleActions: "play none play reverse",
    },
    opacity: 0,
    y: "-100px",
    duration: 1,
    ease: 'power4.inOut',
    stagger: {
        amount: 0.4,
        from: 'start',
    }
});

const contactTl = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#contact",
        start: "top 20px",
        end: "+=1500",
    },
    ease: "linear"
});

contactTl.from(contactRect, {
    // opacity: 0,
    height: 0,
})

contactTl.to(contactRect, {
    height: "100dvh",
    // opacity: 1
});

const ctaFirstLine = document.getElementById("cta-first-line");
const ctaSecondLine = document.getElementById("cta-second-line");
const contactCard = document.querySelector(".contact-card");
const contactBlur = document.querySelector(".contact-gradient-blur");

const contactBlurTl = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#contact",
        start: "top -=1500",
        end: "+=1501",
    },
    ease: "linear"
});

contactBlurTl.from(contactBlur, {
    opacity: 0
})

contactBlurTl.to(contactBlur, {
    opacity: 1
});

const contactFirstTl = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#contact",
        start: "top -=1500",
        end: "+=2000",
    },
    ease: "linear"
});

contactFirstTl.from(ctaFirstLine, {
    scale: 0.95,
    filter: "blur(15px)",
    opacity: 0,
});

contactFirstTl.to(ctaFirstLine, {
    scale: 1,
    filter: "none",
    opacity: 1,
});

const contactSecondTl = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#contact",
        start: "top -=3000",
        end: "+=3500",
    },
    ease: "linear"
});

contactSecondTl.from(ctaSecondLine, {
    scale: 0.95,
    filter: "blur(15px)",
    opacity: 0
})

contactSecondTl.to(ctaSecondLine, {
    scale: 1,
    filter: "none",
    opacity: 1
});

const contactCardTl = gsap.timeline({
    scrollTrigger: {
        scrub: 0,
        pin: false,
        trigger: "#contact",
        start: "top -=4000",
        end: "+=4300",
    },
    ease: "linear"
});

contactCardTl.from(contactCard, {
    scale: 0.8,
    // opacity: 0.5,
    filter: "blur(0px)",
    transform: "translateY(100dvh)",
    rotate: "-10deg",
})

contactCardTl.to(contactCard, {
    scale: 1,
    filter: "none",
    // opacity: 1,
    transform: "translateY(0)",
    rotate: "0deg",
});

gsap.set(navBlur, { opacity: 1 });

gsap.to(navBlur, {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 20px",
        toggleActions: "play none play reverse",
    },
    // opacity: 0,
    display: "none",
    duration: 0.001
});

let contactPin = ScrollTrigger.create({
    trigger: "#contact",
    pin: "#contact",
    start: "top 20px",
    end: "+=7000",
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

    const allReviews = document.querySelectorAll(".review");

    // Reviews on mobile
    const prevRev = document.getElementById("prev-rev");
    const nextRev = document.getElementById("next-rev");
    const reviews = document.querySelectorAll(".reviews .review");

    let currentRevIndex = 0;
    const revDuration = 0.333;
    let isRevAnimating = false;

    function switchToRevIndex(index) {
        // loop
        if (index === currentRevIndex) return;
        if (isRevAnimating) return;

        isRevAnimating = true;

        const currentRev = reviews[currentRevIndex];
        const nextRevElem = reviews[index];

        // anim out
        if (currentRev) {
            currentRev.classList.remove("active");
            gsap.to(currentRev, {
                duration: revDuration,
                opacity: 0,
                y: -20,
                scale: 0.9,
                display: "absolute",
                filter: "blur(10px)",
            });
        }

        // Animate in the new review
        if (nextRevElem) {
            // Set initial state before animating in
            gsap.set(nextRevElem, { display: "flex", opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" });

            nextRevElem.classList.add("active");
            gsap.to(nextRevElem, {
                duration: revDuration,
                opacity: 1,
                y: 0,
                delay: 0.1,
                scale: 1,
                filter: "none"
            });
        }

        // 2. Match this timeout exactly to your animation duration (including delays)
        setTimeout(() => {
            isRevAnimating = false;
        }, (revDuration + 0.1) * 1000);

        currentRevIndex = index;
    }

    prevRev?.addEventListener("click", () => {
        let targetIndex = currentRevIndex - 1;
        if (targetIndex < 0) {
            targetIndex = reviews.length - 1;
        }
        switchToRevIndex(targetIndex);
    });

    nextRev?.addEventListener("click", () => {
        let targetIndex = currentRevIndex + 1;
        if (targetIndex >= reviews.length) {
            targetIndex = 0;
        }
        switchToRevIndex(targetIndex);
    });
    // allReviews.forEach(rev => {
    //     gsap.to(rev, {
    //         rotate: randomRotate
    //     });
    // });

    // const reviewsTl = gsap.timeline({
    //     scrollTrigger: {
    //         scrub: 0,
    //         pin: false,
    //         trigger: reviewsSection,
    //         start: "top 20px",
    //         markers: true,
    //         end: "+=3500",
    //         ease: "linear"
    //     },
    // });

    // reviewsTl.to(".reviews", {
    //     y: "-200dvh",
    //     ease: "linear"
    // });
});