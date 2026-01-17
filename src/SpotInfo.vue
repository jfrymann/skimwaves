<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router'

const route = useRoute()

const spot = ref([]); // Reactive data to store the fetched posts
const loading = ref(true); // Loading indicator state
const error = ref(null); // Error state

async function fetchSpotInfo() {
  try {
    const response = await fetch("http://localhost:3001/spot-info/"+route.params.slug+"/"+route.params._id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json()
    spot.value = data; // Update the reactive data
  } catch (err) {
    error.value = err.message; // Handle any errors
  } finally {
    loading.value = false; // Set loading to false once done (either success or error)
  }
}
onMounted(() => {
  fetchSpotInfo(); // Call the fetch function when the component is mounted
});
</script>

<template>
    <RouterLink to="/">Home</RouterLink>
  <div class="spot">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="spot" class="content">
      <h2>{{ spot.spotName }}</h2>
      <p>About the spot:<br />
        {{ spot.description }}</p>
      <p>Best tide: {{ spot.bestTide }}</p>
      <p>Best Height: {{ spot.bestHeight }}</p>
      <p>Geolocation: {{ spot.location?.coordinates[0]}}, {{ spot.location?.coordinates[1]}}</p>
      <br />
      <p class="created">Spot info created at {{ spot.createdAt }}</p>
      <p class="updated">Last updated at {{ spot.updatedAt }}</p>
      <RouterLink :to="`/spot-info/edit/${route.params.slug}/${route.params._id}`">Edit</RouterLink>
    </div>
  </div>
</template>

<style>
  .created, .updated {
    font-size: .8em;
  }
</style>