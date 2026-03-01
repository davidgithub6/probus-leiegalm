<script>
    import { onMount } from "svelte";

    let canvas;
    let raf;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        let W, H;

        // Fine dot grid + slow concentric rings
        const resize = () => {
            W = canvas.width = canvas.offsetWidth * devicePixelRatio;
            H = canvas.height = canvas.offsetHeight * devicePixelRatio;
        };

        resize();
        window.addEventListener("resize", resize);

        let t = 0;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Dot grid
            const spacing = 38 * devicePixelRatio;
            const cols = Math.ceil(W / spacing) + 1;
            const rows = Math.ceil(H / spacing) + 1;

            ctx.fillStyle = "rgba(27,58,92,0.08)";
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * spacing;
                    const y = r * spacing;
                    const wave =
                        Math.sin(t * 0.5 + c * 0.4 + r * 0.3) * 0.5 + 0.5;
                    ctx.globalAlpha = 0.04 + wave * 0.06;
                    ctx.beginPath();
                    ctx.arc(x, y, 1.5 * devicePixelRatio, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Concentric rings (bottom-right)
            const cx = W * 0.85,
                cy = H * 0.88;
            for (let i = 1; i <= 6; i++) {
                const r = (80 + i * 60) * devicePixelRatio;
                ctx.globalAlpha = 0.025;
                ctx.strokeStyle = "#b8922a";
                ctx.lineWidth = devicePixelRatio;
                ctx.beginPath();
                ctx.arc(
                    cx,
                    cy,
                    r + Math.sin(t + i) * 8 * devicePixelRatio,
                    0,
                    Math.PI * 2,
                );
                ctx.stroke();
            }

            ctx.globalAlpha = 1;
            t += 0.008;
            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        background: var(--bg);
    }
</style>
