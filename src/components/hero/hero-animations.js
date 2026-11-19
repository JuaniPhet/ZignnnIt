/* ZignnnIt — animations JS de l'illustration du hero (aucune dépendance).
   Usage : intégrer hero-illustration.svg en ligne (id="zg-hero"), charger hero-animations.css,
   puis appeler initZgHero() une fois le SVG dans le DOM. Retourne une fonction de nettoyage
   (utile dans un useEffect React/Next.js). */
export function initZgHero(root = document) {
    // Accepte le document, un conteneur, ou directement l'élément <svg id="zg-hero">
    const svg = root && root.id === 'zg-hero' ? root : root.querySelector('#zg-hero');
    if (!svg) return () => { };
    const $ = (id) => svg.querySelector('#' + id);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- Horloge à l'heure réelle du visiteur ---------- */
    const hHour = $('clock-hand-hour'), hMin = $('clock-hand-minute'), hSec = $('clock-hand-second');
    const CX = 885, CY = 160;
    const setClock = (smooth) => {
        const d = new Date();
        const s = d.getSeconds() + (smooth ? d.getMilliseconds() / 1000 : 0);
        const m = d.getMinutes() + s / 60;
        const h = (d.getHours() % 12) + m / 60;
        hHour.setAttribute('transform', `rotate(${h * 30} ${CX} ${CY})`);
        hMin.setAttribute('transform', `rotate(${m * 6} ${CX} ${CY})`);
        hSec.setAttribute('transform', `rotate(${s * 6} ${CX} ${CY})`);
    };
    setClock(false);

    /* ---------- Lampe : allumage au chargement ---------- */
    requestAnimationFrame(() => svg.classList.add('zg-on'));

    /* ---------- Éléments de l'écran ---------- */
    const stroke = $('art-circle-stroke'), fill = $('art-circle-fill');
    const pen = $('art-pen'), handles = $('art-handles'), art = $('art-circle');
    const rocket = $('art-rocket');
    const sceneDesign = $('scene-design'), sceneCode = $('scene-code'), wipe = $('screen-wipe');
    const codeLines = [...svg.querySelectorAll('#code-lines .code-line')].map((g) => {
        const segs = [...g.querySelectorAll('rect')].map((r) => ({ el: r, w: +r.dataset.w }));
        return { x: +g.dataset.x, y: +g.dataset.y, segs, total: segs.reduce((a, s) => a + s.w + 9, 0) };
    });
    const cursor = $('code-cursor'), build = $('code-build'), cmd = $('code-cmd');
    const L = stroke.getTotalLength();
    stroke.style.strokeDasharray = `${L}`;

    // Mode réduit : scène design finale, statique ; horloge à la seconde.
    if (reduce) {
        stroke.style.strokeDashoffset = '0';
        fill.style.opacity = '1';
        handles.style.opacity = '0';
        const iv = setInterval(() => setClock(false), 1000);
        return () => clearInterval(iv);
    }

    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    /* ---------- Parallaxe + lampe qui suit la souris (ordinateur uniquement) ---------- */
    const layers = [
        ['layer-clock', 0.35], ['layer-lamp', 0.7], ['layer-monitor', 0.25],
        ['layer-cactus', 0.9], ['layer-right', 0.6],
    ].map(([id, depth]) => ({ el: $(id), depth, x: 0, y: 0 }));
    const lampHead = $('lamp-head');
    const PIVOT = { x: 255, y: 545 }, BASE_ANGLE = 40, MAX_TILT = 14;
    let mx = 0, my = 0, headTarget = 0, head = 0;

    const onMove = (e) => {
        const r = svg.getBoundingClientRect();
        mx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
        my = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
        const a = (Math.atan2(pt.y - PIVOT.y, pt.x - PIVOT.x) * 180) / Math.PI;
        headTarget = Math.max(-MAX_TILT, Math.min(MAX_TILT, a - BASE_ANGLE));
    };
    if (finePointer) window.addEventListener('pointermove', onMove, { passive: true });

    /* ---------- Timeline écran : design → décollage → code → retour ---------- */
    const T = {
        cycle: 14000,
        drawEnd: 1800, fillEnd: 2400,          // la plume trace puis le cercle se remplit
        launch: 4400, launchEnd: 5600,         // la fusée décolle
        wipe1: 5700, wipeDur: 700,             // balayage ambre vers la scène code
        type: 6300, perLine: 360,              // les lignes de code s'écrivent
        build: 10300,                          // terminal : build réussi
        wipe2: 11800,                          // balayage ambre retour à la scène design
        rocketBack: 12300, rocketBackEnd: 13000,
    };
    const setVis = (el, v) => el.setAttribute('visibility', v ? 'visible' : 'hidden');
    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    function wipeAt(c, start) {
        // Retourne la progression du balayage (0→1) ou -1 hors balayage
        if (c < start || c >= start + T.wipeDur) return -1;
        return (c - start) / T.wipeDur;
    }

    function timeline(c, t) {
        // --- Quelle scène est visible ? (bascule au milieu de chaque balayage)
        const mid1 = T.wipe1 + T.wipeDur / 2, mid2 = T.wipe2 + T.wipeDur / 2;
        const codeOn = c >= mid1 && c < mid2;
        setVis(sceneDesign, !codeOn);
        setVis(sceneCode, codeOn);

        // --- Balayage ambre (de gauche à droite)
        const w = Math.max(wipeAt(c, T.wipe1), wipeAt(c, T.wipe2));
        if (w >= 0) {
            setVis(wipe, true);
            const e = ease(w);
            wipe.setAttribute('transform', `translate(${(-820 + e * 1640).toFixed(1)} 0)`);
        } else setVis(wipe, false);

        // --- Scène design : plume et cercle
        let p;
        if (c < T.drawEnd) p = ease(c / T.drawEnd);
        else if (c < mid2) p = 1;
        else p = 0; // de retour sur la scène design : toile vierge, prête à dessiner
        stroke.style.strokeDashoffset = `${L * (1 - p)}`;
        fill.style.opacity = `${c < T.drawEnd || c >= mid2 ? 0 : clamp01((c - T.drawEnd) / (T.fillEnd - T.drawEnd))}`;
        art.style.opacity = '1';
        const pt = stroke.getPointAtLength((L * p) % L);
        pen.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(-20)`);
        handles.style.opacity = `${c < T.drawEnd || c >= mid2 ? 1 : clamp01(1 - (c - T.drawEnd) / 400)}`;

        // --- Fusée : flotte, décolle, revient sur la toile vierge
        const bob = Math.sin(t / 350) * 4;
        let rx = 0, ry = bob, ro = 1;
        if (c >= T.launch && c < T.launchEnd) {
            const k = (c - T.launch) / (T.launchEnd - T.launch), e = k * k * k;
            rx = e * 440; ry = -e * 210 + bob;
        } else if (c >= T.launchEnd && c < T.rocketBack) {
            ro = 0;
        } else if (c >= T.rocketBack && c < T.rocketBackEnd) {
            const k = (c - T.rocketBack) / (T.rocketBackEnd - T.rocketBack);
            rx = -60 * (1 - k); ry = 40 * (1 - k) + bob; ro = k;
        }
        rocket.setAttribute('transform', `translate(${(885 + rx).toFixed(1)} ${(790 + ry).toFixed(1)}) rotate(-25)`);
        rocket.style.opacity = `${ro}`;

        // --- Scène code : lignes qui s'écrivent, curseur, terminal
        if (codeOn) {
            const typed = Math.max(0, c - T.type);
            let cx = codeLines[0].x, cy = codeLines[0].y;
            codeLines.forEach((line, i) => {
                const k = clamp01((typed - i * T.perLine) / T.perLine);
                let budget = k * line.total, x = line.x;
                for (const sg of line.segs) {
                    const w = Math.max(0, Math.min(sg.w, budget));
                    sg.el.setAttribute('width', w.toFixed(1));
                    sg.el.style.opacity = w > 0.5 ? '1' : '0';
                    budget -= sg.w + 9;
                    if (w > 0) x = +sg.el.getAttribute('x') + w;
                }
                if (k > 0) { cx = k < 1 || line.segs.length ? x + 3 : line.x; cy = line.y; }
            });
            const doneTyping = typed >= codeLines.length * T.perLine;
            cursor.setAttribute('x', cx.toFixed(1));
            cursor.setAttribute('y', (cy - 3).toFixed(1));
            cursor.style.opacity = doneTyping ? (Math.floor(t / 450) % 2 ? '0' : '1') : '1';
            cmd.style.opacity = c >= T.build - 600 ? '.8' : '0';
            build.style.opacity = `${clamp01((c - T.build) / 400)}`;
        }
    }

    /* ---------- Boucle d'animation ---------- */
    const t0 = performance.now();
    let raf = null, visible = true;

    const frame = (now) => {
        const t = now - t0;
        setClock(true);

        // Timeline unique de 14 s : on dessine → la fusée décolle → l'écran passe au code → retour
        const c = t % T.cycle;
        timeline(c, t);

        // Parallaxe et tête de lampe (lissées)
        if (finePointer) {
            for (const l of layers) {
                l.x += (mx * l.depth * 14 - l.x) * 0.08;
                l.y += (my * l.depth * 9 - l.y) * 0.08;
                l.el.setAttribute('transform', `translate(${l.x.toFixed(2)} ${l.y.toFixed(2)})`);
            }
            head += (headTarget - head) * 0.08;
            lampHead.setAttribute('transform', `rotate(${head.toFixed(2)} ${PIVOT.x} ${PIVOT.y})`);
        }

        raf = visible ? requestAnimationFrame(frame) : null;
    };
    raf = requestAnimationFrame(frame);

    // Pause quand l'illustration sort de l'écran (économie de batterie)
    const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(svg);

    return () => {
        if (raf) cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('pointermove', onMove);
    };
}
