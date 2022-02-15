<template>
  <div>
    <slot name="title"></slot>
    <slot name="description"></slot>
    <slot name="video_url"></slot>
    <slot name="status"></slot>
  </div>
</template>

<script>
export default {
  name: "my-list",
};
</script>
