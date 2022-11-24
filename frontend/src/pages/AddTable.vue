<template>
  <div class="container">
    <div class="row">
      <div class="col p-3">
        <h2>Añadir Mesa</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
            <label htmlFor="type">Tipo: </label>
            <input type="text" class="form-control" v-model="state.tableitemlocal.type">
        </div>
        <div class="form-group">
            <label htmlFor="n_guests">Comensales: </label>
            <input type="text" class="form-control" v-model="state.tableitemlocal.n_guests">
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-primary m-1" @click="addTable">Añadir</button>
            <button type="button" class="btn btn-primary m-1" @click="cancel">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constant from '../Constant';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const state = reactive({
            tableitemlocal: { type: "", n_guests: 0 }
        })
        const addTable = () => {
          console.log(state.tableitemlocal);
            if (state.tableitemlocal.n_guests >= 2) {
                store.dispatch(Constant.ADD_TABLE, { tableitem: state.tableitemlocal })
                router.push({ name: "tables" })
            }
        }
        
        const cancel = () => {
            router.push({ name: "tables" })
        }

        return { state, addTable, cancel }
    }
}
</script>