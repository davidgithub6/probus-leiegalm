<!--
  HeroVisual.svelte — Option C: "De Globe"
  Rotating 3D dot-lattice sphere with the exact Probus serif "P" centered.
  Waits for EB Garamond to load before drawing so the letterform matches the original.
-->
<script>
    import { onMount } from "svelte";

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        const S = 440;
        canvas.width = S * devicePixelRatio;
        canvas.height = S * devicePixelRatio;
        canvas.style.width = S + "px";
        canvas.style.height = S + "px";
        ctx.scale(devicePixelRatio, devicePixelRatio);

        const cx = S / 2,
            cy = S / 2;
        const R = 158; // sphere radius

        // ── Lambert lattice points on sphere ──────────────────
        const points = [];
        const LATS = 14,
            LONS = 22; // denser lattice = more globe-like
        for (let la = 0; la <= LATS; la++) {
            for (let lo = 0; lo < LONS; lo++) {
                const phi = (la / LATS) * Math.PI; // 0 → π  (north to south)
                const theta = (lo / LONS) * Math.PI * 2; // 0 → 2π
                points.push({ phi, theta });
            }
        }

        let t = 0;
        let raf;

        const draw = () => {
            ctx.clearRect(0, 0, S, S);

            // ── 1. Subtle outer reference circle ──────────────────
            ctx.beginPath();
            ctx.arc(cx, cy, R + 16, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(184,146,42,.10)";
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cx, cy, R + 6, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(27,58,92,.08)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // ── 2. Project & sort lattice dots ────────────────────
            const rotY = t * 0.28; // horizontal spin speed

            const projected = points
                .map(({ phi, theta }) => {
                    const rTheta = theta + rotY;
                    const sinPhi = Math.sin(phi);
                    // 3-D coords (Y up)
                    const x3 = sinPhi * Math.cos(rTheta);
                    const y3 = Math.cos(phi);
                    const z3 = sinPhi * Math.sin(rTheta);
                    // Simple orthographic with slight Y compression for depth feel
                    const sx = cx + x3 * R;
                    const sy = cy - y3 * R * 0.92;
                    const depth = (z3 + 1) * 0.5; // 0 = back, 1 = front
                    return { sx, sy, depth, z3 };
                })
                .sort((a, b) => a.depth - b.depth); // paint back-to-front

            for (const { sx, sy, depth } of projected) {
                const dotR = 1.2 + depth * 2.0;

                // Front dots → gold, back dots → navy, fade at very back
                const alpha = 0.06 + depth * 0.42;
                const isFront = depth > 0.55;

                ctx.beginPath();
                ctx.arc(sx, sy, dotR, 0, Math.PI * 2);

                if (isFront) {
                    ctx.fillStyle = `rgba(184,146,42,${alpha.toFixed(2)})`; // gold
                } else {
                    ctx.fillStyle = `rgba(27,58,92,${(alpha * 0.6).toFixed(2)})`; // navy
                }
                ctx.fill();
            }

            // ── 3. Equatorial accent ring ──────────────────────────
            ctx.beginPath();
            ctx.ellipse(cx, cy, R, R * 0.14, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(184,146,42,${0.18 + Math.sin(t * 0.8) * 0.06})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // ── 4. Serif "P" — dominant centrepiece ───────────────
            // The P is drawn navy (large) with a thin gold shadow for lift.
            // Font must be loaded before this point — we wait via document.fonts.ready.
            const pSize = 150;
            const font = `400 ${pSize}px 'EB Garamond', Georgia, serif`;

            ctx.save();
            ctx.font = font;
            ctx.textAlign = "center";
            ctx.textBaseline = "alphabetic";

            // Gold glow behind the letter
            const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
            grd.addColorStop(0, "rgba(248,246,242,0.65)");
            grd.addColorStop(1, "rgba(248,246,242,0)");
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(cx, cy, 90, 0, Math.PI * 2);
            ctx.fill();

            // Letter — navy, solid
            ctx.fillStyle = `rgba(27,58,92,0.94)`;
            ctx.fillText("P", cx, cy + pSize * 0.33);

            ctx.restore();

            // ── 5. Thin gold hairline below the P ─────────────────
            const lineY = cy + pSize * 0.39;
            ctx.beginPath();
            ctx.moveTo(cx - 26, lineY);
            ctx.lineTo(cx + 26, lineY);
            ctx.strokeStyle = "rgba(184,146,42,0.65)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            t += 0.012;
            raf = requestAnimationFrame(draw);
        };

        // Wait for webfont before first draw to ensure correct letterform
        document.fonts.ready.then(() => {
            // Warm up the font in the canvas context
            ctx.font = `400 12px 'EB Garamond', Georgia, serif`;
            ctx.fillText("", 0, 0);
            draw();
        });

        return () => cancelAnimationFrame(raf);
    });
</script>

<canvas bind:this={canvas} class="hero-canvas"></canvas>

<style>
    .hero-canvas {
        display: block;
        max-width: 100%;
        /* Sizes set via JS to handle devicePixelRatio */
    }
</style>
