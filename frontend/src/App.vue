<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Tweet {
  id: number
  author: string
  content: string
  createdAt: string
}

const tweets = ref<Tweet[]>([])
const newTweet = ref({
  author: '',
  content: ''
})
const loading = ref(false)
const error = ref('')
const remainingChars = ref(280)

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

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    await axios.post('http://localhost:3000/api/tweet', newTweet.value)
    newTweet.value.content = ''
    remainingChars.value = 280
    await fetchTweets()
  } catch (err) {
    error.value = 'Failed to create tweet, check the input fields please.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const updateRemainingChars = () => {
  remainingChars.value = 280 - newTweet.value.content.length
}

onMounted(fetchTweets)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto space-y-10">
      
      <!-- Header -->
      <h1 class="text-4xl font-extrabold text-center text-blue-800 tracking-tight">📰 News Feed</h1>

      <!-- Tweet Form -->
      <div class="bg-white rounded-3xl shadow-lg p-6 sm:p-8 space-y-6 transition hover:shadow-xl">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="author" class="block text-sm font-medium text-gray-700">👤 Your Name</label>
            <input
              type="text"
              id="author"
              v-model="newTweet.author"
              required
              class="mt-1 block w-full rounded-xl border border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Elma M."
            />
          </div>

          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">💬 What's happening?</label>
            <textarea
              id="content"
              v-model="newTweet.content"
              @input="updateRemainingChars"
              :maxlength="280"
              rows="3"
              required
              class="mt-1 block w-full rounded-xl border border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Share something interesting..."
            ></textarea>
            <div class="text-right text-sm mt-1" :class="remainingChars < 0 ? 'text-red-500' : 'text-gray-500'">
              {{ remainingChars }} characters remaining
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading || remainingChars < 0"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition disabled:opacity-50"
          >
            {{ loading ? 'Posting...' : 'Tweet' }}
          </button>
        </form>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl shadow-sm">
        <p class="text-sm font-medium">{{ error }}</p>
      </div>

      <!-- Tweets -->
      <div class="space-y-6">
        <div v-if="loading && !tweets.length" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>

        <div v-else-if="!tweets.length" class="text-center text-gray-500 py-10">
          No tweets yet. Be the first to tweet!
        </div>

        <div
          v-else
          v-for="tweet in tweets"
          :key="tweet.id"
          class="bg-white rounded-3xl shadow-md p-5 flex space-x-4 hover:shadow-lg transition"
        >
          <img
            :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(tweet.author)}&background=random&rounded=true&size=64`"
            alt="Avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div class="flex-1">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900">{{ tweet.author }}</h3>
              <span class="text-xs text-gray-500">{{ new Date(tweet.createdAt).toLocaleString() }}</span>
            </div>
            <p class="mt-2 text-gray-700 whitespace-pre-line">{{ tweet.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style> 