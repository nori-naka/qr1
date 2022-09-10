<script setup>
import { ref } from "vue"
import QRCode from "qrcode"

const props = defineProps({
  qr_text: String,
})

const inputRef = ref(null);
const qrImag = ref(null);

const keyEvent = (ev) => {
  if (ev.keyCode === 13) qr_gen();
}
const qr_gen = async () => {
  try {
    const qrUrl = await QRCode.toDataURL(inputRef.value.value);
    qrImag.value.src = qrUrl;
    console.log(qrUrl);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div>
    <div class="input-bar">
      <input ref="inputRef" type="text" :value="qr_text" @keypress="keyEvent" @blur="qr_gen" class="input-url"/>
    </div>
    <img ref="qrImag" />
  </div>
</template>

<style>
.input-bar {
  display: flex;
  align-content: space-between;
  justify-content: center;
  align-items: baseline;
  width: 100%;
}
.input-url {
  border:0;
  padding:10px;
  font-size:1.3em;
  font-family:Arial, sans-serif;
  color:#aaa;
  border:solid 1px #ccc;
  margin:0 0 20px;
  width:80%;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
}
.input-url:focus {
  border:solid 1px #EEA34A;
}
</style>