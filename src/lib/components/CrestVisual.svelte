<script>
    import { onMount } from "svelte";

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        const S = 320;
        canvas.width = S;
        canvas.height = S;
        let t = 0;

        const draw = () => {
            ctx.clearRect(0, 0, S, S);
            const cx = S / 2,
                cy = S / 2;

            // Animated crest: laurel-like arcs
            for (let side = -1; side <= 1; side += 2) {
                for (let i = 0; i < 7; i++) {
                    const angle = (i / 6) * Math.PI * 0.7 - Math.PI * 0.35;
                    const r = 70;
                    const ox = side * 55 + Math.cos(angle) * r;
                    const oy = 40 + Math.sin(angle) * r * 0.5;
                    ctx.beginPath();
                    ctx.ellipse(
                        cx + ox * 0.5,
                        cy + oy * 0.7,
                        6 + i * 2,
                        12 + i * 3,
                        angle * side,
                        0,
                        Math.PI * 2,
                    );
                    ctx.strokeStyle = `rgba(184, 146, 42, ${0.2 + i * 0.05 + Math.sin(t * 2 + i) * 0.05})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Shield outline
            ctx.save();
            ctx.translate(cx, cy - 10);
            ctx.beginPath();
            ctx.moveTo(0, -65);
            ctx.lineTo(52, -40);
            ctx.lineTo(52, 15);
            ctx.quadraticCurveTo(52, 65, 0, 80);
            ctx.quadraticCurveTo(-52, 65, -52, 15);
            ctx.lineTo(-52, -40);
            ctx.closePath();
            ctx.strokeStyle = `rgba(27,58,92,${0.35 + Math.sin(t) * 0.05})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Inner cross
            ctx.strokeStyle = "rgba(27,58,92,.12)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -55);
            ctx.lineTo(0, 70);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-44, -5);
            ctx.lineTo(44, -5);
            ctx.stroke();

            ctx.restore();

            t += 0.01;
            requestAnimationFrame(draw);
        };

        draw();
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        display: block;
        width: 100%;
        max-width: 320px;
        height: auto;
        margin: 0 auto;
    }
</style>
