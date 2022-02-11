<template>
  <button class="patreon w-48 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 my-4 rounded border-2 border-stone-900"
          v-on:click="download()">
    <span>Patreon</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { browser } from 'webextension-polyfill-ts';
import { Notificator } from '../helper/Notificator';

export default defineComponent({
  methods: {
    async download() {
      const [tab = null] = await browser.tabs.query({active: true, currentWindow: true});
      if (tab === null || !tab.id || !tab.url) {
        return;
      }

      await Notificator.start(tab.url);
      const {author, title, images} = await browser.tabs.sendMessage(tab.id as number, {text: 'patreon'});

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const url = new URL(image);
        const [postId, imageId] = url.pathname.split('/').splice(5, 2);
        const ext = url.pathname.split('.').pop();
        const filename = `Fansite-downloader/patreon/${author.replaceAll('/', '／')} - ${title.replaceAll('/', '／')}(${postId})/p${i + 1}_${imageId}.${ext}`;
        await browser.downloads.download({
          url: image,
          conflictAction: 'uniquify',
          filename,
          saveAs: false,
        });
      }

      await Notificator.end(tab.url);
    }
  }
})
</script>

<style scoped>
button {
  background-color: #FF424D;
  color: #ffffff;
}
</style>
