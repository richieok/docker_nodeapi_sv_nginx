<script>
    import "../app.css"
    import Nav from "./Nav.svelte";
    let { children } = $props();
</script>

<header><Nav/></header>
<main>{@render children()}</main>

<style>
    main {
        min-height: calc(100vh - 60px); /* Adjust based on header height */
    }
</style>