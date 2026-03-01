<!--
  HeroVisual.svelte — Abstract animated interpretation of the Probus logo.
  Motifs: rotating gear ring, pulsing globe meridians/parallels, golden "P" fade, inner orb.
  100% canvas — no external assets.
-->
<script>
    import { onMount } from "svelte";

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        const S = 440;
        canvas.width = S;
        canvas.height = S;

        const navy = { r: 27, g: 58, b: 92 }; // #1b3a5c
        const gold = { r: 184, g: 146, b: 42 }; // #b8922a

        const nc = (a) => `rgba(${navy.r},${navy.g},${navy.b},${a})`;
        const gc = (a) => `rgba(${gold.r},${gold.g},${gold.b},${a})`;

        const cx = S / 2,
            cy = S / 2;
        const OR = 180; // outer radius
        const IR = 138; // inner navy circle radius
        const TEETH = 24;

        let t = 0;

        const draw = () => {
            ctx.clearRect(0, 0, S, S);

            // ── 1. Outer gold disc background ──────────────────────────
            ctx.beginPath();
            ctx.arc(cx, cy, OR, 0, Math.PI * 2);
            ctx.fillStyle = gc(0.12);
            ctx.fill();

            // ── 2. Gear teeth (24 teeth, animated rotation) ─────────────
            const gearAngle = t * 0.18; // slow rotation
            for (let i = 0; i < TEETH; i++) {
                const isBanner = i >= 19 && i <= 23;
                const base =
                    gearAngle + (i / TEETH) * Math.PI * 2 - Math.PI / 2;
                const half = (Math.PI / TEETH) * 0.65;

                // Tooth outer arc segment
                ctx.beginPath();
                ctx.arc(cx, cy, OR, base - half, base + half);
                ctx.arc(cx, cy, OR - 18, base + half, base - half, true);
                ctx.closePath();
                ctx.fillStyle = isBanner ? nc(0.85) : gc(0.75);
                ctx.fill();

                // Notch inset (navy on gold teeth only)
                if (!isBanner) {
                    ctx.beginPath();
                    ctx.arc(
                        cx,
                        cy,
                        OR - 4,
                        base - half * 0.6,
                        base + half * 0.6,
                    );
                    ctx.arc(
                        cx,
                        cy,
                        OR - 14,
                        base + half * 0.6,
                        base - half * 0.6,
                        true,
                    );
                    ctx.closePath();
                    ctx.fillStyle = nc(0.55);
                    ctx.fill();
                }
            }

            // Gear outer ring stroke
            ctx.beginPath();
            ctx.arc(cx, cy, OR, 0, Math.PI * 2);
            ctx.strokeStyle = gc(0.4);
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // ── 3. Inner navy circle ─────────────────────────────────────
            ctx.beginPath();
            ctx.arc(cx, cy, IR, 0, Math.PI * 2);
            ctx.fillStyle = nc(0.92);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx, cy, IR, 0, Math.PI * 2);
            ctx.strokeStyle = gc(0.5);
            ctx.lineWidth = 2;
            ctx.stroke();

            // ── 4. Globe — meridians (slowly counter-rotate) ────────────
            const globeAngle = -t * 0.09;
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, IR - 2, 0, Math.PI * 2);
            ctx.clip();

            const pulse = 1 + Math.sin(t * 0.7) * 0.04;

            // Equator
            ctx.beginPath();
            ctx.ellipse(cx, cy, (IR - 4) * pulse, 8, 0, 0, Math.PI * 2);
            ctx.strokeStyle = gc(0.25);
            ctx.lineWidth = 1;
            ctx.stroke();

            // Parallels
            for (const yOff of [-38, -20, 20, 38]) {
                const ry = 6 + Math.abs(yOff) * 0.15;
                ctx.beginPath();
                ctx.ellipse(
                    cx,
                    cy + yOff,
                    (IR - 4 - Math.abs(yOff) * 0.4) * pulse,
                    ry,
                    0,
                    0,
                    Math.PI * 2,
                );
                ctx.strokeStyle = gc(0.18);
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Meridians (rotated)
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(globeAngle);
            for (let m = 0; m < 5; m++) {
                ctx.save();
                ctx.rotate((m / 5) * Math.PI);
                ctx.beginPath();
                ctx.ellipse(0, 0, 28, IR - 4, 0, 0, Math.PI * 2);
                ctx.strokeStyle = gc(0.18);
                ctx.lineWidth = 0.8;
                ctx.stroke();
                ctx.restore();
            }
            ctx.restore();
            ctx.restore();

            // ── 5. "PROBUS" banner arc at bottom (navy arc bg) ──────────
            const bannerStart = Math.PI * 0.75 + gearAngle; // rotates with gear
            const bannerEnd = Math.PI * 2.25 + gearAngle;

            ctx.beginPath();
            ctx.arc(
                cx,
                cy,
                IR,
                Math.PI * 0.78 + gearAngle,
                Math.PI * 2.22 + gearAngle,
            );
            ctx.arc(
                cx,
                cy,
                IR - 30,
                Math.PI * 2.22 + gearAngle,
                Math.PI * 0.78 + gearAngle,
                true,
            );
            ctx.closePath();
            ctx.fillStyle = nc(0.95);
            ctx.fill();

            // ── 6. Central serif "P" in gold ─────────────────────────────
            const pAlpha = 0.7 + Math.sin(t * 0.5) * 0.15;
            ctx.save();
            ctx.font = `600 ${Math.round(100 + Math.sin(t * 0.4) * 3)}px 'EB Garamond', Georgia, serif`;
            ctx.fillStyle = gc(pAlpha);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("P", cx, cy - 8);
            ctx.restore();

            // ── 7. Soft inner glow behind the P ──────────────────────────
            const grd = ctx.createRadialGradient(cx, cy, 20, cx, cy, 80);
            grd.addColorStop(0, gc(0.08));
            grd.addColorStop(1, "rgba(0,0,0,0)");
            ctx.beginPath();
            ctx.arc(cx, cy, 80, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            t += 0.015;
            requestAnimationFrame(draw);
        };

        draw();
    });
</script>

<canvas bind:this={canvas} style="width:440px;height:440px;max-width:100%"
></canvas>
