<template>
  <el-card class="result-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title">
          <el-icon style="margin-right: 8px;"><Sunny /></el-icon>
          天气预报
        </span>
        <el-tag type="success" size="small">和风天气API</el-tag>
      </div>
    </template>
    <div class="weather-grid">
      <div 
        v-for="(weather, index) in weatherInfo" 
        :key="index" 
        class="weather-card">
        <h3>{{ weather.date }}</h3>
        <div class="weather-icon">
          {{ weather.day_weather }}
        </div>
        <div class="temperature">
          {{ weather.day_temp }} / {{ weather.night_temp }}
        </div>
        <div class="wind-info">{{ weather.wind }}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  weatherInfo: {
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

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.weather-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.weather-icon {
  margin: 15px 0;
  font-size: 28px;
}

.temperature {
  font-size: 24px;
  margin: 10px 0;
}

.wind-info {
  opacity: 0.9;
}
</style>