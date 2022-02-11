<template>
  <button v-on:click="download()" class="w-48 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 my-4 rounded border-2 border-stone-900">
    <span>Fantia</span>
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { browser } from 'webextension-polyfill-ts';
import { Notificator } from '../helper/Notificator';
import { UtilityHelper } from '../helper/UtilityHelper';

export default defineComponent({
  name: "FantiaDownload",
  methods: {
    async download() {
      const [tab = null] = await browser.tabs.query({active: true, currentWindow: true});
      if (tab === null || !tab.id || !tab.url) {
        return;
      }

      await Notificator.start(tab.url);
      const {urls, name, page} = await browser.tabs.sendMessage(tab.id as number, {text: 'fantia'});

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const response = await fetch(url);
        const body = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(body, 'text/html');

        const resolvedUrl = doc.querySelector('img')?.src ?? '';
        const filename = new URL(resolvedUrl).pathname.split('/').pop();
        await browser.downloads.download({
          url: resolvedUrl,
          conflictAction: 'uniquify',
          filename: `Fansite-downloader/fantia/${name} - ${page}/p${i + 1}_${filename}`,
          saveAs: false,
        });
        await UtilityHelper.wait(100);
      }

      await Notificator.end(tab.url);
    }
  }
})
</script>

<style scoped>
button {
  background: linear-gradient(131deg, #98C753, #E4228C, #993C8D, #1AAAA2, #4C4C85, #F47F55);
  color: #FFFFFF;
}
</style>
