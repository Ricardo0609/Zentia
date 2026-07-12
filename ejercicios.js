/* ========================================
   ZENTIA — ejercicios.js
   ======================================== */

const RUTINA_SEMANA = {
    Lunes:     ["pechoSuperior","pechoMedio","pechoInferior","hombroFrontal","hombroLateral","hombroPosterior","tricepLarga","tricepLateral","tricepMedial"],
    Martes:    ["dorsales","espaldaMedia","espaldaAlta","lumbar","bicepLarga","bicepCorta","braquial","antebrazoFlexores","antebrazoExtensores","agarre"],
    Miercoles: ["hombroFrontal","hombroLateral","hombroPosterior","pantorrillaGastrocnemio","pantorrillaSoleo","cuadriceps","femorales","gluteoMayor","gluteoMedio"],
    Jueves:    ["pechoSuperior","pechoMedio","pechoInferior","bicepLarga","bicepCorta","braquial","tricepLarga","tricepLateral","tricepMedial"],
    Viernes:   ["dorsales","espaldaMedia","espaldaAlta","lumbar","pantorrillaGastrocnemio","pantorrillaSoleo","cuadriceps","femorales"],
    Sabado:    null,
    Domingo:   null
};

const NOMBRES_GRUPOS = {
    pechoSuperior: "Pecho Superior",
    pechoMedio: "Pecho Medio",
    pechoInferior: "Pecho Inferior",
    dorsales: "Dorsales",
    espaldaMedia: "Espalda Media",
    espaldaAlta: "Espalda Alta",
    lumbar: "Lumbar",
    hombroFrontal: "Hombro Frontal",
    hombroLateral: "Hombro Lateral",
    hombroPosterior: "Hombro Posterior",
    bicepLarga: "Bícep (Cabeza Larga)",
    bicepCorta: "Bícep (Cabeza Corta)",
    braquial: "Braquial",
    tricepLarga: "Trícep (Cabeza Larga)",
    tricepLateral: "Trícep (Cabeza Lateral)",
    tricepMedial: "Trícep (Cabeza Medial)",
    antebrazoFlexores: "Antebrazo Flexores",
    antebrazoExtensores: "Antebrazo Extensores",
    agarre: "Agarre",
    abdomenSuperior: "Abdomen Superior",
    abdomenInferior: "Abdomen Inferior",
    oblicuos: "Oblicuos",
    coreProfundo: "Core Profundo",
    cuadriceps: "Cuádriceps",
    femorales: "Femorales",
    gluteoMayor: "Glúteo Mayor",
    gluteoMedio: "Glúteo Medio",
    Abductores: "Abductores",
    pantorrillaGastrocnemio: "Pantorrilla (Gastrocnemio)",
    pantorrillaSoleo: "Pantorrilla (Sóleo)",
    trapecioSuperior: "Trapecio Superior",
    trapecioMedio: "Trapecio Medio",
    cuello: "Cuello"
};

const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='48' viewBox='0 0 52 48'%3E%3Crect fill='%235B6B86' width='52' height='48' rx='8'/%3E%3Cpath fill='%23A8B3C4' d='M16 32v-8l6-6 6 6 6-8 8 16H16zm6-14a4 4 0 100-8 4 4 0 000 8z'/%3E%3C/svg%3E";

function elegirAleatorio(lista) {
    if (!lista || lista.length === 0) return null;
    return lista[Math.floor(Math.random() * lista.length)];
}

function generarRutina(data) {
    const rutina = {};
    for (const dia in RUTINA_SEMANA) {
        const grupos = RUTINA_SEMANA[dia];
        if (!grupos) { rutina[dia] = null; continue; }
        rutina[dia] = {};
        grupos.forEach(grupo => {
            if (data[grupo] && data[grupo].length > 0) {
                rutina[dia][grupo] = elegirAleatorio(data[grupo]);
            }
        });
    }
    return rutina;
}

function guardarRutina(rutina) {
    localStorage.setItem('zentia_rutina', JSON.stringify(rutina));
    localStorage.setItem('zentia_rutina_fecha', Date.now().toString());
}

function cargarOGenerarRutina(data) {
    const guardada = localStorage.getItem('zentia_rutina');
    if (guardada) {
        try { return JSON.parse(guardada); } catch(e) {}
    }
    const nueva = generarRutina(data);
    guardarRutina(nueva);
    return nueva;
}

