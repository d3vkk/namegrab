<template>
  <div>
    <div class="p-8 m-4 text-center">
      <div ref="showWord" class="text-4xl font-bold"></div>
      <div ref="showSyllables" class="text-2xl italic"></div>
    </div>
    <div class="p-8 m-4 text-center">
      <button
        class="py-2 px-6 m-4 shadow text-2xl border-2 border-black"
        title="get word"
        ref="getWord"
        @click="getWord()"
      >Hunt</button>
      <button
        class="py-2 px-6 m-4 text-2xl border-2 border-black"
        title="save word"
        ref="saveWord"
        @click="saveWord()"
      >Grab</button>
    </div>
    <div class="p-8 m-4 text-center">
      <div v-if="savedWords.length != 0">
        <div v-for="(word, wordIndex) in savedWords" :key="wordIndex">{{ word }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrapedData: {},
      savedWords: []
    };
  },
  methods: {
    async getWord() {
      const res = await fetch(`http://localhost:3000/word`);
      if (res.status != 200) {
        console.log(res.status);
      } else {
        this.scrapedData = JSON.parse(await res.json());
        this.$refs.showWord.innerHTML = this.scrapedData.word;
        this.$refs.showSyllables.innerHTML = this.scrapedData.syllables;
      }
    },
    saveWord() {
      this.savedWords.push(this.scrapedData.word);
      localStorage.setItem(
        "savedWords",
        JSON.stringify({ savedWords: this.savedWords })
      );
    }
  },
  created() {
    this.getWord();
  },
  mounted() {
    var localStorageWords = JSON.parse(localStorage.getItem("savedWords"));
    this.savedWords =
      localStorageWords == null ? [] : localStorageWords.savedWords;
  }
};
</script>

<style scoped>
</style>
