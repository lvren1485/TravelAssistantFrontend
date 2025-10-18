<template>
  <div id="app">
    <div class="header">
      <h1>🌍 智能旅行规划助手</h1>
      <p>整合天气、地图、航班和AI的一站式旅行规划服务</p>
      <div class="api-badges">
        <span class="api-badge">和风天气API</span>
        <span class="api-badge">高德地图API</span>
        <span class="api-badge">航班信息API</span>
        <span class="api-badge">Deepseek API</span>
      </div>
    </div>
    
    <div class="main-container">
      <TravelForm 
        @generate="handleGenerate" 
        :loading="loading" 
      />
      
      <LoadingState v-if="loading" />
      
      <ResultDisplay 
        v-else-if="result" 
        :result="result" 
      />
      
      <EmptyState v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TravelForm from './components/TravelForm.vue'
import LoadingState from './components/LoadingState.vue'
import ResultDisplay from './components/ResultDisplay.vue'
import EmptyState from './components/EmptyState.vue'
import { generateTravelPlan } from './api/travelService'

const loading = ref(false)
const result = ref(null)

const handleGenerate = async (formData) => {
  loading.value = true
  result.value = null
  
  try {
    const data = await generateTravelPlan(formData)
    result.value = data
    ElMessage.success('旅行计划生成成功！')
    
    // 滚动到结果区域
    setTimeout(() => {
      document.querySelector('.result-section')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }, 100)
  } catch (error) {
    console.error('Error:', error)
    ElMessage.error('生成旅行计划失败，请检查后端服务是否运行')
  } finally {
    loading.value = false
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

#app {
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.header p {
  font-size: 1.1em;
  opacity: 0.9;
}

.api-badges {
  margin-top: 15px;
}

.api-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 8px;
}

.main-container {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
</style>