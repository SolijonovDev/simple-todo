<script setup>
import TheTask from "./TheTask.vue";

defineProps(['tasks']);
</script>

<template>
  <ul class="list" v-if="tasks && tasks.length">
    <TheTask
      v-for="(task, index) in tasks"
      :task="task"
      :index="index"
      :key="task.id"
    />
  </ul>
</template>