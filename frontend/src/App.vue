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
    error.value = ''
    const response = await axios.get('http://localhost:3000/api/tweets')
    tweets.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch tweets'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleError = (message: string) => {
  error.value = message
}

onMounted(fetchTweets)
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 10h6M9 14h6M9 18h6" />
</svg>

  <span>NEWS FEED PAGE</span>
</h1>

      <div v-if="error" class="mb-6">
        <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-md">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <TweetForm @tweet-created="fetchTweets" @error="handleError" />
      <TweetFeed :tweets="tweets" :loading="loading" />
    </div>
  </div>
</template>

