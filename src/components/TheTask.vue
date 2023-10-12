<script setup>
import { ref,nextTick, inject, watchEffect } from 'vue';

import EditButton from './EditButton.vue';
import DeleteButton from "./DeleteButton.vue";

const { changeTaskName, changeTaskStatus } = inject('change');

const props= defineProps(['task','index'])

const input=ref(null);
const editMode=ref(false);
const checked=ref(props.task.isDone);
const content=ref(props.task.title);

const editTask=()=>{
  editMode.value=true;

  nextTick(() => {
        input.value.focus();
    });
}

const focusOut=()=>{
  const taskId=props.task.id;
  
  changeTaskName(taskId,content.value);
  editMode.value=false;
}

watchEffect(()=>{
  const taskId=props.task.id;
  changeTaskStatus(taskId,checked.value)
})
</script>

<template>
  <li class="item">
    <input v-model="checked" type="checkbox" />
    <div v-show="editMode" class="title">
      <input
        class="input"
        ref="input"
        v-model="content"
        aria-describedby="item-content"
        name="content"
        type="text"
        tabindex="0"
        @focusout="focusOut"
        @keydown.enter="editMode = false"
      />
    </div>
    <p v-show="!editMode" class="title" :class="{isDone:checked}">
      {{ task.title }}
    </p>
    <EditButton @clc="editTask" />
    <DeleteButton :id="task.id" />
  </li>
</template>

<style scoped>
.item {
  width: 100%;
  padding: 10px;
  border: 1px solid red;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.title {
  margin-left: 10px;
  flex-grow: 1;
}

.input {
  display: block;
  width: 100%;
  padding: 5px;
}
.isDone {
  color: red;
  text-decoration: line-through;
}
</style>