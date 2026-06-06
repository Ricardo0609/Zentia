/* ========================================
   ZENTIA — comida.js
   Recetas con macros nutricionales
   ======================================== */

// Macros aproximados por receta (por porción estándar)
// Formato: [proteína_g, carbos_g, grasa_g, calorias_kcal]
const MACROS_DB = {
    // POLLO
    "Tinga":                                             [28, 14,  9, 245],
    "Con arroz":                                         [32, 42, 10, 390],
    "Molletes de frijol,queso,pollo y aguacate":         [26, 48, 16, 440],
    "tacos de pollo y huevo":                            [30, 30, 12, 340],
    "Tostadas de pollo con queso cottage":               [34, 22,  8, 295],
    "Pechuga de pollo con arroz y frijoles":             [38, 50, 10, 430],
    "Pollo con pasta y verduras":                        [30, 55, 12, 440],
    "Fajitas de pollo con frijoles":                     [32, 35, 10, 360],
    "Enchiladas":                                        [26, 38, 14, 380],
    "Pechuga de pollo con lentejas":                     [36, 38,  7, 360],
    // HUEVO
    "Omelette de pollo":                                 [34,  4, 16, 290],
    "Quesadillas de panela,huevo y frijoles":            [26, 40, 14, 385],
    "Con jamón":                                         [22,  8, 18, 280],
    "Burritos de huevo con frijoles y queso":            [24, 42, 14, 390],
    "Ensalada de huevo":                                 [18,  6, 16, 240],
    "Tostadas de atún y huevo":                          [28, 24, 10, 300],
    "Omelette queso Oaxaca":                             [24,  3, 20, 285],
    "Huevos con requesón y pan integral":                [26, 30, 10, 310],
    // PAN
    "Sándwich de pechuga de pavo con queso cottage":     [32, 36, 10, 360],
    "Hotcakes de avena":                                 [14, 52,  8, 330],
    "Mollete con requesón y pechuga de pavo":            [28, 34, 10, 340],
    // ATÚN
    "Tostadas de atún y aguacate":                       [28, 20, 14, 310],
    "Tortitas de atún al comal con arroz":               [30, 44,  8, 365],
    // RES
    "Bistec con papa cocida y verduras":                 [30, 28, 14, 360],
    "Albóndigas con arroz":                              [26, 40, 16, 405],
    "Picadillo de res con arroz":                        [24, 44, 14, 400],
    // LÁCTEOS
    "Yogur,frutas y semillas":                           [16, 38,  8, 285],
    "Licuado de avena con leche, yogur y crema de cacahuate": [24, 52, 16, 440],
    "Yogur griego con avena, manzana y semillas":        [20, 45, 10, 350],
    // PESCADO
    "Filete de pescado con puré de papa":                [30, 38,  8, 345],
    // POSTRES
    "Brownie":                                           [ 4, 36, 18, 320],
    // JUGOS
    "Betabel, zanahoria y naranja":                      [ 2, 28,  0, 115],
    "Espinaca, manzana verde, apio y jengibre":          [ 2, 22,  0,  90],
    "Toronja, piña":                                     [ 1, 26,  0, 105],
    "Agua de coco, mango y semillas de chía":            [ 3, 32,  4, 175],
    "Pepino, apio, limón y perejil":                     [ 1, 10,  0,  45],
    "Zanahoria, manzana y cúrcuma":                      [ 1, 24,  0,  98],
    "Arándanos, fresas y agua o infusión de hibisco":    [ 1, 20,  0,  82],
    "Naranja, guayaba y kiwi":                           [ 2, 30,  0, 125],
    "Col rizada (kale), pepino, manzana roja y limón":   [ 2, 18,  0,  75],
};

// Categorías con emoji
const CATEGORIAS_META = {
    pollo:    { label: "🍗 Pollo",     emoji: "🍗" },
    huevo:    { label: "🥚 Huevo",     emoji: "🥚" },
    atun:     { label: "🐟 Atún",      emoji: "🐟" },
    res:      { label: "🥩 Res",       emoji: "🥩" },
    Pescado:  { label: "🐠 Pescado",   emoji: "🐠" },
    lacteos:  { label: "🥛 Lácteos",   emoji: "🥛" },
    pan:      { label: "🍞 Pan",       emoji: "🍞" },
    Jugos:    { label: "🥤 Jugos",     emoji: "🥤" },
    postres:  { label: "🍫 Postres",   emoji: "🍫" },
};

