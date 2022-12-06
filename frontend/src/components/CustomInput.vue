<script>
    export default {
        props: {
            step_collection: Object,
        },
        data() {
            return this.step_collection
        },
        setup() {
          const tagToHtml = (element) => {
            let open_parent = `<${element.tag}>`;
            if (element.children) {
              element.value ? element.children.map((e) => open_parent += `<${e.tag} value="${e.value}">${e.name}</${e.tag}>`) : element.children.map((e) => open_parent += `<${e.tag} :value="${e.name}">${e.name}</${e.tag}>`)
              
              return open_parent += `</${element.tag}>`;
            }

            return `<${element.tag}></${element.tag}>`
          }

          return { tagToHtml }
        }
    }
</script>

<template>
  <div
    class="form__group field"
    v-for="(input, input_index) in step_collection.children"
    :key="input.name"
    v-if="step_collection.children"
  >
    <input v-if="!input.tag"
      :placeholder="input.name"
      :min="input.min ? input.min : null"
      :type="input.type"
      class="form__field"
      :required="input.required"
      :disabled="input.disabled"
      v-model="input.value"
    />
    <label class="form__label">{{ input.name }}</label>

    <select v-model="input.value" v-if="input.tag" v-html="tagToHtml(input)" />

  </div>
  <div v-if="!step_collection.children" class="form__group_large field">
    <input v-if="!step_collection.tag"
      :placeholder="step_collection.name"
      :min="step_collection.min ? step_collection.min : null"
      :type="step_collection.type"
      class="form__field"
      :required="step_collection.required"
      :disabled="step_collection.disabled"
      v-model="step_collection.value"
    />
    <label class="form__label">{{ step_collection.name }}</label>
  </div>
</template>

<style scoped>
  select {
    background-color: rgba(211, 207, 207, 0.507);
    border: none;
    margin-top: 10px;
    font-size: 1rem;
    height: 40px;
    padding: 5px;
    width: 100%;
  }

  select:focus {
    outline: none;
  }

.form__group {
  position: relative;
  padding: 20px 0 0;
  margin-top: 10px;
  width: 80%;
  margin: 0 auto;
  display: flex;
}

.form__group_large {
  position: relative;
  padding: 20px 0 0;
  margin-top: 10px;
  width: 80%;

}

.form__field {
  font-family: inherit;
  width: 100%;
  border: none;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.2rem;
  color: rgb(0, 0, 0);
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  display: flex;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 1.2rem;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1.2rem;
  color: #9b9b9b;
  pointer-events: none;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #116399, #38caef);
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1.2rem;
  color: #38caef;
  font-weight: 700;
}

/* reset input */
.form__field:required,
.form__field:invalid {
  box-shadow: none;
}
</style>
