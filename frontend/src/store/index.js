import { createStore } from "vuex";
import Constant from "../Constant";
import shortId from "shortId";

export default createStore({
    state: {
        tablelist: [
            { id: shortId.generate(), type: "Comunión", n_guests: 20, reserved: false },
            { id: shortId.generate(), type: "Redonda", n_guests: 2, reserved: false },
            { id: shortId.generate(), type: "Rectangular", n_guests: 6, reserved: false }
        ]
    },
    mutations: {
        [Constant.ADD_TABLE]: (state, payload) => {
            console.log(payload);
            state.tablelist.push({ ...payload.tableitem, id: shortId.generate(), reserved: false })
            state.tableItem = { id: "", type: "", n_guests: 0, reserved: false }
        },
        [Constant.DELETE_TABLE]: (state, payload) => {
            let index = state.tablelist.findIndex((i) => i.id == payload.id)
            state.tablelist.splice(index, 1)
        },
        [Constant.TOGGLE_RESERVED]: (state, payload) => {
            let index = state.tablelist.findIndex((i) => i.id == payload.id)
            state.tablelist[index].reserved = !state.tablelist[index].reserved
        },
        [Constant.UPDATE_TABLE]: (state, payload) => {
            let index = state.tablelist.findIndex((i) => i.id == payload.id)
            state.tablelist[index] = payload.todoitem;
        },
        [Constant.INITIALIZE_TABLEITEM]: (state, payload) => {
            if (payload && payload.tableItem) state.tableitem = payload.tableitem
            else state.tableitem = { id: "", n_guests: 0, type: "", reserved: false }
        }
    },
    actions: {
        [Constant.ADD_TABLE]: (store, payload) => {
            store.commit(Constant.ADD_TABLE, payload)
        },
        [Constant.DELETE_TABLE]: (store, payload) => {
            store.commit(Constant.DELETE_TABLE, payload)
        },
        [Constant.TOGGLE_RESERVED]: (store, payload) => {
            store.commit(Constant.TOGGLE_RESERVED, payload)
        },
        [Constant.UPDATE_TABLE]: (store, payload) => {
            store.commit(Constant.UPDATE_TABLE, payload)
        },
        [Constant.INITIALIZE_TABLEITEM]: (store, payload) => {
            store.commit(Constant.INITIALIZE_TABLEITEM, payload)
        },
    }
})