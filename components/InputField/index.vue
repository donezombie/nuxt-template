<template lang="">
  <b-form-group :label="label" :label-for="name" :description="description">
    <b-form-input
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      :state="isValid"
      @blur="onBlur"
      @input="handleChange"
    />

    <b-form-invalid-feedback :id="name" :state="isValid">
      {{ feedBack }}
    </b-form-invalid-feedback>
  </b-form-group>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    validation: {
      type: String,
      default: ""
    }
  },

  methods: {
    onBlur: function(e) {
      this.$emit("onBlur", { name: this.name, target: e });
    },
    handleChange: function(value) {
      this.$emit("onChange", { name: this.name, value });
    }
  },
  computed: {
    isValid: function() {
      if (this.validation === "") {
        return null;
      }
      return !this.validation;
    },
    feedBack: function() {
      return this.validation;
    }
  }
};
</script>
<style lang=""></style>
