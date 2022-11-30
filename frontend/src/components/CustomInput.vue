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
              element.children.map((e) => open_parent += `<${e.tag} :value="${e.name}">${e.name}</${e.tag}>`)
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
</template>

<style scoped>
  select {
    background-color: rgba(211, 207, 207, 0.507);
    border: none;
    font-size: 14px;
    height: 40px;
    padding: 5px;
    width: 180px;
  }

  select:focus {
    outline: none;
  }

.form__group {
  position: relative;
  padding: 20px 0 0;
  margin-top: 10px;
  width: 100%;
  max-width: 180px;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: none;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 17px;
  color: rgb(0, 0, 0);
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 17px;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
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
  font-size: 17px;
  color: #38caef;
  font-weight: 700;
}

/* reset input */
.form__field:required,
.form__field:invalid {
  box-shadow: none;
}
</style>
