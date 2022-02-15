<template>
  <div>
    <b-navbar toggleable="lg" variant="light">
      <b-navbar-brand href="/">Tutos.com</b-navbar-brand>
      <b-nav-text>Tutoriales</b-nav-text>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <slot href="/add" name="action" />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    addNewTutorial() {
      this.$router.push("/add");
    },
  },
};
</script>
