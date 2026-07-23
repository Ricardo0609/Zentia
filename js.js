/* ========================================
   ZENTIA — js.js  (v2 — sin código viejo)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Side Menu ── */
    const menuIcon = document.getElementById('menu');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.getElementById('close-menu');
    const overlay  = document.getElementById('overlay');

    if (menuIcon && sideMenu) {
        menuIcon.addEventListener('click', () => {
            sideMenu.classList.add('active');
            if (overlay) overlay.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (sideMenu) sideMenu.classList.remove('active');
            if (overlay)  overlay.classList.remove('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sideMenu) sideMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

});

/* ── Tab Switcher (index.html) ── */
window.switchMainTab = function(tab) {
    document.querySelectorAll('.main-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.classList.add('inactive');
    });
    const pane = document.getElementById('pane-' + tab);
    const btn  = document.querySelector('.tab-btn[onclick*="' + tab + '"]');
    if (pane) pane.classList.add('active');
    if (btn)  { btn.classList.add('active'); btn.classList.remove('inactive'); }
};
