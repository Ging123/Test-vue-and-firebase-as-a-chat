<template>
  <ActionContainer image="login-bg.webp" center="true">
    <FormContainer title="LOGIN" :submit="login">
      <Input 
        type="email"
        placeholder="EMAIL" 
        required
        id="email"
        :change="updateInput"
        :value="user.email"
      />
      <Input 
        :class="$style.passwordInput"
        type="password"
        placeholder="PASSWORD"
        id="password" 
        :value="user.password"
        :change="updateInput"
        required
      />
      <Button
        class="opacity-effect"
        content="LOGIN"
        type="submit"
        :loading="loading"
      />
      <p v-if="error" style="color:red;">
        {{ error }}
      </p>
      <p>
        Don't have an account ? <router-link class="opacity-effect" to="/sing-up">Sign up</router-link>
      </p>
    </FormContainer>
  </ActionContainer>
</template>

<script>

import ActionContainer from "@/components/containers/ActionContainer";

import FormContainer from "@/components/containers/FormContainer";
import Button from "@/components/Buttons/Primary";

import Input from "@/components/inputs/primary";
import api from "@/services/api";

export default {
  name: "HomeView",
  methods: {
    updateInput(e) {
      const id = e.target.id;
      const value = e.target.value;
      if(id) this.user[id] = value;
    },

    async login() {
      this.loading = true;
      const result = await api.login(this.user.email, this.user.password);

      if(result === true) return this.$router.push("/chat");
      else this.error = this.getErrorMessage(result);

      this.loading = false;
    },

    getErrorMessage(error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") return "The email address or password is incorrect. Please try again.";
      return "An error occurred. Please try again.";
    }
  },
  data() {
    return {
      error:"",
      loading:false,
      user: {
        email:"",
        password:""
      }
    }
  },
  components: {
    FormContainer,
    ActionContainer,
    Input,
    Button
  },
};
</script>

<style module scoped>

  .passwordInput {
    margin:15px 0 ;
  }

  p {
    text-align:center;
  }

  p a {
    color:var(--primary);
  }

</style>