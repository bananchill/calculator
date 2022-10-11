<template>
  <div class="calc">
    <div class="input_data">
      <div class="cost">
        <span class="cost_title text_calc">
          Стоимость автомобиля
      </span>
        <div class="block_input">
          <div class="block_currency  hint">
            <input type="text" class="cost_input input" v-model="price">
            <span class="currency">₽</span>
          </div>
          <input
              type="range"
              max="6000000"
              min="1000000"
              step="1"
              @change="editCost($event.target.value)"
              @mousemove="editCost($event.target.value)"
              ref="range"
              value="3000000"
              class="cost_range styled-slider slider-progress">
        </div>
      </div>

      <div class="contribution">
        <span class="contribution_title text_calc">
          Первоначальный взнос
      </span>
        <div class="block_input">
          <div class="block_percent_input hint">
            <input type="text" class="contribution_input input" v-model="initial">
            <span class="percent">{{ percent }}%</span>
          </div>
          <input
              type="range"
              max="60"
              min="10"
              step="1"
              @change="editPercent($event.target.value)"
              @mousemove="editPercent($event.target.value)"
              ref="range"
              value="10"
              class="contribution_range styled-slider slider-progress">
        </div>
      </div>

      <div class="leasing">
        <span class="leasing_title text_calc">
          Срок лизинга
      </span>
        <div class="block_input">
          <div class="block_count_month hint">
            <input type="text" class="leasing_input input" v-model="months">
            <span class="month"> мес.</span>
          </div>
          <input
              type="range"
              max="60"
              min="1"
              step="1"
              @change="editMonth($event.target.value)"
              @mousemove="editMonth($event.target.value)"
              ref="range"
              value="1"
              class="leasing_range styled-slider slider-progress">
        </div>
      </div>
    </div>

    <div class="payed">
      <div class="amount_leasing">
        <span class="title text_calc">
          Сумма договора лизинга
        </span>
        <br>
        <span class="amount pay_span">
            {{ leasing }}
        </span>
      </div>
      <div class="month_payed ">
        <span class="title text_calc">
        Ежемесячный платеж от
        </span>
        <br>
        <span class="amount pay_span">
            {{ monthPay }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CalcComponent",
  data() {
    return {
      price: 3000000,
      percent: 10,
      months: 1,
      initial: 0,
      leasing: 0,
      monthPay: 0,
    }
  },
  emits: ['update:purchaseDocument'],
  watch: {},
  mounted() {
    this.editInitial();

  },
  methods: {
    editCost(newValue) {
      this.price = newValue;
      this.editInitial();
    },
    editPercent(newValue) {
      this.percent = newValue;
      this.editInitial();
    },
    editMonth(newValue) {
      this.months = newValue;
      this.editInitial();
    },
    editInitial() {
      this.initial = Math.floor((this.percent / 100) * this.price);
      this.monthlyPayment();
      this.amountLeasing();
      this.$emit('update:purchaseDocument', {
        car_coast: this.price,
        initail_payment: this.initial,
        initail_payment_percent: this.percent,
        lease_term: this.months,
        total_sum: this.leasing,
        monthly_payment_from: this.monthPay
      })
    },
    monthlyPayment() {
      this.monthPay = Math.floor((this.price - this.initial) * ((0.035 * Math.pow((1 + 0.035),
          this.months)) / (Math.pow((1 + 0.035), this.months) - 1)));
    },
    amountLeasing() {
      this.leasing = this.initial + this.months * this.monthPay;
    }


  }
}
</script>

<style lang="scss" scoped>
@import "styles/calcComponent.scss";
</style>
