<template>
  <div class="empty-state">
    <el-icon :size="80" color="#ddd">
      <DocumentAdd />
    </el-icon>
    <p class="empty-text">
      填写表单并点击按钮，开始您的智能旅行规划之旅！
    </p>
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-text {
  margin-top: 20px;
  font-size: 16px;
}
</style>