(function () {
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    const menu = document.querySelector('.gh-head-menu');
    const nav = menu.querySelector('.nav');
    if (!nav) return;

    const logo = document.querySelector('.gh-head-logo');
    const navHTML = nav.innerHTML;

    const items = nav.querySelectorAll('li');
    items.forEach(function (item, index) {
        item.style.transitionDelay = 0.03 * (index + 1) + 's';
    });

    const makeDropdown = function () {
        if (mediaQuery.matches) return;
        const submenuItems = [];

        while ((nav.offsetWidth + 64) > menu.offsetWidth) {
            if (nav.lastElementChild) {
                submenuItems.unshift(nav.lastElementChild);
                nav.lastElementChild.remove();
            } else {
                return;
            }
        }

        if (!submenuItems.length) return;

        const toggle = document.createElement('button');
        toggle.setAttribute('class', 'nav-more-toggle');
        toggle.setAttribute('aria-label', 'More');
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M21.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM13.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM5.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0z"></path></svg>';

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'gh-dropdown');

        if (submenuItems.length >= 10) {
            document.body.classList.add('is-dropdown-mega');
            wrapper.style.gridTemplateRows = 'repeat' + Math.ceil(submenuItems.length / 2) + ', 1fr)';
        } else {
            document.body.classList.remove('is-dropdown-mega');
        }

        submenuItems.forEach(function (child) {
            wrapper.appendChild(child);
        });

        toggle.appendChild(wrapper);
        nav.appendChild(toggle);

        toggle.addEventListener('click', function () {
            if (window.getComputedStyle(wrapper).display == 'none') {
                wrapper.style.display = submenuItems.length < 10 ? 'block' : 'grid';
                wrapper.classList.add('animate__animated', 'animate__bounceIn');
            } else {
                wrapper.classList.add('animate__animated', 'animate__zoomOut');
            }
        });

        wrapper.addEventListener('animationend', function (e) {
            wrapper.classList.remove('animate__animated', 'animate__bounceIn', 'animate__zoomOut');
            if (e.animationName == 'zoomOut') {
                wrapper.style.display = 'none';
            }
        });
    }

    imagesLoaded(logo, function () {
        makeDropdown();
    });

    window.addEventListener('resize', function () {
        setTimeout(function () {
            nav.innerHTML = navHTML;
            makeDropdown();
        }, 1);
    });
})();
