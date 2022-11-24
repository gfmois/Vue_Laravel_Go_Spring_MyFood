<template>
    <li :class="checked(tableitem.reserved)" @click="toggleReserved(tableitem.id)">
        <span :class="{ pointer: true, 'table-reserved': tableitem.reserved }" :title="tableitem.type">
            {{ tableitem.type }}
            {{ tableitem.reserved ? "Reservado" : "" }}
        </span>
        <div class="float-right">
            <div class="badge badge-secondary pointer ml-1 text-warning" @click.stop="editTable(tableitem.id)">Editar</div>
            <div class="badge badge-secondary pointer ml-1 text-danger" @click.stop="deleteTable(tableitem.id)">Eliminar</div>
        </div>
    </li>
</template>

<script>
import Constant from "../Constant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    props: {
        tableitem: Object
    },
    setup(props) {
        const store = useStore()
        const router = useRouter()

        const checked = (done) => {
            return { "list-group-item": true, "list-group-item-success": done }
        }

        const toggleReserved = (id) => store.dispatch(Constant.TOGGLE_RESERVED, { id })
        const deleteTable = (id) => store.dispatch(Constant.DELETE_TABLE, { id })
        const editTable = (id) => {
            store.dispatch(Constant.INITIALIZE_TABLEITEM, { tableitem: { ...props.tableitem } })
            router.push({ name: "updateTable", params: { id } })
        }

        return { checked, toggleReserved, deleteTable, editTable }

    }
}
</script>