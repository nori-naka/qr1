<script setup>
import { ref } from "vue";
import QrGen from "./components/QrGen.vue";
import QrDec from "./components/QrDec.vue";

const qr_text = ref("");
const qr_text_change = (val) => {
  qr_text.value = val;
}
</script>

<template>

  <div class="tab_container">
    <input id="tab1" type="radio" name="tab_item" checked>
    <label class="tab_item" for="tab1">QRコード生成</label>
    <input id="tab2" type="radio" name="tab_item">
    <label class="tab_item" for="tab2">QRコード検出</label>
    <div class="tab_content" id="tab1_content">
      <div class="tab_content_description">
        <qr-gen :qr_text="qr_text"></qr-gen>
      </div>
    </div>
    <div class="tab_content" id="tab2_content">
      <div class="tab_content_description">
        <qr-dec @qr_text="qr_text_change"></qr-dec>
      </div>
    </div>
  </div>

</template>

<style scoped>
.tab_container {
  padding-bottom: 1em;
  background-color: #fff;
  border:1px solid #37beb0;
  margin: 0 auto;}
.tab_item {
  width: calc(100%/2);
  padding:15px 0;
  border-bottom: 3px solid #37beb0 ;
  background-color: #ececec;
  text-align: center;
  color: #37beb0 ;
  display: block;
  float: left;
  text-align: center;
  font-weight: bold;
  transition: all 0.2s ease;
}
.tab_item:hover {
  opacity: 0.75;
}
input[name="tab_item"] {
  display: none;
}
.tab_content {
  display: none;
  padding: 1em 1em 0;
  clear: both;
  overflow: hidden;
}
#tab1:checked ~ #tab1_content,
#tab2:checked ~ #tab2_content,
#tab3:checked ~ #tab3_content,
#tab4:checked ~ #tab4_content {
  display: block;
}
.tab_container input:checked + .tab_item {
  background-color: #37beb0 ;
  color: #fff;
}
</style>