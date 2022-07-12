<template>
  <nav class="grey darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Xisob-Kitob</router-link>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul class="right">
        <li>
          <a class="dropdown-trigger" data-target="dropdown1" ref="dropdown"
            >{{ name }}<i class="material-icons right">arrow_drop_down</i></a
          >
        </li>
      </ul>
      <ul class="right hide-on-med-and-down">
        <li>
          <router-link
            class="waves-effect"
            v-for="link of links"
            :key="link.url"
            active-class="active"
            :to="link.url"
          >
            {{ link.title }}</router-link
          >
        </li>
      </ul>
    </div>
  </nav>

  <ul id="dropdown1" class="dropdown-content">
    <li><router-link to="/profile">Profile</router-link></li>
    <li><a href="#" @click.prevent="logout">Chiqish</a></li>
  </ul>

  <ul id="mobile-demo" class="sidenav grey darken-1" ref="navmenu">
    <li class="center">
      <h3>Murod_off</h3>
    </li>
    <li><div class="divider"></div></li>
    <li>
      <router-link
        class="waves-effect"
        v-for="link of links"
        :key="link.url"
        active-class="active"
        :to="link.url"
        @click="navi.close()"
      >
        {{ link.title }}</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HeaderCard',
  created() {},
  data() {
    return {
      dropdown: null,
      navi: null,
      links: [
        { title: 'Record', url: '/record' },
        { title: 'History', url: '/history' },
        { title: 'Planning', url: '/planning' },
        { title: 'Categories', url: '/categories' },
        { title: 'Coments', url: '/coments' },
      ],
    };
  },
  props: {},
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    });
    this.navi = M.Sidenav.init(this.$refs.navmenu, {
      draggable: false,
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
};
</script>

<style lang="scss" scoped></style>
