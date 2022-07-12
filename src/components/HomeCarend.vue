<template>
  <div class="col s12 m6 l8">
    <div class="card bill-card">
      <div class="card-content">
        <div class="card-header">
          <span class="card-title">Valyuta kursi</span>
        </div>
        <table>
          <thead>
            <tr class="currency-line">
              <th>Valyuta</th>
              <th>Kurs</th>
              <th>Sana</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="curns in curren" :key="curns" class="currency-line">
              <th>{{ curns }}</th>
              <th>{{ rates[curns].toFixed(2) }}</th>
              <th>{{ $filters.date(date, 'date') }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCarend',
  created() {},
  data() {
    return {
      curren: ['RUB', 'USD', 'UZS'],
    };
  },
  props: ['rates', 'date'],
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
