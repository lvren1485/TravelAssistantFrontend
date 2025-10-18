<template>
  <div class="loading-container">
    <el-icon :size="60" class="is-loading" color="#667eea">
      <Loading />
    </el-icon>
    <p class="loading-text">
      正在整合天气、景点、航班信息并生成智能行程...
    </p>
  </div>
</template>

<style scoped>
.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.loading-text {
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}
</style>