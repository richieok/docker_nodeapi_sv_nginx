<script>
    import "../app.css"
    import Nav from "./Nav.svelte";
    let { children } = $props();
</script>

<header><Nav/></header>
<main>{@render children()}</main>