// Obtener macros para una receta
function getMacros(titulo) {
    return MACROS_DB[titulo] || null;
}

// Crear badges de macros pequeños
function crearMacrosBadges(titulo) {
    const m = getMacros(titulo);
    if (!m) return '';
    return `
        <div class="macros-mini">
            <span class="macro-badge prot">${m[0]}g P</span>
            <span class="macro-badge carb">${m[1]}g C</span>
            <span class="macro-badge fat">${m[2]}g G</span>
            <span class="macro-badge cal">${m[3]} kcal</span>
        </div>
    `;
}

// Categoría activa
let categoriaActiva = '';

// Renderizar pills de categorías
function renderCategorias(data) {
    const container = document.getElementById('categorias-tab');
    if (!container) return;

    const keys = Object.keys(data).filter(k => {
        const items = data[k];
        return items && items.length > 0 && items[0].titulo && items[0].titulo !== '';
    });

    keys.forEach((key, i) => {
        const meta = CATEGORIAS_META[key] || { label: key };
        const pill = document.createElement('button');
        pill.classList.add('cat-pill', i === 0 ? 'active' : 'inactive');
        pill.textContent = meta.label || key;
        pill.dataset.key = key;
        pill.addEventListener('click', () => {
            // Actualizar pills
            document.querySelectorAll('.cat-pill').forEach(p => {
                p.classList.remove('active');
                p.classList.add('inactive');
            });
            pill.classList.remove('inactive');
            pill.classList.add('active');
            // Re-render recetas
            categoriaActiva = key;
            renderRecetas(data, key);
        });
        container.appendChild(pill);
    });

    // Activar la primera
    if (keys.length > 0) {
        categoriaActiva = keys[0];
        renderRecetas(data, keys[0]);
    }
}

// Renderizar grid de recetas
function renderRecetas(data, key) {
    const container = document.getElementById('recetas-container');
    if (!container) return;
    container.innerHTML = '';

    const lista = data[key] || [];
    const filtrada = lista.filter(r => r.titulo && r.titulo !== '');

    filtrada.forEach(receta => {
        const card = document.createElement('div');
        card.classList.add('receta-card');
        card.innerHTML = `
            <img src="${receta.foto || ''}" alt="${receta.titulo}" 
                 onerror="this.style.display='none'">
            <div class="receta-info">
                <div class="receta-titulo">${receta.titulo}</div>
                ${crearMacrosBadges(receta.titulo)}
            </div>
        `;
        card.addEventListener('click', () => abrirModal(receta));
        container.appendChild(card);
    });
}

// Abrir modal con macros detallados
function abrirModal(receta) {
    const modal = document.getElementById('modal-receta');
    if (!modal) return;

    document.getElementById('modal-img').src = receta.foto || '';
    document.getElementById('modal-titulo').textContent = receta.titulo;

    const macrosContainer = document.getElementById('modal-macros');
    const m = getMacros(receta.titulo);
    if (m) {
        macrosContainer.innerHTML = `
            <div class="macro-item">
                <span class="macro-val">${m[0]}g</span>
                <span class="macro-lbl">Proteína</span>
            </div>
            <div class="macro-item">
                <span class="macro-val">${m[1]}g</span>
                <span class="macro-lbl">Carbos</span>
            </div>
            <div class="macro-item">
                <span class="macro-val">${m[2]}g</span>
                <span class="macro-lbl">Grasas</span>
            </div>
            <div class="macro-item">
                <span class="macro-val">${m[3]}</span>
                <span class="macro-lbl">kcal</span>
            </div>
        `;
    } else {
        macrosContainer.innerHTML = `<p style="color:var(--gris2);font-size:13px;grid-column:1/-1">Macros no disponibles</p>`;
    }

    document.getElementById('modal-desc').textContent = `Valores nutricionales aproximados por porción. Los datos pueden variar según preparación y cantidades exactas.`;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('modal-receta');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
}

// ========================================
//  INIT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', cerrarModal);

    const modalOverlay = document.getElementById('modal-receta');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) cerrarModal();
        });
    }

    fetch('comida.txt')
        .then(r => r.json())
        .then(data => {
            renderCategorias(data);
        })
        .catch(err => console.error('Error cargando comidas:', err));
});