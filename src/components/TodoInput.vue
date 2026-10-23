<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add', text: string): void
}>()

const inputText = ref('')

function addItem() {
  const text = inputText.value.trim()
  if (text === '') return
  emit('add', text)
  inputText.value = ''
}
</script>

<template>
  <div class="input-area">
    <input
      v-model="inputText"
      type="text"
      placeholder="请输入要购买的商品..."
      @keyup.enter="addItem"
    />
    <button @click="addItem">添加</button>
  </div>
</template>

<style scoped>
.input-area {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #42b983;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #359a6b;
}
</style>