function getDiaActual() {
    const dias = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    return dias[new Date().getDay()];
}

function diasParaCambio() {
    const saved = localStorage.getItem('zentia_rutina_fecha');
    if (!saved) return 0;
    const diasPasados = Math.floor((Date.now() - parseInt(saved)) / 86400000);
    return Math.max(0, 5 - diasPasados);
}

// ========================================
//  INDEX — Lista de días
// ========================================
function renderDias(rutina) {
    const container = document.getElementById('dias-container');
    if (!container) return;

    const diaHoy = getDiaActual();

    Object.keys(RUTINA_SEMANA).forEach(dia => {
        // FIX: usar RUTINA_SEMANA como fuente de verdad, no rutina[dia]
        const esDescanso = !RUTINA_SEMANA[dia];
        const esHoy = dia === diaHoy;

        const el = document.createElement('a');
        el.href = `mirutina.html?dia=${encodeURIComponent(dia)}`;
        el.classList.add('dia-item', esHoy ? 'hoy' : (esDescanso ? 'descanso' : 'otro'));

        const nombre = document.createElement('span');
        nombre.classList.add('dia-nombre');
        nombre.textContent = dia;
        el.appendChild(nombre);

        if (esDescanso) {
            const txt = document.createElement('span');
            txt.classList.add('dia-grupos');
            txt.textContent = '💤 Descanso';
            el.appendChild(txt);
        } else {
            // FIX: siempre leer de RUTINA_SEMANA (nunca null aquí)
            const grupos = RUTINA_SEMANA[dia];
            const gruposUnicos = [...new Set(grupos.map(g => {
                return (NOMBRES_GRUPOS[g] || g).split(' ')[0];
            }))];

            const gruposTxt = document.createElement('span');
            gruposTxt.classList.add('dia-grupos');
            gruposTxt.textContent = gruposUnicos.slice(0, 5).join(' · ');
            el.appendChild(gruposTxt);

            const arrow = document.createElement('span');
            arrow.classList.add('dia-icon');
            arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="rgba(255,255,255,.7)"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>`;
            el.appendChild(arrow);
        }

        container.appendChild(el);
    });

    const countdown = document.getElementById('countdown-display');
    if (countdown) countdown.textContent = `${diasParaCambio()} días`;
}

// ========================================
//  MIRUTINA — Detalle del día
// ========================================
function renderDiaDetalle(data, rutina) {
    const container = document.getElementById('ejercicios-dia-container');
    const tituloEl  = document.getElementById('dia-titulo');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const dia = params.get('dia') || getDiaActual();

    if (tituloEl) tituloEl.textContent = dia;

    // FIX: verificar contra RUTINA_SEMANA, no rutina[dia]
    if (!RUTINA_SEMANA[dia]) {
        container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--gris3);font-family:var(--Gabarito);font-size:20px;">💤 Día de descanso.<br>El cuerpo también necesita recuperarse.</div>`;
        const countdown = document.getElementById('countdown-display');
        if (countdown) countdown.textContent = `${diasParaCambio()} días`;
        return;
    }

    // FIX: si rutina[dia] no existe o es null por algún motivo, regenerar ese día
    const ejerciciosDia = rutina[dia] || generarRutina(data)[dia] || {};

    RUTINA_SEMANA[dia].forEach(grupo => {
        const ej = ejerciciosDia[grupo];
        if (!ej) return;

        const card = document.createElement('div');
        card.classList.add('grupo-card');

        const header = document.createElement('div');
        header.classList.add('grupo-header');
        header.innerHTML = `<span class="grupo-nombre">${NOMBRES_GRUPOS[grupo] || grupo}</span>`;
        card.appendChild(header);

        const lista = document.createElement('div');
        lista.classList.add('grupo-lista');

        const item = document.createElement('div');
        item.classList.add('ejercicio-item');

        const img = document.createElement('img');
        img.src = ej.foto || PLACEHOLDER_IMG;
        img.alt = ej.titulo;
        img.onerror = () => { img.src = PLACEHOLDER_IMG; };

        const txt = document.createElement('span');
        txt.textContent = ej.titulo;

        const check = document.createElement('div');
        check.classList.add('check-icon');
        check.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="white"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;

        item.appendChild(img);
        item.appendChild(txt);
        item.appendChild(check);
        item.addEventListener('click', () => item.classList.toggle('completado'));

        lista.appendChild(item);
        card.appendChild(lista);
        container.appendChild(card);
    });

    const countdown = document.getElementById('countdown-display');
    if (countdown) countdown.textContent = `${diasParaCambio()} días`;
}

// ========================================
//  EJERCICIOS — Grid de músculos
// ========================================
const MUSCULOS_CONFIG = [
    { key: 'pechoSuperior',          label: 'Pecho Superior',   img: 'Imagenes/pechosuperior.png', href: 'pecho.html' },
    { key: 'pechoMedio',             label: 'Pecho Medio',      img: 'Imagenes/pecho.png',         href: 'pecho.html' },
    { key: 'pechoInferior',          label: 'Pecho Inferior',   img: 'Imagenes/pecho.png',         href: 'pecho.html' },
    { key: 'dorsales',               label: 'Dorsales',         img: 'Imagenes/espalda4.png',      href: 'dorsales.html' },
    { key: 'espaldaMedia',           label: 'Espalda Media',    img: 'Imagenes/espalda2.png',      href: 'espaldamedia.html' },
    { key: 'espaldaAlta',            label: 'Espalda Alta',     img: 'Imagenes/espalda3.png',      href: 'espaldaAlta.html' },
    { key: 'lumbar',                 label: 'Lumbar',           img: 'Imagenes/espalda.png',       href: 'lumbar.html' },
    { key: 'hombroFrontal',          label: 'Hombro Frontal',   img: 'Imagenes/hombro.png',        href: 'hombro.html' },
    { key: 'hombroLateral',          label: 'Hombro Lateral',   img: 'Imagenes/hombro.png',        href: 'hombro.html' },
    { key: 'hombroPosterior',        label: 'Hombro Post.',     img: 'Imagenes/hombro.png',        href: 'hombro.html' },
    { key: 'bicepLarga',             label: 'Bícep Larga',      img: 'Imagenes/bicep.png',         href: 'bicep.html' },
    { key: 'bicepCorta',             label: 'Bícep Corta',      img: 'Imagenes/bicep.png',         href: 'bicep.html' },
    { key: 'braquial',               label: 'Braquial',         img: 'Imagenes/bicep.png',         href: 'bicep.html' },
    { key: 'tricepLarga',            label: 'Trícep Larga',     img: 'Imagenes/tricep.png',        href: 'tricep.html' },
    { key: 'tricepLateral',          label: 'Trícep Lateral',   img: 'Imagenes/tricep.png',        href: 'tricep.html' },
    { key: 'tricepMedial',           label: 'Trícep Medial',    img: 'Imagenes/tricep.png',        href: 'tricep.html' },
    { key: 'antebrazoFlexores',      label: 'Antebrazo Flex.',  img: 'Imagenes/antebrazo.png',     href: 'antebrazo.html' },
    { key: 'antebrazoExtensores',    label: 'Antebrazo Ext.',   img: 'Imagenes/antebrazo.png',     href: 'antebrazo.html' },
    { key: 'agarre',                 label: 'Agarre',           img: 'Imagenes/agarre.png',        href: 'antebrazo.html' },
    { key: 'abdomenSuperior',        label: 'Abdomen Sup.',     img: 'Imagenes/abdomen.png',       href: 'abdomen.html' },
    { key: 'abdomenInferior',        label: 'Abdomen Inf.',     img: 'Imagenes/abdomen.png',       href: 'abdomen.html' },
    { key: 'oblicuos',               label: 'Oblicuos',         img: 'Imagenes/abdomen.png',       href: 'abdomen.html' },
    { key: 'coreProfundo',           label: 'Core Profundo',    img: 'Imagenes/abdomen.png',       href: 'abdomen.html' },
    { key: 'cuadriceps',             label: 'Cuádriceps',       img: 'Imagenes/cuad.png',          href: 'piernas.html' },
    { key: 'femorales',              label: 'Femorales',        img: 'Imagenes/femoral.png',       href: 'piernas.html' },
    { key: 'gluteoMayor',            label: 'Glúteo Mayor',     img: 'Imagenes/gluteo.png',        href: 'piernas.html' },
    { key: 'gluteoMedio',            label: 'Glúteo Medio',     img: 'Imagenes/gluteo.png',        href: 'piernas.html' },
    { key: 'Abductores',             label: 'Abductores',       img: 'Imagenes/gluteo.png',        href: 'piernas.html' },
    { key: 'pantorrillaGastrocnemio',label: 'Pantorrilla G.',   img: 'Imagenes/pantorrilla.png',   href: 'pantorrilla.html' },
    { key: 'pantorrillaSoleo',       label: 'Pantorrilla S.',   img: 'Imagenes/pantorrilla.png',   href: 'pantorrilla.html' },
    { key: 'trapecioSuperior',       label: 'Trapecio Sup.',    img: 'Imagenes/trapecio.png',      href: 'trapecio.html' },
    { key: 'trapecioMedio',          label: 'Trapecio Medio',   img: 'Imagenes/trapecio.png',      href: 'trapecio.html' },
    { key: 'cuello',                 label: 'Cuello',           img: 'https://static.vecteezy.com/system/resources/previews/010/221/471/non_2x/neck-human-body-line-icon-illustration-vector.jpg', href: 'cuello.html' },
];

function renderMusculosGrid(data) {
    const container = document.getElementById('musculos-container');
    if (!container) return;

    MUSCULOS_CONFIG.forEach(m => {
        if (!data[m.key]) return;
        const card = document.createElement('a');
        card.href = `${m.href}?grupo=${encodeURIComponent(m.key)}`;
        card.classList.add('musculo-card');

        const img = document.createElement('img');
        img.src = m.img;
        img.alt = m.label;
        img.onerror = () => { img.src = PLACEHOLDER_IMG; };

        const lbl = document.createElement('span');
        lbl.textContent = m.label;

        card.appendChild(img);
        card.appendChild(lbl);
        container.appendChild(card);
    });
}

// ========================================
//  GRUPO INDIVIDUAL (espaldaAlta.html etc.)
// ========================================
function renderGrupoIndividual(data) {
    const params = new URLSearchParams(window.location.search);
    let grupoKey = params.get('grupo');

    if (!grupoKey) {
        const idsMapeados = { espAlt: 'espaldaAlta', espMed: 'espaldaMedia', cuello: 'cuello', dorsales: 'dorsales', lumbar: 'lumbar' };
        for (const id in idsMapeados) {
            if (document.getElementById(id)) { grupoKey = idsMapeados[id]; break; }
        }
    }

    if (!grupoKey || !data[grupoKey]) return;

    const contenedores = { espaldaAlta: 'espAlt', espaldaMedia: 'espMed', cuello: 'cuello', dorsales: 'dorsales', lumbar: 'lumbar' };
    const containerId = contenedores[grupoKey] || grupoKey;
    const container = document.getElementById(containerId);
    if (!container) return;

    data[grupoKey].forEach(ej => {
        const item = document.createElement('div');
        item.classList.add('ejercicio-item');

        const img = document.createElement('img');
        img.src = ej.foto || PLACEHOLDER_IMG;
        img.alt = ej.titulo;
        img.onerror = () => { img.src = PLACEHOLDER_IMG; };

        const txt = document.createElement('span');
        txt.classList.add('texto2');
        txt.textContent = ej.titulo;

        item.appendChild(img);
        item.appendChild(txt);
        item.addEventListener('click', () => item.classList.toggle('completado'));
        container.appendChild(item);
    });
}

// ========================================
//  REGENERAR RUTINA
// ========================================
window.regenerarRutina = function() {
    localStorage.removeItem('zentia_rutina');
    localStorage.removeItem('zentia_rutina_fecha');
    location.reload();
};

// ========================================
//  INIT
// ========================================
fetch('ejercicios.txt')
    .then(r => r.json())
    .then(data => {
        const rutina = cargarOGenerarRutina(data);
        if (document.getElementById('dias-container'))          renderDias(rutina);
        if (document.getElementById('ejercicios-dia-container')) renderDiaDetalle(data, rutina);
        if (document.getElementById('musculos-container'))      renderMusculosGrid(data);
        renderGrupoIndividual(data);
    })
    .catch(err => console.error('Error cargando ejercicios:', err));
