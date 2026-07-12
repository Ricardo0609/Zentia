/* ========================================
   ZENTIA — comida.js
   Recetas + Planificador semanal de comidas
   ======================================== */

const MACROS_DB = {
    "Tinga":                                             [28, 14,  9, 245],
    "Con arroz":                                         [32, 42, 10, 390],
    "Molletes de frijol, queso, pollo y aguacate":       [26, 48, 16, 440],
    "Tacos de pollo y huevo":                            [30, 30, 12, 340],
    "Tostadas de pollo con queso cottage":               [34, 22,  8, 295],
    "Pechuga de pollo con arroz y frijoles":             [38, 50, 10, 430],
    "Pollo con pasta y verduras":                        [30, 55, 12, 440],
    "Fajitas de pollo con frijoles":                     [32, 35, 10, 360],
    "Enchiladas de pollo":                               [26, 38, 14, 380],
    "Pechuga de pollo con lentejas":                     [36, 38,  7, 360],
    "Pechuga a la plancha con camote":                   [40, 32,  6, 340],
    "Bowl de pollo con quinoa y espinaca":               [38, 40,  8, 385],
    "Pollo al horno con brócoli y papa":                 [36, 35,  8, 360],
    "Pollo al limón con arroz integral":                 [34, 44,  8, 385],
    "Pollo teriyaki con arroz y edamame":                [36, 50, 10, 425],
    "Milanesa de pollo al horno con puré de papa":       [34, 45, 10, 405],
    "Wrap de pollo con aguacate y verduras":             [30, 36, 14, 390],
    "Sopa de pollo con pasta y verduras":                [26, 38,  6, 315],
    "Pechuga en salsa verde con frijoles":               [34, 32,  8, 340],
    "Pollo con champiñones y arroz":                     [32, 44,  8, 375],
    "Tazón de pollo con garbanzos y espinaca":           [38, 38,  9, 385],
    "Pollo con vegetales al horno":                      [34, 28,  8, 325],
    "Caldo de pollo con verduras y fideos":              [22, 32,  5, 265],
    "Pollo asado con ensalada de garbanzos":             [36, 36,  9, 370],
    "Muslo de pollo al horno con papa y zanahoria":      [30, 38, 12, 375],
    "Omelette de pollo":                                 [34,  4, 16, 290],
    "Quesadillas de panela, huevo y frijoles":           [26, 40, 14, 385],
    "Huevos con jamón":                                  [22,  8, 18, 280],
    "Burritos de huevo con frijoles y queso":            [24, 42, 14, 390],
    "Ensalada de huevo":                                 [18,  6, 16, 240],
    "Tostadas de atún y huevo":                          [28, 24, 10, 300],
    "Omelette queso Oaxaca":                             [24,  3, 20, 285],
    "Huevos con requesón y pan integral":                [26, 30, 10, 310],
    "Omelette de claras con espinaca y champiñones":     [28,  4, 10, 215],
    "Huevos revueltos con avena y plátano":              [20, 45,  8, 335],
    "Huevos rancheros con frijoles":                     [22, 32, 12, 330],
    "Bowl de huevo poché con quinoa y aguacate":         [24, 36, 14, 365],
    "Frittata de verduras y queso panela":               [26,  8, 14, 260],
    "Huevos a la mexicana con tortilla y frijoles":      [20, 38, 12, 340],
    "Tortilla española con papa y cebolla":              [18, 30, 12, 300],
    "Claras batidas con avena y miel":                   [22, 42,  4, 295],
    "Huevos benedictinos con jamón de pavo":             [28, 28, 14, 350],
    "Tazón proteico de huevo, arroz y brócoli":          [30, 42,  8, 365],
    "Tostadas de atún y aguacate":                       [28, 20, 14, 310],
    "Tortitas de atún al comal con arroz":               [30, 44,  8, 365],
    "Bowl de atún con quinoa, pepino y limón":           [32, 38,  8, 355],
    "Pasta con atún, aceite de oliva y tomate":          [28, 55, 12, 435],
    "Sándwich de atún con aguacate en pan integral":     [30, 36, 14, 390],
    "Ensalada de atún con garbanzo y jitomate":          [30, 30, 10, 330],
    "Arroz con atún y verduras salteadas":               [28, 48,  8, 380],
    "Atún con papa cocida y brócoli al vapor":           [30, 38,  6, 325],
    "Taco de atún con pico de gallo y aguacate":         [26, 28, 12, 325],
    "Bistec con papa cocida y verduras":                 [30, 28, 14, 360],
    "Albóndigas con arroz":                              [26, 40, 16, 405],
    "Picadillo de res con arroz":                        [24, 44, 14, 400],
    "Arrachera a la plancha con arroz y frijoles":       [34, 46, 14, 440],
    "Carne molida con verduras y arroz integral":        [30, 42, 12, 395],
    "Caldo de res con verduras y papa":                  [24, 30,  8, 295],
    "Tiras de res con champiñones y papa":               [32, 34, 12, 370],
    "Bowl de res con arroz integral y guacamole":        [34, 48, 14, 455],
    "Hamburguesa de res magra con camote horneado":      [32, 42, 12, 405],
    "Estofado de res con zanahoria y papa":              [28, 36, 12, 365],
    "Milanesa de res al horno con ensalada":             [30, 22, 14, 335],
    "Filete de pescado con puré de papa":                [30, 38,  8, 345],
    "Salmón a la plancha con espárrago y arroz":         [36, 42, 14, 440],
    "Salmón al horno con limón y brócoli":               [34, 12, 16, 330],
    "Tilapia al vapor con quinoa y espinaca":            [32, 38,  6, 335],
    "Tacos de pescado con col y pico de gallo":          [26, 34, 10, 330],
    "Filete de tilapia con arroz y ensalada":            [30, 40,  6, 335],
    "Ceviche de camarón con tostadas":                   [24, 30,  6, 270],
    "Camarones a la plancha con arroz integral":         [28, 44,  6, 345],
    "Sopa de mariscos con verduras":                     [24, 26,  8, 275],
    "Salmón con costra de ajonjolí y camote":            [36, 36, 16, 435],
    "Ensalada de salmón con garbanzos y pepino":         [32, 30, 14, 375],
    "Yogur, frutas y semillas":                          [16, 38,  8, 285],
    "Licuado de avena con leche, yogur y crema de cacahuate": [24, 52, 16, 440],
    "Yogur griego con avena, manzana y semillas":        [20, 45, 10, 350],
    "Parfait de yogur griego con granola y arándanos":   [18, 44, 10, 340],
    "Licuado proteico de leche, plátano y avena":        [22, 56,  8, 385],
    "Batido de chocolate con leche y creatina":          [30, 40,  8, 355],
    "Bowl de cottage cheese con piña y semillas":        [24, 32,  8, 295],
    "Licuado verde con espinaca, leche y plátano":       [18, 44,  6, 305],
    "Requesón con frutos rojos y miel":                  [20, 28,  4, 230],
    "Smoothie de mango, yogur y proteína de vainilla":   [30, 52,  6, 385],
    "Leche con cacao amargo y avena en hojuelas":        [14, 48,  8, 320],
    "Sándwich de pechuga de pavo con queso cottage":     [32, 36, 10, 360],
    "Hotcakes de avena":                                 [14, 52,  8, 330],
    "Mollete con requesón y pechuga de pavo":            [28, 34, 10, 340],
    "Tostada integral con aguacate y huevo pochado":     [20, 28, 14, 320],
    "Sándwich de pollo a la plancha con jitomate":       [32, 36,  8, 350],
    "Tostadas francesas proteicas con claras de huevo":  [22, 42,  8, 330],
    "Pan integral con mantequilla de almendra y plátano":[14, 48, 14, 375],
    "Wrap integral de pavo, lechuga y mostaza":          [28, 34,  6, 305],
    "Molletes de frijol negro y queso panela":           [22, 44, 10, 360],
    "Bagel integral con salmón ahumado y requesón":      [30, 40, 10, 375],
    "Lentejas guisadas con zanahoria y tomate":          [18, 38,  4, 265],
    "Sopa de lenteja con espinaca y limón":              [16, 36,  4, 245],
    "Frijoles de olla con epazote y tortilla":           [14, 46,  4, 280],
    "Ensalada de garbanzo con pepino y limón":           [14, 38,  8, 285],
    "Hummus casero con verduras crudas":                 [10, 28, 14, 275],
    "Garbanzo salteado con pollo y espinaca":            [34, 36, 10, 375],
    "Chili de frijol negro con res magra":               [30, 40, 10, 375],
    "Lenteja con chorizo de pavo y papa":                [24, 44,  8, 350],
    "Bowl proteico de edamame con arroz y soya":         [22, 48,  8, 355],
    "Habas cocidas con jitomate y cilantro":             [14, 36,  4, 238],
    "Bowl de avena con plátano y crema de cacahuate":    [14, 58, 14, 410],
    "Porridge de avena con manzana y canela":            [10, 52,  6, 300],
    "Avena proteica nocturna con yogur y chía":          [22, 48,  8, 355],
    "Granola casera con nueces y semillas":              [10, 52, 18, 410],
    "Bowl de quinoa con frutas y miel":                  [12, 52,  6, 310],
    "Arroz integral con pollo y verduras":               [34, 48,  8, 400],
    "Tortillas de maíz con frijol y aguacate":           [14, 48, 14, 375],
    "Tamal de rajas con queso y frijol":                 [16, 52, 14, 400],
    "Pasta de trigo con atún y jitomate cherry":         [28, 58, 10, 435],
    "Muesli con leche descremada y frutos rojos":        [12, 52,  8, 330],
    "Ensalada verde con pollo y vinagreta":              [28, 14,  8, 240],
    "Brócoli al vapor con ajo y aceite de oliva":        [ 4, 10,  8, 125],
    "Verduras asadas con queso panela":                  [12, 20, 10, 220],
    "Espinaca salteada con ajo y limón":                 [ 4,  6,  6,  90],
    "Bowl de calabaza con garbanzo y cúrcuma":           [14, 38,  8, 280],
    "Champiñones salteados con cebolla y chile":         [ 4, 10,  6, 105],
    "Pepinos rellenos de atún y aguacate":               [20, 10, 10, 210],
    "Aguacate relleno de pollo con jitomate":            [28, 10, 18, 315],
    "Coliflor al horno con especias y limón":            [ 4, 12,  6, 115],
    "Ensalada de betabel con queso de cabra":            [10, 22, 10, 220],
    "Lomo de cerdo a la plancha con camote":             [34, 36,  8, 355],
    "Costilla de cerdo al horno con brócoli":            [28, 14, 18, 330],
    "Cochinita pibil con arroz y frijoles":              [26, 50, 14, 430],
    "Lomo en salsa de chipotle con papa":                [30, 38, 10, 365],
    "Chuleta de cerdo con ejotes y zanahoria":           [30, 22, 12, 315],
    "Manzana con mantequilla de almendra":               [ 4, 28, 10, 215],
    "Mix de nueces, almendras y arándanos":              [ 8, 22, 20, 295],
    "Jícama con limón y chile en polvo":                 [ 2, 24,  0,  98],
    "Edamame con sal de mar":                            [12, 16,  6, 165],
    "Yogur griego con miel y nuez":                      [18, 30, 10, 280],
    "Queso cottage con piña y chía":                     [20, 22,  4, 205],
    "Galletas de arroz con aguacate":                    [ 4, 24,  8, 185],
    "Celery con mantequilla de cacahuate natural":       [ 6, 10, 14, 185],
    "Barra proteica casera de avena y choco":            [18, 38, 10, 315],
    "Batido de proteína de suero con leche":             [36, 28,  4, 295],
    "Brownie de chocolate negro":                        [ 4, 36, 18, 320],
    "Mug cake proteico de avena y choco":                [18, 34, 10, 295],
    "Mousse de chocolate negro con aquafaba":            [ 6, 28, 12, 240],
    "Helado de plátano con crema de cacahuate":          [ 6, 42, 12, 295],
    "Panqué proteico de plátano y avena":                [16, 48, 10, 345],
    "Galletas de avena con chispas de chocolate":        [ 6, 40, 12, 290],
    "Flan de vainilla con poca azúcar":                  [ 8, 30,  6, 205],
    "Betabel, zanahoria y naranja":                      [ 2, 28,  0, 115],
    "Espinaca, manzana verde, apio y jengibre":          [ 2, 22,  0,  90],
    "Toronja y piña":                                    [ 1, 26,  0, 105],
    "Agua de coco, mango y semillas de chía":            [ 3, 32,  4, 175],
    "Pepino, apio, limón y perejil":                     [ 1, 10,  0,  45],
    "Zanahoria, manzana y cúrcuma":                      [ 1, 24,  0,  98],
    "Arándanos, fresas y agua de hibisco":               [ 1, 20,  0,  82],
    "Naranja, guayaba y kiwi":                           [ 2, 30,  0, 125],
    "Kale, pepino, manzana roja y limón":                [ 2, 18,  0,  75],
    "Plátano, leche de almendra y mantequilla de cacahuate": [10, 42, 14, 330],
    "Naranja, zanahoria y jengibre":                     [ 2, 24,  0,  98],
    "Piña, coco y menta fresca":                         [ 1, 28,  4, 150],
    "Sandía, limón y sal mineral":                       [ 1, 22,  0,  88],
    "Fresa, betabel y leche de avena":                   [ 4, 30,  4, 170],
    "Bowl de frutas tropicales con granola":             [ 8, 58, 10, 355],
    "Ensalada de frutas con miel y chía":                [ 2, 38,  4, 195],
    "Plátano con mantequilla de almendra":               [ 6, 32, 10, 240],
    "Mango con tajín y limón":                           [ 1, 28,  0, 115],
    "Manzana con canela y nuez":                         [ 2, 28, 10, 205],
    "Papaya con limón y jengibre":                       [ 1, 22,  0,  90],
    "Arroz integral salteado con huevo y verduras":      [20, 52,  8, 365],
    "Arroz con leche proteico y canela":                 [16, 58,  6, 350],
    "Sushi casero de salmón y aguacate":                 [22, 48, 12, 385],
    "Arroz frito con pollo, zanahoria y soya":           [30, 56, 10, 430],
    "Bowl de arroz negro con salmón y edamame":          [32, 50, 14, 455],
};

