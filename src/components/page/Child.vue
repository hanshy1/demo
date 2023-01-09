<template>
  <div>
    <div class="form-area">
      <v-form
        ref="calcForm"
        v-model="isFormValid"
        lazy-validation>
        <v-container>
          <v-row>
            <v-col 
              cols="12"
              sm="4">
              <div class="header-container">
                <v-radio-group 
                  v-model="repaymentType" 
                  row>
                  <v-radio
                    v-for="type in repaymentTypeGroup"
                    :key="type.type"
                    :label="`Radio ${n}`"
                    :value="type.value" />
                </v-radio-group>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="textFieldItem in textFields"
              :key="textFieldItem.id"
              cols="12"
              sm="4">
              <v-text-field
                v-model="$data[textFieldItem.id]"
                :rules="textFieldItem.validate"
                :label="textFieldItem.id + ':'"
                :suffix="textFieldItem.suffix"
                required
                clearable />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="4">
              <div class="footer-button">
                <v-btn
                  outlined
                  color="indigo"
                  @click="getCalcResult()">
                  <v-icon>mdi-calculator</v-icon>Calculate
                </v-btn>
                <v-btn
                  outlined
                  color="green"
                  @click="clearResult()">
                  <v-icon>mdi-cached</v-icon>Clear
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <div
      v-if="isShowResultArea"
      class="result-area">
      <span>{{ result_loan }}</span>
      <div class="repayment_list">
        <ul>
          <li
            v-for="res, index in result_arr"
            :key="index">
            {{ `${index+1}-principal: ${res.principal} loan: ${res.loan} total: ${res.principal + res.loan}` }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Child extends Vue {
  private loanTotal = ''
  private loanMonth = ''
  private annualInterestRate = '4.9'

  private result_arr = []
  private result_loan = 0
  private isShowResultArea = false
  private isFormValid = true

  private repaymentType = '1'

  private repaymentTypeGroup = [
    { type: '1', value: '1' },
    { type: '2', value: '2' }
  ]

  private textFields = [
    { 
      id: 'loanTotal',
      validate: [
        (v: number) => !!v || v == 0 || 'loanTotal is required',
        (v: string) => (Number(v) && parseFloat(v) > 0) || 'loanTotal must be number and more than 0',
      ],
      suffix: 'W'
    },
    { 
      id: 'loanMonth',
      validate: [
        (v: number) => !!v || v == 0 || 'loanMonth is required',
        (v: string) => (Number(v) && parseFloat(v) > 0) || 'loanMonth must be number and more than 0',
      ],
      suffix: 'month'
    },
    { 
      id: 'annualInterestRate',
      validate: [
        (v: number) => !!v || 'annualInterestRate is required',
        (v: string) => (Number(v) && parseFloat(v) > 0 && parseFloat(v) < 100) || 'annualInterestRate must be number and more than 0 or less than 100',
      ],
      suffix: '%'
    }
  ]

  mounted(): void {
    // document.body.append(this.$el)
  }

  destroyed(): void {
    this.$el.remove()
    const ele = document.createElement('span')
    const innerText = 'destoryed'
    document.body.append(ele)
    let count = 5
    const interval = setInterval(() => {
      if (count < 0) {
        clearInterval(interval)
        ele.remove()
      }
      const suffix = ['·', '· ·', '· · ·', '· · · ·']
      ele.innerText = innerText + ' ' + (count--) + ' ' + (count >= 0 ?suffix[(suffix.length - 1) - count % suffix.length]: '')
    }, 1000)
  }

  getCalcResult(): void {
    if (this.repaymentType == '1') {
      this.calculate()
    } else {
      this.calculate1()
    }
  }

  calculate(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!this.$refs.calcForm?.validate()) {
      return
    }
    this.result_loan = 0
    this.result_arr = []
    const total = parseFloat(this.loanTotal) * 10000
    const months = parseInt(this.loanMonth)
    const per_year_rate = parseFloat(this.annualInterestRate) / 100
    const per_month_rate = Math.round(per_year_rate * 100000 / 12) / 100000
    const per_month_principal = Math.round((total / months))
    let loan_overrage = total
    for (let i = 0; i < months; i ++) {
      loan_overrage = total - (per_month_principal * i)
      this.result_loan += loan_overrage * per_month_rate
      this.result_arr.push({ principal: per_month_principal, loan: Math.round(loan_overrage * per_month_rate * 100) / 100 })
    }
    this.isShowResultArea = true
  }

  calculate1(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!this.$refs.calcForm?.validate()) {
      return
    }
    this.result_loan = 0
    this.result_arr = []
    const total = parseFloat(this.loanTotal) * 10000
    const months = parseInt(this.loanMonth)
    const per_year_rate = parseFloat(this.annualInterestRate) / 100
    const per_month_rate = Math.round(per_year_rate * 100000 / 12) / 100000
    const per_repayment = 
      total * ((per_month_rate * Math.pow(1 + per_month_rate, months)) / (Math.pow(1 + per_month_rate, months) - 1))
    this.result_loan = per_repayment * months - total
    for (let i = 1; i <= months; i ++) {
      let per_month_interest = total * per_month_rate * ((Math.pow(1+per_month_rate, months) - Math.pow(1+per_month_rate, (i - 1))) / (Math.pow(1 + per_month_rate, months) - 1))
      let per_month_principal = total * per_month_rate * (Math.pow(1+per_month_rate, (i - 1)) / (Math.pow(1 + per_month_rate, months) - 1))
      this.result_arr.push({ principal: Math.round(per_month_principal * 100) / 100, loan: Math.round(per_month_interest * 100) / 100 })
    }

    this.isShowResultArea = true
  }

  clearResult(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.calcForm?.resetValidation()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.assign(this.$data, this.$options.data.call(this))
  }
}
</script>
<style scoped>
  .form-area {
    width: 100%;
  }

  .footer-button button {
    margin-right: 10px;
  }

  .result-area {
    width: 600px;

  }

  .repayment_list {
    max-height: 400px;
    overflow: auto;
  }
</style>
