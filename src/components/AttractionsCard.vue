<template>
  <el-card class="result-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title">
          <el-icon style="margin-right: 8px;"><Place /></el-icon>
          推荐景点
        </span>
        <el-tag type="warning" size="small">聚合景点API</el-tag>
      </div>
    </template>
    <div class="attractions-grid">
      <el-card 
        v-for="(attraction, index) in attractions" 
        :key="index" 
        shadow="hover">
        <h4 class="attraction-name">{{ attraction.name }}</h4>
        <p class="attraction-address">
          <el-icon><Location /></el-icon> 
          {{ attraction.address || '地址信息暂无' }}
        </p>
        <el-tag v-if="attraction.type" size="small" class="attraction-type">
          {{ attraction.type }}
        </el-tag>
      </el-card>
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  attractions: {
    type: Array,
    required: true
  }
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

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.attraction-name {
  color: #667eea;
  margin-bottom: 8px;
}

.attraction-address {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.attraction-type {
  margin-top: 8px;
}
</style>