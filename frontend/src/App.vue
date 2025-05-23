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
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">NEWS FEED PAGE</h1>
      
      <TweetForm @tweet-created="fetchTweets" />
      <ErrorMessage :message="error" />
      <TweetFeed :tweets="tweets" :loading="loading" />
    </div>
  </div>
</template>

