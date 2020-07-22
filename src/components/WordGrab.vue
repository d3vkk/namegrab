<template>
  <div>
    <div class="p-8 m-4 text-center">
      <div class="load-animation" v-show="isFetching">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
      <div v-show="!isFetching" ref="showWord" class="text-4xl font-bold"></div>
      <div v-show="!isFetching" ref="showSyllables" class="text-2xl italic"></div>
    </div>
    <div class="p-8 m-4 text-center">
      <button
        class="py-2 px-6 m-4 shadow text-2xl border-2 border-black primary-btn"
        title="get word"
        ref="getWord"
        @click="getWord()"
        :disabled="isFetching"
        :class="{ 'disabled-btn': isFetching }"
      >Hunt</button>
      <button
        class="py-2 px-6 m-4 text-2xl border-2 border-black secondary-btn"
        title="save word"
        ref="saveWord"
        @click="saveWord()"
        :disabled="isFetching"
      >Grab</button>
    </div>
    <div class="pt-8 mt-4 text-center">
      <button
        class="text-base tertiary-btn uppercase"
        title="Copy Words To Clipboard"
        ref="saveWord"
        @click="copyWordsToClipboard()"
      >Copy</button>
    </div>
    <div class="my-4 mx-40 text-center saved-words-box">
      <div v-if="savedWords.length != 0" ref="savedWords" class="m-4 text-xl p-4">
        <div v-for="(word, wordIndex) in savedWords" :key="wordIndex">
          <span class="inline-block mr-1">{{ word }}</span>
          <span class="text-xl" @click="removeWord(wordIndex)">X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrapedData: {},
      savedWords: [],
      isFetching: false
    };
  },
  methods: {
    async getWord() {
      const res = await fetch(`http://localhost:3000/word`);
      this.isFetching = true;
      if (res.status != 200) {
        console.log(res.status);
      } else {
        this.scrapedData = JSON.parse(await res.json());
        this.isFetching = false;
        this.$refs.showWord.innerHTML = this.scrapedData.word;
        this.$refs.showSyllables.innerHTML = this.scrapedData.syllables;
      }
    },
    saveWordsToLocalStorage() {
      localStorage.setItem(
        "savedWords",
        JSON.stringify({ savedWords: this.savedWords })
      );
    },
    saveWord() {
      this.savedWords.push(this.scrapedData.word);
      this.saveWordsToLocalStorage();
      this.getWord();
    },
    copyWordsToClipboard() {
      var textArea = document.createElement("textarea");
      textArea.value = this.savedWords.join(" ");
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    },
    removeWord(wordIndex) {
      this.savedWords.splice(wordIndex, 1);
      this.saveWordsToLocalStorage();
    }
  },
  created() {
    this.getWord();
  },
  mounted() {
    var localStorageWords = localStorage.getItem("savedWords");
    this.savedWords = localStorageWords
      ? JSON.parse(localStorageWords).savedWords
      : [];
  }
};
</script>

<style scoped>
</style>