const CATEGORIAS_META = {
    pollo:       { label: "🍗 Pollo" },
    huevo:       { label: "🥚 Huevo" },
    atun:        { label: "🐟 Atún" },
    res:         { label: "🥩 Res" },
    Pescado:     { label: "🐠 Pescado" },
    puerco:      { label: "🐖 Puerco" },
    lacteos:     { label: "🥛 Lácteos" },
    pan:         { label: "🍞 Pan" },
    leguminosas: { label: "🫘 Leguminosas" },
    cereales:    { label: "🌾 Cereales" },
    verduras:    { label: "🥦 Verduras" },
    frutas:      { label: "🍎 Frutas" },
    arroz:       { label: "🍚 Arroz" },
    snacks:      { label: "🥜 Snacks" },
    Jugos:       { label: "🥤 Jugos" },
    postres:     { label: "🍫 Postres" },
};

const DIAS_SEMANA = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const MOMENTOS    = ["Desayuno","Almuerzo","Comida","Cena","Snack"];

function getMacros(titulo) { return MACROS_DB[titulo] || null; }

function macrosBadgesHTML(titulo) {
    const m = getMacros(titulo);
    if (!m) return '';
    return `<div class="macros-mini">
        <span class="macro-badge prot">${m[0]}g P</span>
        <span class="macro-badge carb">${m[1]}g C</span>
        <span class="macro-badge fat">${m[2]}g G</span>
        <span class="macro-badge cal">${m[3]} kcal</span>
    </div>`;
}

