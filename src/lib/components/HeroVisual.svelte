<script>
    import { onMount } from "svelte";

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        const S = 400;
        canvas.width = S;
        canvas.height = S;
        let t = 0;

        const draw = () => {
            ctx.clearRect(0, 0, S, S);
            const cx = S / 2,
                cy = S / 2;

            // Outer rotating ring of lines
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(t * 0.3);
            for (let i = 0; i < 24; i++) {
                const angle = (i / 24) * Math.PI * 2;
                const x1 = Math.cos(angle) * 90;
                const y1 = Math.sin(angle) * 90;
                const x2 = Math.cos(angle) * (110 + Math.sin(t * 2 + i) * 8);
                const y2 = Math.sin(angle) * (110 + Math.sin(t * 2 + i) * 8);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(27, 58, 92, ${0.15 + Math.sin(t + i * 0.5) * 0.05})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();

            // Inner diamond
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(t * -0.2 + Math.PI / 4);
            const ds = 55 + Math.sin(t * 1.5) * 5;
            ctx.beginPath();
            ctx.moveTo(0, -ds);
            ctx.lineTo(ds, 0);
            ctx.lineTo(0, ds);
            ctx.lineTo(-ds, 0);
            ctx.closePath();
            ctx.strokeStyle = "rgba(184,146,42,0.55)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();

            // Three concentric circles
            for (let i = 1; i <= 3; i++) {
                const r = 30 + i * 25 + Math.sin(t * 0.8 + i) * 4;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(27, 58, 92, ${0.08 + i * 0.04})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Centre dot
            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(184,146,42,0.8)";
            ctx.fill();

            t += 0.012;
            requestAnimationFrame(draw);
        };

        draw();
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        width: 100%;
        max-width: 400px;
        height: auto;
        display: block;
        opacity: 0.85;
    }
</style>
