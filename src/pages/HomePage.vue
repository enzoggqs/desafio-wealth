<template>
    <div class="py-40 flex flex-col items-center min-h-[94vh] bg-gray-900 text-white">
      <h1 class="md:text-7xl text-4xl mb-24 text-yellow-300">Coin Price Tracker</h1>
      <div class="flex mb-6">
          <h4 class="md:text-2xl text-lg">Select the coin to search &nbsp;          </h4>
          <select @change="fetchCurrentPrice" v-model="selectedCurrency" class="p-2 text-black bg-white ml-2 md:text-lg text-sm">
            <option value="bitcoin">Bitcoin</option>
            <option value="dacxi">DACXI</option>
            <option value="eth">ETH</option>
            <option value="atom">ATOM</option>
          </select>
      </div>
      <div class="text-center mb-2">
        <p class="md:text-2xl text-lg mb-16">Current {{ selectedCurrency }} USD Price: {{ currentPrice ? `$${currentPrice}` : 'Loading...' }}</p>
      </div>
        <label for="datetime" class="block mb-2 md:text-2xl text-lg">Select Date and Time:</label>
        <div class="mt-2">
          <input type="datetime-local" v-model="datetime" id="datetime" class="p-2 text-black bg-white md:text-lg text-sm"/>
          <button @click="fetchHistoricalPrice" class="ml-2 p-2 bg-yellow-300 rounded md:text-xl text-sm text-gray-900 hover:bg-yellow-500">Get Price</button>
        </div>
        <div v-if="historicalPrice !== null">
          <p class="md:text-2xl text-lg mt-6">Historical Price: ${{ historicalPrice }}</p>
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
  
    const timestamp = new Date(datetime.value).getTime() / 1000;
    const date = new Date(timestamp * 1000).toLocaleDateString('pt-BR').split('/').join('-')
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCurrency.value}/history?date=${date}&localization=false&precision=2`);
      historicalPrice.value = response.data.market_data.current_price.usd;
    } catch (error) {
      console.error('Error fetching historical price:', error);
    }
  };
  
  onMounted(() => {
    fetchCurrentPrice();
    setInterval(fetchCurrentPrice, 60000);
  });
  </script>
  
  <style scoped>
  </style>  