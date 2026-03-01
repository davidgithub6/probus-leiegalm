<!--
  ProbusLogo.svelte
  Fully inline SVG recreation of the Probus international logo.
  Stylized to the site's navy (#1b3a5c) and gold (#b8922a) palette.
  No external assets — pure SVG math.
-->
<script>
    let { size = 40, showText = false } = $props();
</script>

<svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Probus logo"
>
    <!-- ── Definitions ─────────────────────────────────────── -->
    <defs>
        <!-- Banner arc path for text (bottom arc) -->
        <path id="bannerArc" d="M 30,130 A 70,70 0 0,0 170,130" fill="none" />
        <clipPath id="innerCircle">
            <circle cx="100" cy="100" r="62" />
        </clipPath>
    </defs>

    <!-- ── Background disc (outer gold ring area) ─────────── -->
    <circle cx="100" cy="100" r="98" fill="#b8922a" />
    <circle
        cx="100"
        cy="100"
        r="97"
        fill="none"
        stroke="#d4a93a"
        stroke-width="1"
    />

    <!-- ── Gear teeth ─────────────────────────────────────── -->
    <!--
    24 teeth around the ring.
    Teeth from index 0–18 get a navy blue notch inset.
    Teeth 19–23 (bottom ~75°) become the solid navy banner.
    We rotate each tooth by 360/24 = 15° increments.
    Tooth 0 is at 12 o'clock (270° in SVG coords).
  -->
    {#each Array(24) as _, i}
        {@const angleDeg = i * 15 - 90}
        {@const angleRad = (angleDeg * Math.PI) / 180}
        {@const isBanner = i >= 19 && i <= 23}
        {@const tx = 100 + Math.cos(angleRad) * 88}
        {@const ty = 100 + Math.sin(angleRad) * 88}
        {@const halfW = 5.5}
        {@const toothH = 10}
        <g transform={`rotate(${angleDeg + 90}, 100, 100)`}>
            <!-- Main tooth rectangle -->
            <rect
                x={100 - halfW}
                y={100 - 98}
                width={halfW * 2}
                height={toothH}
                fill={isBanner ? "#1b3a5c" : "#b8922a"}
            />
            {#if !isBanner}
                <!-- Navy notch inset inside tooth -->
                <rect
                    x={100 - halfW + 1.5}
                    y={100 - 98 + 1.5}
                    width={halfW * 2 - 3}
                    height={toothH - 4}
                    fill="#1b3a5c"
                />
            {/if}
        </g>
    {/each}

    <!-- ── Navy Banner at bottom (solid arc) ─────────────── -->
    <path
        d="M 44,148 A 72,72 0 0,0 156,148 L 170,135 A 88,88 0 0,1 30,135 Z"
        fill="#1b3a5c"
    />

    <!-- ── Inner navy circle ───────────────────────────────── -->
    <circle cx="100" cy="100" r="68" fill="#1b3a5c" />
    <circle
        cx="100"
        cy="100"
        r="68"
        fill="none"
        stroke="#b8922a"
        stroke-width="1.5"
        opacity=".6"
    />

    <!-- ── Globe meridians (vertical arcs) ───────────────── -->
    <g clip-path="url(#innerCircle)" opacity=".35">
        <!-- Centre vertical -->
        <line
            x1="100"
            y1="32"
            x2="100"
            y2="168"
            stroke="#b8922a"
            stroke-width=".8"
        />
        <!-- Meridians left -->
        <path
            d="M 100,32 Q 68,100 100,168"
            fill="none"
            stroke="#b8922a"
            stroke-width=".8"
        />
        <path
            d="M 100,32 Q 48,100 100,168"
            fill="none"
            stroke="#b8922a"
            stroke-width=".8"
        />
        <!-- Meridians right -->
        <path
            d="M 100,32 Q 132,100 100,168"
            fill="none"
            stroke="#b8922a"
            stroke-width=".8"
        />
        <path
            d="M 100,32 Q 152,100 100,168"
            fill="none"
            stroke="#b8922a"
            stroke-width=".8"
        />
    </g>

    <!-- ── Globe parallels (horizontal arcs) ──────────────── -->
    <g clip-path="url(#innerCircle)" opacity=".35">
        {#each [-28, -14, 0, 14, 28] as yOff}
            <ellipse
                cx="100"
                cy={100 + yOff}
                rx="60"
                ry="8"
                fill="none"
                stroke="#b8922a"
                stroke-width=".8"
            />
        {/each}
    </g>

    <!-- ── Large Gold "P" ──────────────────────────────────── -->
    <text
        x="97"
        y="122"
        text-anchor="middle"
        font-family="'EB Garamond', Georgia, serif"
        font-size="72"
        font-weight="600"
        fill="#b8922a"
        opacity=".95">P</text
    >

    <!-- ── "PROBUS" banner text ────────────────────────────── -->
    <text
        font-family="'EB Garamond', Georgia, serif"
        font-size="13"
        font-weight="600"
        fill="#b8922a"
        letter-spacing="3"
    >
        <textPath href="#bannerArc" startOffset="50%" text-anchor="middle"
            >PROBUS</textPath
        >
    </text>

    <!-- ── Optional wordmark beneath for large use ────────── -->
    {#if showText}
        <text
            x="100"
            y="190"
            text-anchor="middle"
            font-family="'EB Garamond', Georgia, serif"
            font-size="11"
            fill="#b8922a"
            letter-spacing="2">LEIEGALM</text
        >
    {/if}
</svg>

<style>
    svg {
        display: block;
    }
</style>
