<script setup>
import { onMounted, ref, provide, watchEffect } from 'vue';
import AddTask from './components/AddTask.vue';
import TaskList from "./components/TaskList.vue";
import { SessionStorage } from './utils/session-storage';

const tasks=ref([]);

const addTask=(value)=>{
  if(value.trim()){
    const newTask={
      id:Date.now(),
      title:value,
      subTasks:[],
      isDone:false,
    }

    tasks.value.push(newTask);
  }
}

onMounted(()=>{
  tasks.value=SessionStorage.getTasks();
})

const removeTask=(taskId)=> {
  tasks.value=tasks.value.filter(item=>item.id!==taskId);
}

const changeTaskName=(taskId,newTitle)=>{
  tasks.value.map(item=>{
    if(item.id===taskId){
      item.title=newTitle;
    }
    return item;
  })
}

const changeTaskStatus=(taskId,value)=>{
  tasks.value.map(item=>{
    if(item.id===taskId){
      item.isDone=value;
    }
    return item;
  })
}

provide('remove', {
 removeTask
})

provide('change',{
  changeTaskName,
  changeTaskStatus
})

watchEffect(()=>{
  if(tasks.value.length)
  SessionStorage.setTasks(tasks.value);
})
</script>

<template>
  <div class="container">
    <AddTask @addTask="addTask" />
    <TaskList :tasks="tasks" />
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
