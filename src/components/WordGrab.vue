<template>
  <div class="p-8 m-4 text-center">
    <div ref="gottenWord" class="text-4xl font-bold"></div>
    <div ref="gottenSyllables" class="text-2xl italic"></div>
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
        const gottenWord = JSON.parse(await res.json());
        this.$refs.gottenWord.innerHTML = gottenWord.word;
        this.$refs.gottenSyllables.innerHTML = gottenWord.syllables;
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
