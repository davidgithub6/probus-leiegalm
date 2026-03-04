<script>
    import { page } from "$app/stores";
    import "$styles/global.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ProceduralBackground from "$lib/components/ProceduralBackground.svelte";

    let { children } = $props();
</script>

<ProceduralBackground />
<Navbar />

<main id="main">
    {@render children()}
</main>

{#if !$page.url.pathname.startsWith("/leden/portaal")}
    <Footer />
{/if}

<style>
    main {
        min-height: calc(100vh - 72px);
    }
</style>
