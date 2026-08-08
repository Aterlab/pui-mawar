document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('pct-loader');
    const numEl = document.getElementById('pct-num');

    if (!loader || !numEl) {
        console.warn('Loader elements not found on page');
        return;
    }

    const resources = [...document.images]; // only images — reliable .complete check
    const total = resources.length;
    let loaded = 0;
    const progress = { value: 0 };

    function animateTo(target) {
        gsap.to(progress, {
            value: target,
            duration: 0.4,
            ease: 'power1.out',
            onUpdate: () => {
                numEl.textContent = Math.round(progress.value);
            }
        });
    }

    function onResourceDone() {
        loaded++;
        const pct = total ? Math.min(100, (loaded / total) * 100) : 100;
        animateTo(pct);
    }

    resources.forEach(img => {
        if (img.complete) {
            onResourceDone();
        } else {
            img.addEventListener('load', onResourceDone);
            img.addEventListener('error', onResourceDone);
        }
    });

    if (total === 0) animateTo(100);

    window.addEventListener('load', () => {
        gsap.to(progress, {
            value: 100,
            duration: 0.3,
            ease: 'power1.out',
            onUpdate: () => { numEl.textContent = Math.round(progress.value); },
            onComplete: () => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.4,
                    delay: 0.2,
                    ease: 'power1.out',
                    onComplete: () => {
                        loader.remove();
                        window.dispatchEvent(new CustomEvent('loaderComplete'));
                    }
                });
            }
        });
    });
});