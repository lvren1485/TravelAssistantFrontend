<template>
  <el-card class="result-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title">
          <el-icon style="margin-right: 8px;"><TakeawayBox /></el-icon>
          航班推荐
        </span>
        <el-tag type="danger" size="small">航班信息API</el-tag>
      </div>
    </template>
    <el-table :data="flightInfo" stripe style="width: 100%">
      <el-table-column prop="flight_number" label="航班号" width="120" />
      <el-table-column prop="airline" label="航空公司" width="150" />
      <el-table-column prop="departure_time" label="起飞时间" width="120" />
      <el-table-column prop="arrival_time" label="到达时间" width="120" />
      <el-table-column prop="price" label="价格" width="100">
        <template #default="scope">
          <el-tag type="success">{{ scope.row.price }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
defineProps({
  flightInfo: {
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
</style>