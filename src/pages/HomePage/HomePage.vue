<template>
  <div class="md:pt-40 pt-52 flex flex-col items-center min-h-[100vh] bg-gray-900 text-white">
    <h1 class="md:text-5xl text-4xl mb-24 text-yellow-300">Coin Price Tracker</h1>
    
    <div class="text-center">
      <h2 class="md:text-2xl text-xl mb-6 text-yellow-200">Check the current value of a coin</h2>
      <div class="flex mb-6">
        <h4 class="md:text-xl text-lg">Select the coin to search</h4>
        <select @change="fetchCurrentPrice" v-model="selectedCurrency" class="p-2 text-black bg-white ml-2 text-sm h-8">
          <option value="bitcoin">Bitcoin</option>
          <option value="dacxi">DACXI</option>
          <option value="eth">ETH</option>
          <option value="atom">ATOM</option>
        </select>
      </div>
      <div class="text-center mb-2">
        <p class="md:text-xl text-lg">Current {{ selectedCurrency }} USD Price: {{ currentPrice ? `$${currentPrice}` : 'Loading...' }}</p>
      </div>
    </div>
    
    <hr class="text-yellow-300 bg-yellow-300 w-80 my-10">
    
    <div class="mb-12 text-center">
      <h2 class="md:text-2xl text-xl mb-6 text-yellow-200">Check the historical value of a coin</h2>
      <label for="datetime" class="block mb-2 md:text-xl text-lg">Select Date and Time:</label>
      <div class="mt-2">
        <input type="datetime-local" v-model="datetime" id="datetime" class="p-2 text-black bg-white md:text-sm text-sm h-8"/>
        <button @click="fetchHistoricalPrice" class="ml-2 p-2 bg-yellow-300 rounded md:text-sm text-sm text-gray-900 hover:bg-yellow-500">Get Price</button>
      </div>
      <div v-if="isHistoricalLoading" class="md:text-xl text-lg mt-6">Loading...</div>
      <div v-if="hasErrorInHistoricalFetch" class="md:text-xl text-lg mt-6">Error in fetch</div>
      <div v-else-if="historicalPrice !== null">
        <p class="md:text-xl text-lg mt-6">Historical Price on {{ new Date(datetime).toLocaleDateString('en-US') }} at {{ new Date(datetime).toLocaleTimeString('en-US') }}: ${{ historicalPrice }}</p>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const currentPrice = ref(null);
  const datetime = ref('');
  const historicalPrice = ref(null);
  const selectedCurrency = ref('bitcoin');
  const isHistoricalLoading = ref(false);
  const hasErrorInHistoricalFetch = ref(false);
  
  const fetchCurrentPrice = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCurrency.value}&vs_currencies=usd`);
      currentPrice.value = response.data[selectedCurrency.value].usd;
    } catch (error) {
      console.error('Error fetching current price:', error);
      currentPrice.value = ""
    }
  };
  
  const fetchHistoricalPrice = async () => {
    if (!datetime.value) return;
    isHistoricalLoading.value = true;
    hasErrorInHistoricalFetch.value = false;
    historicalPrice.value = null;
    
    const timestamp = new Date(datetime.value).getTime() / 1000;
    const date = new Date(timestamp * 1000).toLocaleDateString('pt-BR').split('/').join('-')
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCurrency.value}/history?date=${date}&localization=false&precision=2`);
      historicalPrice.value = response.data.market_data.current_price.usd;
    } catch (error) {
      hasErrorInHistoricalFetch.value = true
      console.error('Error fetching historical price:', error);
    } finally {
      isHistoricalLoading.value = false;
    }
  };
  
  onMounted(() => {
    fetchCurrentPrice();
    setInterval(fetchCurrentPrice, 10000);
  });
</script>
  
<style scoped>
</style>  