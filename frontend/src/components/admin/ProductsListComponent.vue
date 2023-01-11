<script>
import { computed,reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import secret from '../../secret';
export default {
  setup() {
    const store = useStore();
    const state = reactive({
      productsList: computed(() => store.state.productos.productsList),
    });
    return { state, secret };
  },
};
</script>
<template>
    <div class="products-list">
            <div class="product-item" v-for="product in state.productsList" @click="$router.push('/admin/productos/'+product.id_producto)">
                <div class="product-image">
                  <img :src="`${secret.ADMIN_SERVER}/public/${product.imagen}`">
                </div>
                <div class="product-info">
                    <div>
                        <p>Nombre</p>
                        <h3>{{product.nombre}}</h3>
                    </div>
                    <div>
                        <p>Precio</p>
                        <h3>{{product.precio}}€</h3>
                    </div>
                    <div>
                        <p>Categorias</p>
                        <h3>{{product.c_categorias.join(", ")}}</h3>
                    </div>
                    <div class="tags">
                         <p>Icon</p><v-icon :name="alergeno.imagen.split('|')[0]" scale="2" v-for="alergeno in product.alergenos" /> 
                    </div>
                </div>
            </div>
        </div>
</template>
<style scoped>
.products-list {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: grid;
  padding: 5px;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 10px;
}

.products-list::-webkit-scrollbar {
  display: none;
}

.product-item {
  max-width: 900px;
  box-sizing: border-box;
  height: 200px;
  display: flex;
  padding: 5px;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

.product-item:hover {
  cursor: pointer;
  background-color: #a69bf932;
}

.product-image {
  box-sizing: border-box;
  height: 100%;
  width: 50%;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.product-info {
  box-sizing: border-box;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.product-info div {
  width: 100%;
  height: 20%;
}

.product-info div:first-child {
  grid-area: 1 / 1 / 2 / 3;
}

.product-info p {
  color: #888888;
  font-size: 1.1rem;
}

.product-info h3 {
  color: black;
  font-weight: 700;
  font-size: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.product-info .tags {
  border-top: 2px solid #888888;
  width: 100%;
  grid-area: 3 / 1 / 4 / 3;
  display: flex;
  gap: 5px;
}
</style>
