<script setup>
import { onMounted, ref } from "vue";
import jsQR from "jsqr";

const camRef = ref(null);
const cbsRef = ref(null);
const wRef = ref(null);
const hRef = ref(null);
const resultRef = ref("HELLO");

const emit = defineEmits(
  ["qr_text"]
)

const options = {
  video: {
    facingMode: {
      exact: 'environment'
    }
  },
  audio: false
}
const getStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(options);
    camRef.value.srcObject = stream;
  } catch (err) {
    console.log(err);
    if (err.name === "OverconstrainedError") {
      options.video = true;
      getStream();
    }
  }
}
getStream();
const draw = () => {
  if (cbsRef.value) {
    const ctx = cbsRef.value.getContext("2d");
    wRef.value = camRef.value.videoWidth;
    hRef.value = camRef.value.videoHeight;
    ctx.drawImage(camRef.value, 0, 0, wRef.value, hRef.value);
    if (camRef.value.readyState === camRef.value.HAVE_ENOUGH_DATA && ctx.canvas.width !== 0) {
      // const ctx = cbsRef.value.getContext("2d");
      const img = ctx.getImageData(0, 0, cbsRef.value.width, cbsRef.value.height);
      const code = jsQR(img.data, img.width, img.height);
      if (code) {
        console.log(code);
        resultRef.value = code.data;
        navigator.vibrate(200);
        emit("qr_text", code.data);
      }
    }
  }
}
setInterval(draw, 500);

const isUrl = (txt) => {
  return txt.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g);
}

onMounted(() => draw());

</script>

<template>
  <video ref="camRef" muted autoplay></video>
  <a :href="resultRef" v-if="isUrl(resultRef)">{{ resultRef }}</a>
  <div v-else>{{ resultRef }}</div>
  <canvas v-show="false" ref="cbsRef" class="cbs" :width="wRef" :height="hRef"></canvas>
</template>

<style>
video, canvas {
  width: 70vw;
}
</style>