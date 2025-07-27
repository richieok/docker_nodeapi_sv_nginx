<nav>
    <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
    <ul class="auth-links">
        <li><a href="/#">Login</a></li>
        <li><a href="/#">Signup</a></li>
    </ul>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        background-color: #333;
        color: white;
        padding: 1rem;
    }
    ul {
        display: flex;
        list-style-type: none;
        padding: 0;
    }
    li {
        /* display: inline; */
        margin-right: 1rem;
    }
    a {
        color: white;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    .auth-links {
        align-self: flex-end;
    }
</style>