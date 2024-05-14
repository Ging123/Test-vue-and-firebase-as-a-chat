<template>
  <div :class="className || ''">
    <label :for="id" hidden>
      {{ placeholder }}
    </label>
    <input
      :class="`${notRounded ? '' : 'rounded'}`"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      :id="id"
      :required="required"
      @input="handleInputChange"
    >
  </div>
</template>

<script>
export default {
  name:"PrimaryInput",

  props: {
    id: String,
    className: String,
    change: Function,
    placeholder: String,
    value: String,
    type: String,
    required: Boolean,
    notRounded:Boolean
  },

  methods: {

    handleInputChange(e) {
      this.change(e);
    }

  }
}
</script>

<style scoped>
  
  input {
    background:transparent;
    border:1px solid var(--primary);
    color:white;
    font-size:18px;
    padding:15px 20px;
    width:100%;
  }

  input::placeholder {
    color:var(--primary);
  }

  input.rounded {
    border-radius:100px;
  }

</style>