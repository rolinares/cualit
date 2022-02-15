<template>
  <div class="add">
    <NavBar id="navbar" />
    <b-container style="display: flex; justify-content: center">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        style="width: 60rem"
      >
        <p v-if="!$route.params.id">El tutorial se agregó correctamente!</p>
        <p v-else>El tutorial se actualizó correctamente!</p>
      </b-alert>
    </b-container>
    <b-container style="display: flex; justify-content: center">
      <b-card bg-variant="light" style="width: 60rem">
        <h1 v-if="!$route.params.id">Nuevo tutorial</h1>
        <div v-else style="display: flex; justify-content: space-between">
          <h1>Editar tutorial</h1>
          <b-button v-on:click="deleteTutorial" variant="danger">
            <b-icon icon="trash-fill" aria-label="Help"></b-icon>
          </b-button>
        </div>
        <b-form v-on:submit.prevent="onSubmit">
          <b-form-group
            label="Titulo:"
            label-for="title"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="title"
              v-model.trim.lazy="tutorialData.title"
            ></b-form-input>
            <div class="error" v-if="!$v.tutorialData.title.required">
              El título es requerido
            </div>
            <div class="error" v-if="!$v.tutorialData.title.minLength">
              El título debe tener al menos
              {{ $v.tutorialData.title.$params.minLength.min }} letras.
            </div>
          </b-form-group>

          <b-form-group
            label="Descripción:"
            label-for="description"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="description"
              v-model="tutorialData.description"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Video URL:"
            label-for="video_url"
            label-cols-sm="3"
            label-align-sm="right"
            style="margin-bottom: 16px"
          >
            <b-form-input
              id="video_url"
              v-model="tutorialData.video_url"
            ></b-form-input>
            <div class="error" v-if="!$v.tutorialData.video_url.url">
              Debe ingresar una url válida
            </div>
          </b-form-group>

          <b-button v-if="!$route.params.id" type="submit" variant="primary"
            >Guardar</b-button
          >
          <b-button v-else type="submit" variant="primary">Actualizar</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import NavBar from "./../components/NavBar.vue";
import axios from "axios";
import { required, minLength, url } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      tutorialData: {
        title: "",
        description: "",
        video_url: "",
      },
    };
  },
  validations: {
    tutorialData: {
      title: { required, minLength: minLength(3) },
      video_url: { url },
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (!this.$route.params.id) {
          axios
            .get("http://localhost:3000/tutorials/token")
            .then((response) => {
              const token = response.data.token;
              axios
                .post("http://localhost:3000/tutorials", this.tutorialData, {
                  headers: { "x-access-token": token },
                })
                .then(() => {
                  this.dismissCountDown = this.dismissSecs;
                  this.tutorialData.title = "";
                  this.tutorialData.description = "";
                  this.tutorialData.video_url = "";
                })
                .catch((error) => {
                  console.log("error... ", error);
                });
            })
            .catch((error) => {
              console.log("error... ", error);
            });
        } else {
          axios
            .put(
              `http://localhost:3000/tutorials/${this.$route.params.id}`,
              this.tutorialData
            )
            .then(() => {
              this.dismissCountDown = this.dismissSecs;
            })
            .catch((error) => {
              console.log("error... ", error);
            });
        }
      } else {
        alert("Existen errores en algunos campos!");
      }
    },
    getTutorial(id) {
      axios
        .get(`http://localhost:3000/tutorials/${id}`)
        .then((response) => {
          this.tutorialData = response.data.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTutorial() {
      if (confirm("¿Está seguro que desea eliminar el tutorial?")) {
        axios
          .delete(`http://localhost:3000/tutorials/${this.$route.params.id}`)
          .then((response) => {
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getTutorial(this.$route.params.id);
    }
  },
  components: {
    NavBar,
  },
};
</script>

<style>
#navbar {
  margin-bottom: 50px;
}

.error {
  color: red;
  font-size: 10px;
  margin-top: 8px;
}
</style>
