<template>
  <div class="coment-card conter">
    <Hero :titles="$filters.local('Coment')" />

    <ComentAdd @updateComent="updateComents" />

    <Loader v-if="loading" />

    <p class="center red" v-else-if="!items">
      {{ $filters.local('noComent') }}
    </p>

    <div
      v-else
      class="row collection text-col"
      v-for="com in items"
      :key="com + addCount"
    >
      <div class="col s9">
        <p>{{ com.coment }}</p>
      </div>
      <div class="chip secondary-content">
        <img alt="Contact Person" src="../image/01.jpg" />
        {{ com.name }}
      </div>
    </div>
    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageHendler"
      :prev-text="$filters.local('Orqaga')"
      :next-text="$filters.local('Oldinga')"
      :container-class="'pagination center'"
      :page-class="'waves-effect'"
    />
  </div>
</template>

<script>
import Hero from '@/components/apps/Hero.vue';
import Loader from '@/components/apps/Loader.vue';
import ComentAdd from '@/components/ComentAdd.vue';
import pagination from '../mixins/paginete';
export default {
  name: 'Coments',
  mixins: [pagination],
  created() {},
  data() {
    return {
      loading: true,
      addCount: 0,
    };
  },
  async mounted() {
    this.setPagination(await this.$store.dispatch('fetchComent'));
    this.loading = false;
  },
  props: {},
  methods: {
    updateComents(come) {
      this.items.name = come.name;
      this.items.coment = come.coment;
      this.addCount++;
      console.log(this.items);
    },
  },
  components: { Hero, Loader, ComentAdd },
};
</script>

<style lang="scss" scoped></style>
