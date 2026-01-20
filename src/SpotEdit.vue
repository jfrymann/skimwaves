<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute()

const spot = ref(); // Reactive data to store the fetched posts
const loading = ref(true); // Loading indicator state
const error = ref(null); // Error state

async function fetchSpotInfo() {
    try {
        const response = await fetch("http://localhost:3001/spot-info/" + route.params.slug + "/" + route.params._id)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        spot.value = data; // Update the reactive data
    } catch (err) {
        error.value = err.message; // Handle any errors
    } finally {
        loading.value = false; // Set loading to false once done (either success or error)
    }
}

async function saveEdit(spot) {
    fetch("http://localhost:3001/spot-info/edit/" + route.params.slug + "/" + route.params._id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(spot) // Convert the JS object to a JSON string
    })
        .then(response => {
            if (!response.ok) {
                // Handle HTTP errors (e.g., 404, 500)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response body as JSON
        })
        .then(data => {
            console.log('Success');  // Handle the successful response data
        })
        .catch(error => {
            console.error('Error:', error); // Handle network errors or errors thrown above
        });
    // router.push('/spot-info/' + route.params.slug + "/" + route.params._id);
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
            <RouterLink :to="`/spot-info/${route.params.slug}/${route.params._id}`">Back to Info</RouterLink>
            <form @submit.prevent="saveEdit(spot)">
                <h2>Editing <input type="text" v-model="spot.spotName" /></h2>
                <p>Best Height: <input type="text" v-model="spot.bestHeight" /></p>
                <p>Best Tide: <input type="text" v-model="spot.bestTide" /></p>
                <p v-if="spot.location?.coordinates">Geolocation:
                    <input type="text" v-model="spot.location.coordinates[0]" />
                    <input type="text" v-model="spot.location.coordinates[1]" />
                </p>
                <textarea v-model="spot.description"></textarea><br />
                <br />
                <button type="submit">Save Edit</button>
            </form>
            <br />
            <p class="created">Spot info created at {{ spot.createdAt }}</p>
            <p class="updated">Last updated at {{ spot.updatedAt }}</p>
        </div>
    </div>
</template>