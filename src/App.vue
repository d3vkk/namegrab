<template>
  <div id="app">
    <nav class="p-2 flex-row flex justify-around text-xl shadow-md">
      <div @click="toggleAboutPage(false)">
        <img src="img/logo.svg" alt="NameGrab Logo" style="height:30px;" />
      </div>
      <div @click="toggleAboutPage(true)">about</div>
    </nav>
    <div v-show="showAboutPage" class>
      <div class="p-12 text-center grid-bg text-xl">
        <div class="rounded p-4 about-details">
          <div class="mb-2">NameGrab generates names from an Artificial Intelligence Bot 🤖.</div>Feel Free 🖖 to use it for your New 🌟 idea, dog, cat, project, startup, product, gamertag, social media username... You name it 😎!
        </div>
      </div>
    </div>
    <div v-show="!showAboutPage">
      <div class="m-12 text-center">
        <div class="load-animation" v-show="isFetching">
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
        </div>
        <div v-show="!isFetching" ref="showName" class="text-4xl font-bold"></div>
        <div v-show="!isFetching" ref="showSyllables" class="text-2xl italic"></div>
      </div>
      <div class="mx-4 mt-4 mb-8 text-center">
        <button
          class="py-2 px-6 m-2 shadow text-xl primary-btn"
          title="Get Name"
          ref="getName"
          @click="getName()"
          :disabled="isFetching"
          :class="{ 'disabled-btn': isFetching }"
        >Hunt</button>
        <button
          class="py-2 px-6 m-2 text-xl secondary-btn"
          title="Save Name"
          ref="saveName"
          @click="saveName()"
          :disabled="isFetching"
        >Grab</button>
      </div>
      <div class="m-4 text-center">
        <button
          class="text-base tertiary-btn uppercase mr-3"
          title="Copy Names To Clipboard"
          @click="copyNamesToClipboard()"
        >Copy</button>
        <button class="text-base tertiary-btn uppercase" title="Clear" @click="clearNames()">Clear</button>
      </div>
      <div class="flex flex-row justify-center text-center">
        <div class="mx-4 mb-12 saved-names-box">
          <div v-if="savedNames.length != 0" ref="savedNames" class="m-4 p-4 text-xl">
            <div v-for="(name, nameIndex) in savedNames" :key="nameIndex">
              <span class="inline-block mr-1">{{ name }}</span>
              <span class="text-xl" @click="removeName(nameIndex)">X</span>
            </div>
          </div>
          <div v-else>
            Saved Names will be shown here
          </div>
        </div>
      </div>
    </div>
    <div
      class="mx-4 mt-4 mb-12 text-2xl text-center"
      ref="themeSwitcher"
      title="Change Theme"
      @click="toggleTheme()"
    >🌙</div>
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
        altBlue: "#3e495b"
      }
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
    }
  },
  created() {
    this.getName();
  },
  mounted() {
    var localStorageNames = localStorage.getItem("savedNames");
    this.savedNames = localStorageNames
      ? JSON.parse(localStorageNames).savedNames
      : [];
  }
};
</script>

<style>
</style>
