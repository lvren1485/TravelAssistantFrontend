<template>
  <div class="form-section">
    <el-form :model="formData" label-width="100px" size="large">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="目的地" required>
            <el-input 
              v-model="formData.destination" 
              placeholder="请输入目的地城市，如：北京"
              clearable>
              <template #prefix>
                <el-icon><Location /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        
        <el-col :xs="24" :sm="12">
          <el-form-item label="旅行天数" required>
            <el-input-number 
              v-model="formData.days" 
              :min="1" 
              :max="30"
              style="width: 100%">
            </el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="预算范围" required>
            <el-select 
              v-model="formData.budget" 
              placeholder="请选择预算范围"
              style="width: 100%">
              <el-option label="经济型" value="经济型"></el-option>
              <el-option label="中等" value="中等"></el-option>
              <el-option label="豪华" value="豪华"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
        <el-col :xs="24" :sm="12">
          <el-form-item label="出发日期">
            <el-date-picker
              v-model="formData.start_date"
              type="date"
              placeholder="选择出发日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-form-item label="出发城市">
            <el-input 
              v-model="formData.departure_city" 
              placeholder="如需查询航班，请填写出发城市"
              clearable>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="兴趣偏好">
        <div class="interests-tags">
          <el-tag 
            v-for="interest in availableInterests" 
            :key="interest"
            :type="formData.interests.includes(interest) ? 'primary' : 'info'"
            @click="toggleInterest(interest)"
            style="cursor: pointer;">
            {{ interest }}
          </el-tag>
        </div>
      </el-form-item>
      
      <el-form-item>

      </el-form-item>
    </el-form>
    <el-button 
        type="primary" 
        size="large"
        :loading="loading"
        @click="handleSubmit"
        style="width: 100%;">
        <!-- <el-icon v-if="!loading"><MagicStick /></el-icon> -->
        {{ loading ? '正在生成旅行计划...' : '生成智能旅行计划' }}
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  loading: Boolean
})

const emit = defineEmits(['generate'])

const formData = ref({
  destination: '',
  days: 3,
  budget: '中等',
  start_date: '',
  departure_city: '',
  interests: []
})

const availableInterests = ref([
  '历史文化',
  '自然风光',
  '美食',
  '购物',
  '摄影',
  '亲子游',
  '探险',
  '休闲放松',
  '出差'
])

const toggleInterest = (interest) => {
  const index = formData.value.interests.indexOf(interest)
  if (index > -1) {
    formData.value.interests.splice(index, 1)
  } else {
    formData.value.interests.push(interest)
  }
}

const handleSubmit = () => {
  if (!formData.value.destination) {
    ElMessage.warning('请输入目的地')
    return
  }
  emit('generate', formData.value)
}
</script>

<style scoped>
.form-section {
  margin-bottom: 30px;
}

.interests-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>