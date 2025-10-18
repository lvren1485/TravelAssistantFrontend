<template>
  <el-card class="result-card" shadow="hover" v-if="flightInfo && flightInfo.length > 0">
    <template #header>
      <div class="card-header">
        <span class="card-title">
          <el-icon style="margin-right: 8px;"><Promotion /></el-icon>
          航班推荐
        </span>
        <div class="header-actions">
          <el-tag type="danger" size="small">实时数据</el-tag>
          <el-button 
            text 
            size="small" 
            @click="showAll = !showAll"
            class="toggle-btn"
          >
            {{ showAll ? '收起' : '展开全部' }}
          </el-button>
        </div>
      </div>
    </template>

    <!-- 摘要信息 -->
    <div class="flight-summary">
      <el-statistic title="最低价格" :value="lowestPrice" prefix="¥" />
      <el-statistic title="航班数量" :value="flightInfo.length" />
      <el-statistic title="直飞航班" :value="directFlightCount" />
    </div>

    <!-- 航班列表 -->
    <div class="table-wrapper">
      <el-table 
        :data="displayedFlights" 
        stripe 
        :show-header="true"
        size="small"
        class="centered-table"
      >
        <el-table-column label="航班信息" width="300">
          <template #default="scope">
            <div class="flight-main">
              <div class="flight-number">{{ scope.row.flight_number }}</div>
              <div class="flight-airline">{{ scope.row.airline }}</div>
              <el-tag 
                v-if="scope.row.discount" 
                size="mini" 
                type="warning"
                class="discount-tag"
              >
                {{ scope.row.discount }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="起降时间" width="300">
          <template #default="scope">
            <div class="time-info">
              <div class="time-row">
                <span class="time">{{ scope.row.departure_time }}</span>
                <el-icon class="arrow-right"><Right /></el-icon>
                <span class="time">{{ scope.row.arrival_time }}</span>
              </div>
              <div class="duration">{{ scope.row.duration }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="机型/准点" width="300">
          <template #default="scope">
            <div class="flight-details">
              <div class="aircraft">{{ scope.row.aircraft_type }}</div>
              <div class="punctuality">
                <el-icon :color="getPunctualityColor(scope.row.punctuality_rate)">
                  <CircleCheck />
                </el-icon>
                准点率 {{ scope.row.punctuality_rate }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="舱位/类型" width="120">
          <template #default="scope">
            <div class="seat-transfer">
              <el-tag 
                :type="getSeatClassType(scope.row.seat_class)"
                size="small"
              >
                {{ scope.row.seat_class }}
              </el-tag>
                <el-tag 
                    :type="scope.row.transfer === '直飞' ? 'success' : 'info'"
                    size="mini"
                >
                    {{ scope.row.transfer }}
                </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="价格" width="260" align="right">
          <template #default="scope">
            <div class="price-section">
              <div class="price-amount">{{ scope.row.price }}</div>
              <div class="price-per-km" v-if="showPricePerKm">
                约¥{{ calculatePricePerKm(scope.row) }}/百公里
              </div>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!-- 分页提示 -->
    <div class="pagination-hint" v-if="!showAll && flightInfo.length > 3">
      显示前 3 条航班，共 {{ flightInfo.length }} 条
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { Promotion, Right, CircleCheck } from '@element-plus/icons-vue'

const props = defineProps({
  flightInfo: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select-flight'])

const showAll = ref(false)

// 计算属性
const displayedFlights = computed(() => {
  return showAll.value ? props.flightInfo : props.flightInfo.slice(0, 3)
})

const lowestPrice = computed(() => {
  if (!props.flightInfo.length) return 0
  return Math.min(...props.flightInfo.map(flight => 
    parseInt(flight.price.replace('¥', ''))
  ))
})

const directFlightCount = computed(() => {
  return props.flightInfo.filter(flight => flight.transfer === '直飞').length
})

const showPricePerKm = computed(() => {
  return true
})

// 方法
const getPunctualityColor = (rate) => {
  const percent = parseInt(rate)
  if (percent >= 90) return '#67C23A'
  if (percent >= 80) return '#E6A23C'
  return '#F56C6C'
}

const getSeatClassType = (seatClass) => {
  const types = {
    '经济舱': '',
    '超级经济舱': 'info',
    '商务舱': 'warning',
    '头等舱': 'danger'
  }
  return types[seatClass] || ''
}

const calculatePricePerKm = (flight) => {
  const price = parseInt(flight.price.replace('¥', ''))
  const duration = flight.duration
  const estimatedDistance = 1000
  return Math.round((price / estimatedDistance) * 100)
}

const handleSelectFlight = (flight) => {
  emit('select-flight', flight)
  ElMessage.success(`已选择航班 ${flight.flight_number}`)
}
</script>

<style scoped>
.result-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-title {
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.toggle-btn {
  padding: 4px 8px;
}

.flight-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 300px;
  margin-bottom: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

/* 表格包装器 - 关键修改 */
.table-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.centered-table {
  margin: 0 auto;
}

.flight-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.flight-number {
  font-weight: bold;
  color: #409EFF;
}

.flight-airline {
  font-size: 12px;
  color: #666;
}

.discount-tag {
  align-self: flex-start;
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time {
  font-weight: bold;
  font-size: 14px;
}

.arrow-right {
  color: #999;
  margin: 0 4px;
}

.duration {
  font-size: 12px;
  color: #666;
}

.flight-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.aircraft {
  font-size: 12px;
  color: #666;
}

.punctuality {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}

.seat-transfer {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.transfer-type {
  display: flex;
}

.price-section {
  text-align: right;
}

.price-amount {
  font-size: 18px;
  font-weight: bold;
  color: #E6A23C;
}

.price-per-km {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.pagination-hint {
  text-align: center;
  padding: 12px;
  color: #666;
  font-size: 14px;
  background: #f5f7fa;
  border-radius: 4px;
  margin-top: 12px;
}

:deep(.el-table .cell) {
  padding: 8px 4px;
}

:deep(.el-table--small) {
  font-size: 13px;
}

/* 确保表格整体居中 */
:deep(.centered-table) {
  margin-left: auto;
  margin-right: auto;
}

/* 表格包装器 - 关键修改 */
.table-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
}

.centered-table {
  margin: 0 auto;
  width: auto !important;
}

/* 确保表格整体居中 */
:deep(.centered-table) {
  margin-left: auto;
  margin-right: auto;
}

:deep(.centered-table .el-table__inner-wrapper) {
  margin: 0 auto;
}

/* 调整列宽让表格占满 */
:deep(.centered-table .el-table__header-wrapper),
:deep(.centered-table .el-table__body-wrapper) {
  width: 100% !important;
}

:deep(.centered-table .el-table) {
  width: 100% !important;
}
</style>