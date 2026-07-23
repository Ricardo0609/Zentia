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
    pechoSuperior:           "Pecho Superior",
    pechoMedio:              "Pecho Medio",
    pechoInferior:           "Pecho Inferior",
    dorsales:                "Dorsales",
    espaldaMedia:            "Espalda Media",
    espaldaAlta:             "Espalda Alta",
    lumbar:                  "Lumbar",
    hombroFrontal:           "Hombro Frontal",
    hombroLateral:           "Hombro Lateral",
    hombroPosterior:         "Hombro Posterior",
    bicepLarga:              "Bícep (Cabeza Larga)",
    bicepCorta:              "Bícep (Cabeza Corta)",
    braquial:                "Braquial",
    tricepLarga:             "Trícep (Cabeza Larga)",
    tricepLateral:           "Trícep (Cabeza Lateral)",
    tricepMedial:            "Trícep (Cabeza Medial)",
    antebrazoFlexores:       "Antebrazo — Flexores",
    antebrazoExtensores:     "Antebrazo — Extensores",
    agarre:                  "Agarre",
    abdomenSuperior:         "Abdomen Superior",
    abdomenInferior:         "Abdomen Inferior",
    oblicuos:                "Oblicuos",
    coreProfundo:            "Core Profundo",
    cuadriceps:              "Cuádriceps",
    femorales:               "Femorales",
    gluteoMayor:             "Glúteo Mayor",
    gluteoMedio:             "Glúteo Medio",
    Abductores:              "Abductores",
    pantorrillaGastrocnemio: "Pantorrilla — Gastrocnemio",
    pantorrillaSoleo:        "Pantorrilla — Sóleo",
    trapecioSuperior:        "Trapecio Superior",
    trapecioMedio:           "Trapecio Medio",
    cuello:                  "Cuello"
};

// Agrupar músculos por zona corporal para los acordeones
const ZONAS = [
    { zona: "💪 Pecho",        grupos: ["pechoSuperior","pechoMedio","pechoInferior"] },
    { zona: "🔙 Espalda",      grupos: ["dorsales","espaldaMedia","espaldaAlta","lumbar"] },
    { zona: "🔝 Hombros",      grupos: ["hombroFrontal","hombroLateral","hombroPosterior"] },
    { zona: "💪 Bíceps",       grupos: ["bicepLarga","bicepCorta","braquial"] },
    { zona: "💪 Tríceps",      grupos: ["tricepLarga","tricepLateral","tricepMedial"] },
    { zona: "🤜 Antebrazo",    grupos: ["antebrazoFlexores","antebrazoExtensores","agarre"] },
    { zona: "🧱 Abdomen/Core", grupos: ["abdomenSuperior","abdomenInferior","oblicuos","coreProfundo"] },
    { zona: "🦵 Piernas",      grupos: ["cuadriceps","femorales","gluteoMayor","gluteoMedio","Abductores"] },
    { zona: "🦶 Pantorrilla",  grupos: ["pantorrillaGastrocnemio","pantorrillaSoleo"] },
    { zona: "🏔 Trapecio/Cuello", grupos: ["trapecioSuperior","trapecioMedio","cuello"] },
];

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%235B6B86' width='40' height='40' rx='6'/%3E%3C/svg%3E";

/* ── RUTINA ── */
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
        grupos.forEach(g => {
            if (data[g] && data[g].length > 0)
                rutina[dia][g] = elegirAleatorio(data[g]);
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
    const fecha    = localStorage.getItem('zentia_rutina_fecha');
    const diasPasados = fecha
        ? Math.floor((Date.now() - parseInt(fecha)) / 86400000)
        : 999;
    if (guardada && diasPasados < 60) {
        try { return JSON.parse(guardada); } catch(e) {}
    }
    const nueva = generarRutina(data);
    guardarRutina(nueva);
    return nueva;
}

function getDiaActual() {
    return ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"][new Date().getDay()];
}

function diasParaCambio() {
    const saved = localStorage.getItem('zentia_rutina_fecha');
    if (!saved) return 60;
    return Math.max(0, 60 - Math.floor((Date.now() - parseInt(saved)) / 86400000));
}

function actualizarCountdown() {
    document.querySelectorAll('#countdown-display').forEach(el => {
        el.textContent = diasParaCambio() + ' días';
    });
}

window.regenerarRutina = function() {
    localStorage.removeItem('zentia_rutina');
    localStorage.removeItem('zentia_rutina_fecha');
    location.reload();
};

/* ── INDEX: Lista de días ── */
function renderDias(rutina) {
    const container = document.getElementById('dias-container');
    if (!container) return;

    const diaHoy = getDiaActual();

    Object.keys(RUTINA_SEMANA).forEach(dia => {
        const esDescanso = !RUTINA_SEMANA[dia];
        const esHoy = dia === diaHoy;

        const el = document.createElement('a');
        el.href = 'mirutina.html?dia=' + encodeURIComponent(dia);
        el.classList.add('dia-item', esHoy ? 'hoy' : esDescanso ? 'descanso' : 'otro');

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
            const gruposUnicos = [...new Set(
                RUTINA_SEMANA[dia].map(g => (NOMBRES_GRUPOS[g] || g).split(' ')[0])
            )];
            const txt = document.createElement('span');
            txt.classList.add('dia-grupos');
            txt.textContent = gruposUnicos.slice(0, 5).join(' · ');
            el.appendChild(txt);

            const arrow = document.createElement('span');
            arrow.classList.add('dia-icon');
            arrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="rgba(255,255,255,.7)"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>';
            el.appendChild(arrow);
        }

        container.appendChild(el);
    });

    actualizarCountdown();
}

