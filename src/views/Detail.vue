<template>
  <div class="conter">
    <Hero :titles="title" />
    <Loader v-if="loading" />
    <div v-else-if="record" v-for="rec of record" :key="rec">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb blue">Qaytish</router-link>
        <a @click.prevent class="breadcrumb"
          >{{ rec.type === 'income' ? 'Kirim' : 'Chiqim' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card red"
            :class="{
              red: rec.type === 'outcome',
              green: rec.type === 'income',
            }"
          >
            <div class="card-content">
              <p>Tavsif: {{ rec.description }}</p>
              <p>Miqdor: {{ $filters.curr(rec.amount, 'RUB') }}</p>
              <p>Toifa: {{ rec.catName }}</p>

              <small>{{ $filters.date(rec.date, 'datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Bunaqa {{ $route.params.id }} ID topilmadi!</p>
  </div>
</template>
<script>
import Hero from '@/components/apps/Hero.vue';
export default {
  name: 'Detail',
  data() {
    return {
      title: 'Batafsil',
      record: null,
      loading: true,
      catNames: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const records = await this.$store.dispatch('fetchRecordById', id);
    this.catNames = await this.$store.dispatch('fetchCategories');
    this.record = records.map((record) => {
      return {
        ...record,
        catName: this.catNames.find((c) => c.id === record.categoryId).title,
      };
    });
    this.loading = false;
  },
  components: { Hero },
};
</script>
