<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const spots = ref([]); // Reactive data to store the fetched posts
const loading = ref(true); // Loading indicator state
const error = ref(null); // Error state

async function fetchSpots() {
  try {
    const response = await fetch('https://skimwaves-server.vercel.app/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    spots.value = data; // Update the reactive data
  } catch (err) {
    error.value = err.message; // Handle any errors
  } finally {
    loading.value = false; // Set loading to false once done (either success or error)
  }
}

onMounted(() => {
  fetchSpots(); // Call the fetch function when the component is mounted
});
</script>

<template>
  <div>
    <h1>Spots</h1>
    <p v-if="loading">Loading spots...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <ul v-else>
      <li v-for="spot in spots" :key="spot._id">
        <RouterLink :to="'spot-info/'+spot.slug+'/'+spot._id">{{ spot.spotName }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