/* ── MIRUTINA: Detalle del día ── */
function renderDiaDetalle(data, rutina) {
    const container = document.getElementById('ejercicios-dia-container');
    const tituloEl  = document.getElementById('dia-titulo');
    if (!container) return;

    const dia = new URLSearchParams(window.location.search).get('dia') || getDiaActual();
    if (tituloEl) tituloEl.textContent = dia;

    if (!RUTINA_SEMANA[dia]) {
        container.innerHTML = '<div class="descanso-msg">💤 Día de descanso.<br>El cuerpo también necesita recuperarse.</div>';
        actualizarCountdown();
        return;
    }

    const ejerciciosDia = rutina[dia] || {};

    RUTINA_SEMANA[dia].forEach(grupo => {
        const ej = ejerciciosDia[grupo];
        if (!ej) return;

        const card = document.createElement('div');
        card.classList.add('grupo-card');

        const header = document.createElement('div');
        header.classList.add('grupo-header');
        header.innerHTML = '<span class="grupo-nombre">' + (NOMBRES_GRUPOS[grupo] || grupo) + '</span>';
        card.appendChild(header);

        const lista = document.createElement('div');
        lista.classList.add('grupo-lista');

        const item = crearEjercicioItem(ej);
        lista.appendChild(item);
        card.appendChild(lista);
        container.appendChild(card);
    });

    actualizarCountdown();
}

function crearEjercicioItem(ej) {
    const item = document.createElement('div');
    item.classList.add('ejercicio-item');

    const img = document.createElement('img');
    img.src = ej.foto || PLACEHOLDER;
    img.alt = ej.titulo;
    img.onerror = () => { img.src = PLACEHOLDER; };

    const txt = document.createElement('span');
    txt.textContent = ej.titulo;

    const check = document.createElement('div');
    check.classList.add('check-icon');
    check.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="white"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';

    item.appendChild(img);
    item.appendChild(txt);
    item.appendChild(check);
    item.addEventListener('click', () => item.classList.toggle('completado'));
    return item;
}

/* ── ACORDEONES DE EJERCICIOS ── */
function renderAcordeones(data) {
    const container = document.getElementById('acordeones-container');
    if (!container) return;

    ZONAS.forEach(({ zona, grupos }) => {
        // Acordeón de zona
        const acord = document.createElement('div');
        acord.classList.add('acord-zona');

        const btn = document.createElement('button');
        btn.classList.add('acord-zona-btn');
        btn.innerHTML =
            '<span class="acord-zona-label">' + zona + '</span>' +
            '<svg class="acord-chevron" xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>';

        const body = document.createElement('div');
        body.classList.add('acord-zona-body', 'acord-cerrado');

        btn.addEventListener('click', () => {
            const abierto = !body.classList.contains('acord-cerrado');
            body.classList.toggle('acord-cerrado', abierto);
            btn.classList.toggle('acord-abierto', !abierto);
        });

        // Sub-acordeones por músculo
        grupos.forEach(grupoKey => {
            if (!data[grupoKey] || data[grupoKey].length === 0) return;

            const sub = document.createElement('div');
            sub.classList.add('acord-musculo');

            const subBtn = document.createElement('button');
            subBtn.classList.add('acord-musculo-btn');
            subBtn.innerHTML =
                '<span>' + (NOMBRES_GRUPOS[grupoKey] || grupoKey) + '</span>' +
                '<span class="acord-count">' + data[grupoKey].length + ' ejercicios</span>';

            const subBody = document.createElement('div');
            subBody.classList.add('acord-musculo-body', 'acord-cerrado');

            subBtn.addEventListener('click', () => {
                const abierto = !subBody.classList.contains('acord-cerrado');
                subBody.classList.toggle('acord-cerrado', abierto);
                subBtn.classList.toggle('acord-sub-abierto', !abierto);

                // Lazy render: solo renderizar cuando se abre por primera vez
                if (!abierto && subBody.childElementCount === 0) {
                    data[grupoKey].forEach(ej => {
                        const row = document.createElement('div');
                        row.classList.add('ej-row');

                        const img = document.createElement('img');
                        img.src = ej.foto || PLACEHOLDER;
                        img.alt = ej.titulo;
                        img.onerror = () => { img.src = PLACEHOLDER; };
                        img.classList.add('ej-row-img');

                        const nombre = document.createElement('span');
                        nombre.classList.add('ej-row-nombre');
                        nombre.textContent = ej.titulo;

                        row.appendChild(img);
                        row.appendChild(nombre);
                        subBody.appendChild(row);
                    });
                }
            });

            sub.appendChild(subBtn);
            sub.appendChild(subBody);
            body.appendChild(sub);
        });

        acord.appendChild(btn);
        acord.appendChild(body);
        container.appendChild(acord);
    });
}

/* ── INIT ── */
fetch('ejercicios.txt')
    .then(r => r.json())
    .then(data => {
        const rutina = cargarOGenerarRutina(data);
        if (document.getElementById('dias-container'))           renderDias(rutina);
        if (document.getElementById('ejercicios-dia-container')) renderDiaDetalle(data, rutina);
        if (document.getElementById('acordeones-container'))     renderAcordeones(data);
    })
    .catch(err => console.error('Error cargando ejercicios:', err));
