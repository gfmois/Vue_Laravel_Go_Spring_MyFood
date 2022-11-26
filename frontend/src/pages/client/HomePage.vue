<script>
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Navigation } from 'vue3-carousel'
  
  export default {
    components: {
      Carousel,
      Slide,
      Navigation
    },
    setup() {
        let images= ["restaurant_1.jpg","restaurant_2.jpg","restaurant_3.jpg","restaurant_4.jpg"]
        let words= ["PRODUCTO","MODERNIDAD","TRADICIÓN"]
        return {images,words}
        
    }
  }
</script>
<template>
    <div class="main">
        <div class="l-carousel">
            <carousel  :autoplay="3000" :wrap-around="true" :transition="1500">
              <slide v-for="image in images" :key="image">
                <img :src="'/src/assets/IMG/'+image" >
              </slide>
            </carousel>
        </div>
        <div class="s-carousel">
            <div>
                <carousel  :autoplay="2500" :wrap-around="true" :transition="500">
                    <slide v-for="word in words" :key="word">
                        <h1>{{word}}</h1>
                    </slide>
                </carousel>
            </div>
        </div>
        <div class="reserve">
            <img src="/src/assets/IMG/restaurant_5.jpg">
            <h1>RESERVAR</h1>
        </div>
    </div>
</template>
<style>
    .main {
        padding: 10px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        font-family: 'Roboto Condensed',sans-serif;
        letter-spacing: 2px;
        font-size: 1.5rem;
    }

    .l-carousel {
        grid-area: 1 / 1 / 3 / 4;
    }
    .s-carousel {
        grid-area: 3 / 1 / 4 / 2;
        overflow: hidden;
        background-color: #bdecb6;
        width: 100%;
        height: 45vh;
    }
    .s-carousel > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .reserve {
        grid-area: 3 / 2 / 4 / 4;
        height: 45vh;
        position: relative;
        display: flex;
        font-size: 1.3rem;
        justify-content: center;
    }
    .reserve h1 {
        position: absolute;
        top: 50%;
        padding: 20px 10vw 20px 10vw;
        background-color: #804000cc;
        cursor: pointer;
        transition: 0.5s ease;
    }
    .reserve h1:hover {
        color: white;
        transition: 0.3s ease;
    }
    .reserve img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
        
        filter: blur(2px);
    }
    .l-carousel .carousel__viewport {
        width: 100%;
        height: 85vh;
    }
    
    .carousel__viewport * {
        height: 100%;
    }
    .carousel__viewport img {
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    @media (max-width:700px) {
        .l-carousel {
            grid-area: 1 / 1 / 1 / 4;
        }
        .l-carousel .carousel__viewport {
            height: 45vh;
        }
        .s-carousel {
            grid-area: 2 / 1 / 2 / 4;
        }
        .reserve {
            grid-area: 3 / 1 / 3 / 4;
        }
    }

</style>
