<template>
  <div class="main">
    <div class="title">
      <span class="title__calc">
          Рассчитайте стоимость автомобиля в лизинг
      </span>
    </div>
    <div class="application">
      <CalcComponent
          class="calc__component"
          v-model:purchaseDocument="purchaseDocument"/>
      <button
          class="send_application"
          @click="sendDocument()"
          :disabled="disabled"

      >
        <span>
          Оставить заявку
        </span>
      </button>
    </div>

  </div>
</template>

<script>

import CalcComponent from "@/components/CalcComponent";

export default {
  name: "MainPage",
  components: {
    CalcComponent
  },
  data() {
    return {
      purchaseDocument: {
        type: Object,
        default: () => {
        }
      },
      disabled: false,
    }
  },
  computed: {
    leasingApi() {
      return this.$app.interfaces.leasingApi
    },

  },
  methods: {
    async sendDocument() {
      try {
        this.disabledButton()
        await this.leasingApi.sendDataAsync(this.purchaseDocument);
        this.disabledButton()
      } catch (e) {
        console.error(`send document failed ${e.message}`)
        this.disabledButton()
      }
    },
    disabledButton() {
      this.disabled = !this.disabled
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/app.scss";

</style>
