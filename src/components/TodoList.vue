<script setup lang="ts">
defineProps<{
  items: string[]
}>()

const emit = defineEmits<{
  (e: 'remove', index: number): void
}>()

function removeItem(index: number) {
  emit('remove', index)
}
</script>

<template>
  <div>
    <ul class="list">
      <li v-for="(item, index) in items" :key="index">
        <span>{{ item }}</span>
        <button class="delete-btn" @click="removeItem(index)">删除</button>
      </li>
    </ul>

    <p v-if="items.length === 0" class="empty-tip">清单是空的，快去添加商品吧～</p>
  </div>
</template>

<style scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 8px;
  background-color: #f7f8fa;
  border-radius: 8px;
  font-size: 15px;
}

.delete-btn {
  background-color: #ff6b6b;
  padding: 6px 14px;
  font-size: 13px;
}

.delete-btn:hover {
  background-color: #ee5253;
}

.empty-tip {
  text-align: center;
  color: #999;
  margin-top: 24px;
}
</style>