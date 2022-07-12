<template>
  <div class="card auth-card modal" id="modal1" ref="modals">
    <div class="input-field">
      <i class="material-icons prefix">mode_edit</i>
      <label for="text">Comentarya</label>
      <textarea
        id="text"
        class="materialize-textarea"
        v-model.trim="coment"
        :class="{
          invalid: v$.coment.$error && v$.coment.minLength,
        }"
      ></textarea>
      <small
        class="helper-text invalid"
        v-if="v$.coment.$error && v$.coment.minLength"
        >Comentariyangiz 20 belgidan kam bo'lmasligi kerak!
      </small>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          @click.prevent="submitForm"
          type="submit"
        >
          Qo'shish
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </div>

  <div class="fixed-action-btn">
    <a
      class="btn-floating btn-large red btn modal-trigger"
      href="#modal1"
      data-position="top"
      v-tooltips="'Yaratish'"
    >
      <i class="large material-icons">comment</i>
    </a>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { minLength } from '@vuelidate/validators';
export default {
  created() {},
  data() {
    return {
      v$: useVuelidate(),
      coment: null,
      modal: null,
    };
  },
  validations() {
    return {
      coment: { minLength: minLength(20) },
    };
  },
  props: {},
  mounted() {
    this.modal = M.Modal.init(this.$refs.modals);
  },
  methods: {
    async submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      const addComent = {
        coment: this.coment,
        name: this.name,
      };
      try {
        await this.$store.dispatch('createComent', addComent);
        this.$message("Comontarya qo'shildi");
        this.coment = '';
        this.modal.close();
        this.$emit('updateComent', addComent);
      } catch (e) {}
    },
  },
  emits: ['updateComent'],
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
  destroyed() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
  },
  components: {},
};
</script>

<style scoped></style>
