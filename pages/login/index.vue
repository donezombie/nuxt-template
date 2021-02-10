<template lang="">
  <div class="login">
    <div class="login__form rounded">
      <h1>Login Form</h1>
      <b-form @submit.stop.prevent="onSubmit">
        <InputField
          label="Username:"
          name="username"
          placeholder="Enter username"
          :value="formValues.username"
          :validation="errors.username"
          @onChange="onChange"
          @onBlur="onBlur"
          description="Hint: don"
        />

        <InputField
          type="password"
          label="Password:"
          name="password"
          placeholder="Enter password"
          :validation="errors.password"
          :value="formValues.password"
          @onChange="onChange"
          @onBlur="onBlur"
          description="Hint: don"
        />

        <span style="color: red">{{ messageErrorFromAPI }}</span>
        <div class="d-flex justify-content-end">
          <b-spinner
            v-if="isLoading"
            variant="primary"
            type="grow"
            label="Spinning"
          ></b-spinner>
          <b-button type="submit" variant="primary" v-else>
            Login
          </b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import InputField from "@/components/InputField";
import { loginFormSchema } from "@/consts/validationSchema";
import { handleErrorValidate } from "@/helpers";
import mutationTypes from "@/consts/mutationTypes";

export default {
  components: {
    InputField
  },

  data() {
    return {
      validated: false,
      formValues: {
        username: "",
        password: ""
      },
      errors: {
        username: "",
        password: ""
      },
      messageErrorFromAPI: "",
      isLoading: false
    };
  },
  methods: {
    validate(field) {
      loginFormSchema
        .validateAt(field, this.formValues)
        .then(() => {
          this.errors[field] = "";
        })
        .catch(err => {
          this.errors[field] = err.message;
        });
    },

    onChange(target) {
      this.formValues[target.name] = target.value;
      this.validate(target.name);
    },

    onBlur(target) {
      this.validate(target.name);
    },

    onSubmit() {
      this.isLoading = true;
      loginFormSchema
        .validate(this.formValues, { abortEarly: false })
        .then(async () => {
          this.errors = {};
          const result = await this.$store.dispatch(
            `auth/${mutationTypes.AUTH.LOGIN}`,
            {
              username: this.formValues.username,
              password: this.formValues.password
            }
          );
          this.isLoading = false;

          if (result === 200) {
            this.$router.push("/");
          } else {
            this.messageErrorFromAPI =
              "Username or password was wrong, Please try again with don & don";
          }
        })
        .catch(
          handleErrorValidate(this.errors, () => {
            this.isLoading = false;
          })
        );
    }
  }
};
</script>
<style lang=""></style>
