<template>
  <div>
    <NavBar id="navbar">
      <b-nav-item href="/add" slot="action">Agregar</b-nav-item>
    </NavBar>
    <b-container class="bv-example-row" v-if="tutorials.length > 0">
      <b-input-group class="mb-3">
        <b-form-input
          v-model="filter"
          placeholder="Buscar por titulo o descripción"
        />
        <b-input-group-append>
          <b-button variant="outline-primary" v-on:click="getFiltered">
            Buscar
          </b-button>
          <b-button variant="outline-dark" v-on:click="clearSearch">
            Limpiar
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-row>
        <b-col>
          <h1>Tutoriales</h1>
          <hr class="my-4" />
          <TutorialsList :selectTutorial="selectTutorial" :items="tutorials">
            <template scope="tutorial">
              <div>
                {{ tutorial.title }} <small>({{ tutorial.video_url }})</small>
              </div>
            </template>
          </TutorialsList>
          <b-button v-on:click="deleteAll" variant="danger"
            >Eliminar todos</b-button
          >
        </b-col>

        <b-col>
          <h1>Tutorial</h1>
          <hr class="my-4" />
          <b-card v-if="tutorialSelected">
            <TutorialView>
              <b-card-text slot="title"
                >Titulo: {{ tutorialSelected.title }}</b-card-text
              >
              <b-card-text slot="description"
                >Descripción:
                {{
                  tutorialSelected.description
                    ? tutorialSelected.description
                    : ""
                }}</b-card-text
              >
              <b-card-text slot="video_url"
                >URL:
                {{
                  tutorialSelected.video_url ? tutorialSelected.video_url : "-"
                }}</b-card-text
              >
              <b-card-text slot="status"
                >Estado:
                {{
                  tutorialSelected.published_status ? "Publicado" : "Oculto"
                }}</b-card-text
              >
            </TutorialView>
            <b-button
              v-on:click="editTutorial(tutorialSelected.id)"
              variant="warning"
              >Editar</b-button
            >
          </b-card>
          <b-alert v-else show>Debe seleccionar un tutorial</b-alert>
        </b-col>
      </b-row>
    </b-container>

    <b-container
      v-else-if="(!tutorials || tutorials.length == 0) && filter != ''"
    >
      <b-card title="No se encontraron tutoriales por la búsqueda realizada">
        <b-button variant="outline-primary" v-on:click="clearSearch">
          Mostrar todos
        </b-button>
      </b-card>
    </b-container>

    <b-container v-else-if="!tutorials || tutorials.length == 0">
      <b-card
        title="No hay tutoriales aquí"
        sub-title="Quizas quieras agregar algun tutorial"
      >
        <b-link v-on:click="addNewTuto" class="card-link">Agregar</b-link>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import NavBar from "./../components/NavBar.vue";
import TutorialView from "./../components/TutorialView.vue";
import TutorialsList from "./../components/TutorialsList.vue";
import axios from "axios";

export default {
  name: "App",
  data: function () {
    return {
      tutorials: [],
      tutorialSelected: null,
      filter: "",
    };
  },
  methods: {
    selectTutorial(tutorial) {
      this.tutorialSelected = tutorial;
    },
    addNewTuto() {
      this.$router.push("/add");
    },
    deleteAll() {
      if (confirm("¿Está seguro que desea eliminar todos los tutoriales?")) {
        axios
          .delete("http://localhost:3000/tutorials/mass_delete")
          .then((response) => {
            this.getAll();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getAll() {
      axios
        .get("http://localhost:3000/tutorials")
        .then((response) => {
          this.tutorials = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFiltered() {
      axios
        .get(
          `http://localhost:3000/tutorials${
            this.filter ? `?filter=${this.filter}` : ""
          }`
        )
        .then((response) => {
          this.tutorials = response.data.data;
          this.tutorialSelected = null;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearSearch() {
      this.getAll();
      this.filter = "";
      this.tutorialSelected = null;
    },
    editTutorial(id) {
      this.$router.push(`/edit/${id}`);
    },
  },
  created() {
    this.getAll();
  },
  components: {
    NavBar,
    TutorialView,
    TutorialsList,
  },
};
</script>

<style>
#navbar {
  margin-bottom: 50px;
}

#list_tutorials {
  margin-bottom: 16px;
}
</style>
