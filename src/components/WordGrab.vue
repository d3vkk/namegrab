<template>
  <div>
    <div class="p-8 m-4 text-center">
      <div ref="gottenWord" class="text-4xl font-bold"></div>
      <div ref="gottenSyllables" class="text-2xl italic"></div>
    </div>
    <div class="p-8 m-4 text-center">
      <button
        class="py-2 px-6 m-4 shadow text-2xl border-2 border-black"
        title="get word"
        ref="getWord"
        @click="getWord()"
      >Hunt</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async getWord() {
      const res = await fetch(`http://localhost:3000/word`);
      if (res.status != 200) {
        console.log(res.status);
      } else {
        const scrapedData = JSON.parse(await res.json());
        this.$refs.gottenWord.innerHTML = scrapedData.word;
        this.$refs.gottenSyllables.innerHTML = scrapedData.syllables;
      }
    }
  },
  created() {
    this.getWord();
  }
};
</script>

<style scoped>
</style>
