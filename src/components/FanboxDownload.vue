<template>
  <button v-on:click="download()" class="fanbox w-48 hover:bg-gray-400 text-gray-800 font-bold py-2 my-4 px-4 rounded border-2 border-stone-900">
    <span>Fanbox</span>
  </button>
</template>

<script>
import {defineComponent} from "vue";
import {browser} from "webextension-polyfill-ts";
import {Notificator} from "../helper/Notificator";
import {UtilityHelper} from "../helper/UtilityHelper";

export default defineComponent({
  name: "FanboxDownload",
  methods: {
    async download() {
      const [tab = null] = await browser.tabs.query({active: true, currentWindow: true});
      if (tab === null || !tab.id || !tab.url) {
        return;
      }

      await Notificator.start(tab.url);
      const {urls, author, title} = await browser.tabs.sendMessage(tab.id, {text: 'fanbox'});

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const filename = new URL(url).pathname.split('/').pop();
        await browser.downloads.download({
          url,
          conflictAction: 'uniquify',
          filename: `Fansite-downloader/fanbox/${author} - ${title}/p${i + 1}_${filename}`,
          saveAs: false,
        });
        await UtilityHelper.wait(100);
      }

      await Notificator.end(tab.url);
    }
  }
});
</script>

<style scoped>
button {
  background: linear-gradient(131deg, #000000, #333333);
  color: #ffffff;
}
</style>