/* ---- PLANIFICADOR localStorage ---- */
function cargarPlan() {
    try { return JSON.parse(localStorage.getItem('zentia_plan_comidas') || '{}'); }
    catch(e) { return {}; }
}
function guardarPlan(plan) {
    localStorage.setItem('zentia_plan_comidas', JSON.stringify(plan));
}

/* ---- Modal selector día/momento ---- */
let recetaPendiente = null;

function agregarAlPlan(receta) {
    recetaPendiente = receta;
    const modal = document.getElementById('modal-plan-selector');
    if (modal) {
        document.getElementById('plan-receta-nombre').textContent = receta.titulo;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function cerrarSelectorPlan() {
    const modal = document.getElementById('modal-plan-selector');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
    recetaPendiente = null;
}

function confirmarAgregarAlPlan() {
    const dia     = document.getElementById('plan-select-dia').value;
    const momento = document.getElementById('plan-select-momento').value;
    if (!recetaPendiente || !dia || !momento) return;

    const plan = cargarPlan();
    if (!plan[dia]) plan[dia] = {};
    if (!plan[dia][momento]) plan[dia][momento] = [];

    const yaExiste = plan[dia][momento].some(r => r.titulo === recetaPendiente.titulo);
    if (!yaExiste) {
        plan[dia][momento].push({ titulo: recetaPendiente.titulo, foto: recetaPendiente.foto });
        guardarPlan(plan);
    }
    cerrarSelectorPlan();
    mostrarToast('✅ Añadido a ' + dia + ' — ' + momento);
    if (document.getElementById('pane-planificador') &&
        !document.getElementById('pane-planificador').classList.contains('oculto')) {
        renderPlanificador();
    }
}

function quitarDelPlan(dia, momento, idx) {
    const plan = cargarPlan();
    if (plan[dia] && plan[dia][momento]) {
        plan[dia][momento].splice(idx, 1);
        if (plan[dia][momento].length === 0) delete plan[dia][momento];
        if (Object.keys(plan[dia]).length === 0) delete plan[dia];
        guardarPlan(plan);
        renderPlanificador();
    }
}

/* ---- Toast ---- */
function mostrarToast(msg) {
    let t = document.getElementById('zentia-toast');
    if (!t) { t = document.createElement('div'); t.id = 'zentia-toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('toast-visible');
    setTimeout(() => t.classList.remove('toast-visible'), 2500);
}

/* ---- Render recetas ---- */
let categoriaActiva = '';
let comidaData = null;

function renderCategorias(data) {
    comidaData = data;
    const container = document.getElementById('categorias-tab');
    if (!container) return;

    const keys = Object.keys(data).filter(k =>
        data[k] && data[k].length > 0 && data[k].some(i => i.titulo)
    );

    keys.forEach((key, i) => {
        const meta = CATEGORIAS_META[key] || { label: key };
        const pill = document.createElement('button');
        pill.classList.add('cat-pill', i === 0 ? 'active' : 'inactive');
        pill.textContent = meta.label || key;
        pill.addEventListener('click', () => {
            document.querySelectorAll('.cat-pill').forEach(p => {
                p.classList.remove('active'); p.classList.add('inactive');
            });
            pill.classList.remove('inactive'); pill.classList.add('active');
            categoriaActiva = key;
            renderRecetas(data, key);
        });
        container.appendChild(pill);
    });

    if (keys.length > 0) { categoriaActiva = keys[0]; renderRecetas(data, keys[0]); }
}

function renderRecetas(data, key) {
    const container = document.getElementById('recetas-container');
    if (!container) return;
    container.innerHTML = '';

    (data[key] || []).filter(r => r.titulo).forEach(receta => {
        const card = document.createElement('div');
        card.classList.add('receta-card');
        card.innerHTML = `
            <img src="${receta.foto || ''}" alt="${receta.titulo}"
                 onerror="this.style.display='none'" loading="lazy">
            <div class="receta-info">
                <div class="receta-titulo">${receta.titulo}</div>
                ${macrosBadgesHTML(receta.titulo)}
                <button class="btn-add-plan">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    Añadir a la semana
                </button>
            </div>
        `;
        card.querySelector('img')?.addEventListener('click', () => abrirModal(receta));
        card.querySelector('.receta-titulo').addEventListener('click', () => abrirModal(receta));
        card.querySelector('.btn-add-plan').addEventListener('click', e => {
            e.stopPropagation();
            agregarAlPlan(receta);
        });
        container.appendChild(card);
    });
}

/* ---- Modal macros ---- */
function abrirModal(receta) {
    const modal = document.getElementById('modal-receta');
    if (!modal) return;
    document.getElementById('modal-img').src = receta.foto || '';
    document.getElementById('modal-titulo').textContent = receta.titulo;
    const m = getMacros(receta.titulo);
    document.getElementById('modal-macros').innerHTML = m
        ? `<div class="macro-item"><span class="macro-val">${m[0]}g</span><span class="macro-lbl">Proteína</span></div>
           <div class="macro-item"><span class="macro-val">${m[1]}g</span><span class="macro-lbl">Carbos</span></div>
           <div class="macro-item"><span class="macro-val">${m[2]}g</span><span class="macro-lbl">Grasas</span></div>
           <div class="macro-item"><span class="macro-val">${m[3]}</span><span class="macro-lbl">kcal</span></div>`
        : `<p style="color:var(--gris2);font-size:13px;grid-column:1/-1">Macros no disponibles</p>`;
    document.getElementById('modal-desc').textContent =
        'Valores nutricionales aproximados por porción. Pueden variar según preparación y cantidades.';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    const modal = document.getElementById('modal-receta');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
}

/* ---- Render planificador ---- */
function renderPlanificador() {
    const container = document.getElementById('planificador-container');
    if (!container) return;
    const plan = cargarPlan();
    container.innerHTML = '';

    DIAS_SEMANA.forEach(dia => {
        const seccion = document.createElement('div');
        seccion.classList.add('plan-dia');

        const titulo = document.createElement('div');
        titulo.classList.add('plan-dia-titulo');
        titulo.textContent = dia;
        seccion.appendChild(titulo);

        const momentosDiv = document.createElement('div');
        momentosDiv.classList.add('plan-momentos');

        MOMENTOS.forEach(momento => {
            const col = document.createElement('div');
            col.classList.add('plan-momento-col');

            const momTit = document.createElement('div');
            momTit.classList.add('plan-momento-titulo');
            momTit.textContent = momento;
            col.appendChild(momTit);

            const items = plan[dia] && plan[dia][momento] ? plan[dia][momento] : [];

            if (items.length === 0) {
                const empty = document.createElement('div');
                empty.classList.add('plan-empty');
                empty.textContent = '—';
                col.appendChild(empty);
            } else {
                items.forEach((receta, idx) => {
                    const chip = document.createElement('div');
                    chip.classList.add('plan-chip');
                    chip.innerHTML = `
                        <img src="${receta.foto || ''}" alt="${receta.titulo}" onerror="this.style.display='none'">
                        <span>${receta.titulo}</span>
                        <button class="plan-chip-remove" data-dia="${dia}" data-momento="${momento}" data-idx="${idx}">×</button>
                    `;
                    col.appendChild(chip);
                });
            }
            momentosDiv.appendChild(col);
        });

        seccion.appendChild(momentosDiv);

        // Totales del día
        const tot = calcularTotalesDia(plan[dia] || {});
        if (tot.cal > 0) {
            const totDiv = document.createElement('div');
            totDiv.classList.add('plan-totales');
            totDiv.innerHTML = `
                <span>Total:</span>
                <span class="tot-prot">${tot.prot}g P</span>
                <span class="tot-carb">${tot.carb}g C</span>
                <span class="tot-fat">${tot.fat}g G</span>
                <span class="tot-cal">${tot.cal} kcal</span>
            `;
            seccion.appendChild(totDiv);
        }

        container.appendChild(seccion);
    });

    container.querySelectorAll('.plan-chip-remove').forEach(btn => {
        btn.addEventListener('click', () =>
            quitarDelPlan(btn.dataset.dia, btn.dataset.momento, parseInt(btn.dataset.idx))
        );
    });
}

function calcularTotalesDia(diaObj) {
    let prot = 0, carb = 0, fat = 0, cal = 0;
    Object.values(diaObj).forEach(arr => arr.forEach(r => {
        const m = getMacros(r.titulo);
        if (m) { prot += m[0]; carb += m[1]; fat += m[2]; cal += m[3]; }
    }));
    return { prot, carb, fat, cal };
}

/* ---- Tabs Recetas / Planificador ---- */
window.switchRecetasTab = function(tab) {
    document.querySelectorAll('.rec-tab-btn').forEach(b => {
        b.classList.toggle('active',   b.dataset.tab === tab);
        b.classList.toggle('inactive', b.dataset.tab !== tab);
    });
    document.getElementById('pane-recetas')?.classList.toggle('oculto',      tab !== 'recetas');
    document.getElementById('pane-planificador')?.classList.toggle('oculto', tab !== 'planificador');
    if (tab === 'planificador') renderPlanificador();
};

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal-close-btn')?.addEventListener('click', cerrarModal);
    document.getElementById('modal-receta')?.addEventListener('click', e => {
        if (e.target === e.currentTarget) cerrarModal();
    });
    document.getElementById('modal-plan-close')?.addEventListener('click', cerrarSelectorPlan);
    document.getElementById('modal-plan-selector')?.addEventListener('click', e => {
        if (e.target === e.currentTarget) cerrarSelectorPlan();
    });
    document.getElementById('btn-confirmar-plan')?.addEventListener('click', confirmarAgregarAlPlan);

    fetch('comida.txt')
        .then(r => r.json())
        .then(data => renderCategorias(data))
        .catch(err => console.error('Error cargando comidas:', err));
});
