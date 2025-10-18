<template>
  <el-card class="result-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title">
          <el-icon style="margin-right: 8px;"><Document /></el-icon>
          智能行程规划
        </span>
        <el-tag type="primary" size="small">Deepseek API</el-tag>
      </div>
    </template>
    <div class="itinerary-content" v-html="renderedItinerary"></div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  itinerary: {
    type: String,
    required: true
  }
})

const renderedItinerary = computed(() => {
  return marked.parse(props.itinerary)
})
</script>

<style scoped>
.result-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  font-weight: bold;
  font-size: 18px;
}

.itinerary-content {
  line-height: 1.8;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  margin-top: 15px;
}

.itinerary-content :deep(h1) {
  color: #667eea;
  margin-top: 20px;
  margin-bottom: 15px;
}

.itinerary-content :deep(h2) {
  color: #764ba2;
  margin-top: 15px;
  margin-bottom: 10px;
}

.itinerary-content :deep(ul) {
  margin-left: 20px;
}

.itinerary-content :deep(li) {
  margin-bottom: 8px;
}
</style>