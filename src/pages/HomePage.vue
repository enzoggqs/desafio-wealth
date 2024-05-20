<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 class="text-7xl mb-32">Bitcoin Price Tracker</h1>
      <div class="text-center mb-8">
        <p class="text-2xl mb-16">Current Price: {{ currentPrice ? `$${currentPrice}` : 'Loading...' }}</p>
      </div>
      <div class="mb-8">
        <label for="datetime" class="block mb-2">Select Date and Time:</label>
        <input type="datetime-local" v-model="datetime" id="datetime" class="p-2 text-black bg-white"/>
        <button @click="fetchHistoricalPrice" class="ml-2 p-2 bg-blue-500 text-white rounded">Get Price</button>
      </div>
      <div v-if="historicalPrice !== null">
        <p class="text-2xl">Historical Price: ${{ historicalPrice }}</p>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const currentPrice = ref(null);
  const datetime = ref('');
  const historicalPrice = ref(null);
  
  const fetchCurrentPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      currentPrice.value = response.data.bitcoin.usd;
    } catch (error) {
      console.error('Error fetching current price:', error);
    }
  };
  
  const fetchHistoricalPrice = async () => {
    if (!datetime.value) return;
  
    const timestamp = new Date(datetime.value).getTime() / 1000;
    const date = new Date(timestamp * 1000).toLocaleDateString('pt-BR').split('/').join('-')
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${date}&localization=false&precision=2`);
      console.log(response.data)
      historicalPrice.value = response.data.market_data.current_price.usd;
    } catch (error) {
      console.error('Error fetching historical price:', error);
    }
  };
  
  onMounted(() => {
    fetchCurrentPrice();
    setInterval(fetchCurrentPrice, 60000); // Atualiza a cada minuto
  });
</script>
  
<style scoped>
</style>