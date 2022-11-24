<template>
    <div style="mt-2">
        <div class="row">
            <div class="col p-3">
                <router-link class="btn btn-primary" to="/tables/add">Añadir Mesa</router-link>
            </div>
        </div>
        <div class="card card-default card-bordeless">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="list-group">
                            <TableItem v-for="tableitem in state.tablelist" :key="tableitem.id" :tableitem="tableitem" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TableItem from "../components/TableItem.vue";
import Constant from "../Constant";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    components: { TableItem },
    setup() {
        const store = useStore()
        const router = useRouter()

        const state = reactive({
            tablelist: computed(() => store.state.tablelist)
        })

        const goAddTable = () => {
            store.dispatch(Constant.INITIALIZE_TABLEITEM)
            router.push({ name: "addTable" })
        }

        return { state, goAddTable }
    }
}
</script>