<template>
  <div class="result-section">
    <WeatherCard :weather-info="result.weather_info" />
    <AttractionsCard :attractions="result.attractions" />
    <FlightCard 
      v-if="result.flight_info && result.flight_info.length > 0" 
      :flight-info="result.flight_info" 
    />
    <ItineraryCard :itinerary="result.itinerary" />
  </div>
</template>

<script setup>
import WeatherCard from './WeatherCard.vue'
import AttractionsCard from './AttractionsCard.vue'
import FlightCard from './FlightCard.vue'
import ItineraryCard from './ItineraryCard.vue'

defineProps({
  result: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.result-section {
  margin-top: 40px;
}
</style>