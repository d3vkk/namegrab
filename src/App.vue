<template>
  <div id="app">
    <nav class="flex flex-row justify-around p-2 text-xl shadow-md">
      <div @click="toggleAboutPage(false)">
        <img src="img/logo.svg" alt="NameGrab Logo" style="height:30px;" />
      </div>
      <div @click="toggleAboutPage(true)">about</div>
    </nav>
    <main v-show="showAboutPage" class>
      <section class="p-12 text-xl text-center grid-bg">
        <article class="p-4 rounded about-details">
          <p class="mb-2">NameGrab generates names from an Artificial Intelligence Bot 🤖.</p>Feel Free 🖖 to use it for your New 🌟 idea, dog, cat, project, startup, product, gamertag, social media username... You name it 😎!
        </article>
      </section>
    </main>
    <main v-show="!showAboutPage">
      <section class="m-12 text-center">
        <article class="load-animation" v-show="isFetching">
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
        </article>
        <article v-show="!isFetching" ref="showName" class="text-4xl font-bold"></article>
        <article v-show="!isFetching" ref="showSyllables" class="text-2xl italic"></article>
      </section>
      <section class="mx-4 mt-4 mb-8 text-center">
        <button
          class="px-6 py-2 m-2 text-xl shadow primary-btn"
          title="Get Name"
          ref="getName"
          @click="getName()"
          :disabled="isFetching"
          :class="{ 'disabled-btn': isFetching }"
        >Hunt</button>
        <button
          class="px-6 py-2 m-2 text-xl secondary-btn"
          title="Save Name"
          ref="saveName"
          @click="saveName()"
          :disabled="isFetching"
        >Grab</button>
      </section>
      <section class="m-4 text-center">
        <button
          class="mr-3 text-base uppercase tertiary-btn"
          title="Copy Names To Clipboard"
          @click="copyNamesToClipboard()"
        >Copy</button>
        <button class="text-base uppercase tertiary-btn" title="Clear" @click="clearNames()">Clear</button>
      </section>
      <section class="flex flex-row justify-center text-center">
        <article class="mx-4 mb-12 saved-names-box">
          <div v-if="savedNames.length != 0" ref="savedNames" class="p-4 m-4 text-xl">
            <p v-for="(name, nameIndex) in savedNames" :key="nameIndex">
              <span class="inline-block mr-1">{{ name }}</span>
              <span class="text-2xl" @click="removeName(nameIndex)">X</span>
            </p>
          </div>
          <div v-else class="p-4 m-4 text-xl">Saved Names will be shown here</div>
        </article>
      </section>
    </main>
    <section
      class="mx-4 mt-4 mb-12 text-2xl text-center"
      ref="themeSwitcher"
      title="Change Theme"
      @click="toggleTheme()"
    >🌙</section>
    <footer class="p-2">
      <section class="flex flex-row justify-center mx-4 mt-4">
        <img src="img/logo.svg" alt="NameGrab Logo" style="height:50px;" />
      </section>
      <section class="flex flex-col justify-center text-sm text-center">
        <article class="mb-4">
          Made with Inspiration from
          <div>
            <a href="https://find-your-next-startups-name.now.sh">Find Your Next Startup Name</a>
          </div>
          <div>
            <a href="https://www.thisworddoesnotexist.com/">This Word Does Not Exist</a>
          </div>
        </article>
        <p>&copy; 2020 Donald K &bull; MIT License</p>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      scrapedData: {},
      savedNames: [],
      isFetching: false,
      showAboutPage: false,
      isDarkTheme: false,
      themeColors: {
        white: "#fafafa",
        blue: "#232933",
        altBlue: "#3e495b",
      },
    };
  },
  methods: {
    async getName() {
      const res = await fetch(`http://localhost:3000/name`);
      this.isFetching = true;
      if (res.status != 200) {
        console.log(res.status);
      } else {
        this.scrapedData = JSON.parse(await res.json());
        this.isFetching = false;
        this.$refs.showName.innerHTML = this.scrapedData.name;
        this.$refs.showSyllables.innerHTML = this.scrapedData.syllables;
      }
    },
    saveNamesToLocalStorage() {
      localStorage.setItem(
        "savedNames",
        JSON.stringify({ savedNames: this.savedNames })
      );
    },
    saveName() {
      this.savedNames.push(this.scrapedData.name);
      this.saveNamesToLocalStorage();
      this.getName();
    },
    copyNamesToClipboard() {
      var textArea = document.createElement("textarea");
      textArea.value = this.savedNames.join(" ");
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    },
    removeName(nameIndex) {
      this.savedNames.splice(nameIndex, 1);
      this.saveNamesToLocalStorage();
    },
    clearNames() {
      this.savedNames = [];
      this.saveNamesToLocalStorage();
    },
    toggleAboutPage(showOrHide) {
      this.showAboutPage = showOrHide;
    },
    setThemeColor(cssVariable, setColor) {
      document.documentElement.style.setProperty(cssVariable, setColor);
    },
    toggleTheme() {
      if (this.isDarkTheme) {
        this.$refs.themeSwitcher.innerHTML = "🌙";
        this.setThemeColor("--bg-color", this.themeColors.white);
        this.setThemeColor("--text-color", this.themeColors.blue);
        this.setThemeColor("--footer-bg-color", this.themeColors.blue);
        this.setThemeColor("--footer-text-color", this.themeColors.white);
        this.isDarkTheme = false;
      } else {
        this.$refs.themeSwitcher.innerHTML = "🌞";
        this.setThemeColor("--bg-color", this.themeColors.blue);
        this.setThemeColor("--text-color", this.themeColors.white);
        this.setThemeColor("--footer-bg-color", this.themeColors.altBlue);
        this.setThemeColor("--footer-text-color", this.themeColors.white);
        this.isDarkTheme = true;
      }
    },
  },
  created() {
    this.getName();
  },
  mounted() {
    var localStorageNames = localStorage.getItem("savedNames");
    this.savedNames = localStorageNames
      ? JSON.parse(localStorageNames).savedNames
      : [];
  },
};
</script>

<style>
</style>
