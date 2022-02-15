<template>
  <!-- <div class="my-list">
    <div class="list">
      <div v-bind:key="item.id" v-for="item in items">
        <slot v-bind="item"></slot>
      </div>
    </div>
  </div> -->
  <b-list-group id="list_tutorials">
    <b-list-group-item
      button
      v-on:click="selectTutorial(item)"
      v-bind:key="item.id"
      v-for="item in items"
      >{{ item.title }}</b-list-group-item
    >
  </b-list-group>
</template>

<script>
export default {
  name: "TutorialsList",
  props: ["items", "selectTutorial"],
};
</script>
