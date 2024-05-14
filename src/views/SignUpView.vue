<template>
  <ActionContainer image="sign-up-bg.jpg" center="true">
    <FormContainer v-if="sucess === false" :submit="createUser" title="SIGN UP">
      <Input
        id="username"
        type="username"
        placeholder="USERNAME" 
        :change="updateInput"
        :value="this.user.username"
        required
      />
      <Input 
        id="email"
        type="email"
        placeholder="EMAIL" 
        :class="$style.emailInput"
        :change="updateInput"
        :value="this.user.email"
        required
      />
      <Input 
        id="name"
        type="name"
        placeholder="NAME" 
        :change="updateInput"
        :value="this.user.name"
        required
      />
      <Input 
        id="password"
        :class="$style.passwordInput"
        type="password"
        placeholder="PASSWORD" 
        :change="updateInput"
        :value="this.user.password"
        required
      />
      <Button
        class="opacity-effect"
        content="Create an account"
        type="submit"
        :loading="loading"
      />
      <p v-if="error" style="color:red;">
        {{ error }}
      </p>
      <p>
        Already have an account ? <router-link class="opacity-effect" to="/">Login</router-link>
      </p>
    </FormContainer>

    <!-- <FormContainer v-else :submit="back" title="">
      <CheckCircleIcon :class="$style.check"/>
      <p :class="$style.successMessage">
        Congratulations! Your account has been successfully created.
      </p>
      <Button
        class="opacity-effect"
        content="Return to login page"
        type="submit"
        styleType="no-bg"
      />
    </FormContainer> -->
  </ActionContainer>
</template>

<script>

import ActionContainer from "@/components/containers/ActionContainer";
import FormContainer from "@/components/containers/FormContainer";

// import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import Button from "@/components/Buttons/Primary";

import Input from "@/components/inputs/primary";
import api from "@/services/api";

export default {
  name: 'SignUpView',
  methods: {
    updateInput(e) {
      const id = e.target.id;
      const value = e.target.value;
      if(id) this.user[id] = value;
    },

    back() {
      this.$router.push("/");
    },

    async createUser() {
      this.loading = true;
      const result = await api.createNewUser(this.user);
      
      if(result === true) this.sucess = true;
      else this.error = this.getErrorMessage(result);

      this.loading = false;
    },

    getErrorMessage(error) {
      if (error.code === "auth/email-already-in-use") return "The email address is already in use by another account.";
      if (error.code === "auth/invalid-email") return "The email address is not valid.";

      if (error.code === "auth/weak-password") "The password is too weak. Please choose a stronger password.";
      return "An error occour please try again";
    }
  },
  watch: {
    sucess(newValue) {
      if(newValue === true) return this.$router.push("/chat");
    }
  },
  data() {
    return {
      sucess:false,
      loading:false,
      error:"",
      user:{
        username:"",
        name:"",
        email:"",
        password:""
      }
    }
  },
  components: {
    FormContainer,
    ActionContainer,
    Input,
    Button,
    // CheckCircleIcon
  },
};
</script>

<style scoped module>

  .passwordInput, .emailInput {
    margin:15px 0 ;
  }

  p {
    text-align:center;
  }

  p a {
    color:var(--primary);
  }

  .successMessage {
    color:var(--primary);
    font-size:24px;
  }

  .check {
    color:var(--primary);
    font-size:48px;
    width:100%;
    max-height:300px;
    max-width:200px;
    margin:0 auto;
    display: block;
  }

</style>