<script setup lang="ts">
import type { Tweet } from '../types/tweet'

defineProps<{
  tweets: Tweet[]
  loading: boolean
}>()
</script>

<template>
  <div class="space-y-4">
    <div v-if="loading && !tweets.length" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    </div>
    
    <div v-else-if="!tweets.length" class="text-center py-8 text-gray-500">
      No tweets yet. Be the first to tweet!
    </div>
    
    <div v-else v-for="tweet in tweets" :key="tweet.id" class="bg-white rounded-lg shadow p-6">
      <div class="flex items-start space-x-4">
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">{{ tweet.author }}</h3>
            <p class="text-sm text-gray-500">{{ new Date(tweet.createdAt).toLocaleString() }}</p>
          </div>
          <p class="mt-2 text-gray-700">{{ tweet.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>