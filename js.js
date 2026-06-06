/* ========================================
   ZENTIA — js.js
   UI general: menú lateral, tabs, etc.
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Side Menu ---- */
    const menuIcon = document.getElementById('menu');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.getElementById('close-menu');
    const overlay  = document.getElementById('overlay');

    if (menuIcon && sideMenu) {
        menuIcon.addEventListener('click', () => {
            sideMenu.classList.add('active');
            overlay?.classList.add('active');
        });
    }

    const closeMenu = () => {
        sideMenu?.classList.remove('active');
        overlay?.classList.remove('active');
    };

    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

});

/* ---- Tab Switcher (index.html) ---- */
window.switchMainTab = function(tab) {
    const panes = document.querySelectorAll('.main-pane');
    const btns  = document.querySelectorAll('.tab-btn');

    panes.forEach(p => p.classList.remove('active'));
    btns.forEach(b => { b.classList.remove('active'); b.classList.add('inactive'); });

    const pane = document.getElementById(`pane-${tab}`);
    const btn  = document.querySelector(`.tab-btn[onclick*="${tab}"]`);

    if (pane) pane.classList.add('active');
    if (btn)  { btn.classList.add('active'); btn.classList.remove('inactive'); }
};