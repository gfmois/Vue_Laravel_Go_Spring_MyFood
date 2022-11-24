<template>
    <div class="container">
        <div class="row">
          <div class="col p-3">
            <h2>Editar Mesa</h2>
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
                <button type="button" class="btn btn-primary m-1" @click="updateTable">Añadir</button>
                <button type="button" class="btn btn-primary m-1" @click="cancel">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    import Constant from '../Constant';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { reactive } from 'vue';

    export default {
        setup() {
            const router = useRouter()
            const store = useStore()
            const currentRoute = useRoute()

            const tableitem = store.state.tablelist.find((i) => i.id == currentRoute.params.id)
            const state = reactive({
                tableitemlocal: { ...tableitem }
            })

            const updateTable = () => {
                router.push({ name: "tables" })
                store.dispatch(Constant.UPDATE_TABLE, { tableitem: state.todoitemlocal })
            }

            const cancel = () => {
                router.push({ name: "tables" })
            }

            return { state, updateTable, cancel }
        }
    }
</script>