<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TweetFeed from './components/TweetFeed.vue'
import TweetForm from './components/TweetForm.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import type { Tweet } from './types/tweet'

const tweets = ref<Tweet[]>([])
const loading = ref(false)
const error = ref('')

const fetchTweets = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:3000/api/tweets')
    tweets.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch tweets'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchTweets)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">

      <div class="mb-10 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">📰 News Feed</h1>
        <p class="mt-2 text-gray-600 text-lg">See what people are talking about</p>
      </div>
      
      <TweetForm @tweet-created="fetchTweets" />

      <div v-if="error" class="mb-4">
        <ErrorMessage :message="error" />
      </div>

      <TweetFeed :tweets="tweets" :loading="loading" />
    </div>
  </div>
</template>

