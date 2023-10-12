<script setup>
import { ref } from 'vue';
const task=ref('');

const emit = defineEmits(['addTask'])

const handleClick = () => {
  emit('addTask', task.value);
  task.value='';
}
</script>

<template>
  <div class="add-task">
    <input
      @keyup.enter="handleClick"
      v-model="task"
      class="add-task_input"
      placeholder="Add task"
    />
    <button @click="handleClick" class="add-task_btn">Add</button>
  </div>
</template>

<style scoped>
.add-task {
  padding: 10px 0;
  display: flex;
  align-items: center;
}
.add-task_input {
  flex-grow: 1;
  font-size: 16px;
  padding: 10px;
}
.add-task_btn {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  margin-left: 15px;
  cursor: pointer;
  outline: none;
  border: 1px solid red;
}
</style>