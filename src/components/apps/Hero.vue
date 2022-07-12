<template>
  <div class="col s12">
    <ul class="collection">
      <li class="collection-item avatar grey darken-3">
        <img class="circle" src="@/image/03.jpg" />
        <span class="title">{{ $filters.date(date, 'datetime') }}</span>
        <a href="#!" class="secondary-content"
          ><i class="material-icons">grade</i></a
        >
        <h4 class="center">{{ titles }}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  created() {},
  data() {
    return {
      date: new Date(),
    };
  },
  async mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  props: ['titles'],
  methods: {},
};
</script>

<style lang="scss" scoped></style>
