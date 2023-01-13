<script>
import { ref } from "vue"

export default {
	setup() {
		const register = ref(true)

		return { register }
	}
}
</script>
<template>
    <main>
        <div class="book">
            <div class="book-cover">
                <div class="init">
                    <h1>Inicia <br>Sesión</h1>
                    <div class="separator"></div>
                    <h2>by MyFood</h2>
                </div>
				<div class="back-cover">
					<div class="register" v-if="register">
						<h1>Registrarse</h1>
						<p class="slogan">¿Todavía no tienes una cuenta? <br>Registrate hoy mismo y empieza a disfrutar de la buena comida.</p>
						<button @click="register = false">Crear una cuenta ahora</button>
					</div>
					<div class="login" v-if="!register">
						<h1>Iniciar Sesión</h1>
						<p class="slogan">¿Ya tienes cuenta? Entra y pide algo bueno.</p>
						<button @click="register = true">Iniciar Sesión</button>
					</div>
				</div>
            </div>
            <div class="book-content">
                <div class="cn-login"></div>
            </div>
        </div>
    </main>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Petemoss&display=swap");


main {
	display: flex;
	justify-content: center;
	background-color: transparent;
}

.slogan {
	margin-top: 20px;
	text-align: center;
	font-size: x-large;
}

.book {
	--book-height: 70vh;
	--book-ratio: 1.2;
	transition: 2s;
}

.book:hover {
	transform: translateX(50%);
}

.book > div {
	height: var(--book-height);
	width: calc(var(--book-height) / var(--book-ratio));
	overflow: auto;
	background-color: #0a0a0a;
	transform: scale(0.9);
	border-radius: 6px;
	transform-origin: left;
}

.book-cover {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 9;
	text-align: center;
	background: linear-gradient(135deg, black 25%, transparent 25%) -50px 0,
		linear-gradient(225deg, black 25%, transparent 25%) -50px 0,
		linear-gradient(315deg, black 25%, transparent 25%),
		linear-gradient(45deg, black 25%, transparent 25%);
	background-size: 2em 2em;
	background-color: #232323;
	color: white;
	transition: transform 2s;
}

.book-cover::before {
	content: "";
	position: absolute;
	width: 20px;
	right: 20px;
	top: 0;
	bottom: 0;
	background-color: #b11509;
}

h1 {
	font-family: "Petemoss", cursive;
	font-size: 98px;
	font-weight: 300;
	color: #dbd75d;
}

h2 {
	font-size: 16px;
}

.separator {
	--separator-size: 8px;
	width: var(--separator-size);
	height: var(--separator-size);
	background-color: #dbd75d;
	margin: 50px auto 60px auto;
	border-radius: 50%;
	position: relative;
}

.separator::after,
.separator::before {
	content: "";
	position: absolute;
	width: 12px;
	background-color: white;
	height: 2px;
	top: calc(50% - 1px);
}

.separator::after {
	left: 15px;
}

.separator::before {
	right: 15px;
}

.book-content {
	transform: scale(0.9) translateY(30px);
	background-color: white !important;
	transition: all 0.3s 1s;
}

.book-content h3,
.book-content p {
	opacity: 0;
	transition: all 0.3s 0.3s;
}

h3 {
	padding: 30px;
}

p {
	padding: 0px 30px 10px 30px;
	text-align: justify;
	font-size: 14px;
}

.book-cover > div {
	transition: opacity 0s 0.6s;
}

.book:hover > .book-cover {
	transform: rotateY(180deg) scale(0.9);
}

.book:hover > .book-cover > .back-cover > div {
	transform: rotateY(-180deg) scale(0.7);
}

.book:hover > .book-cover > .init{
	display: none;
}

.back-cover > div {
	display: none;
}

.book:hover > .book-cover > .back-cover > div {
	display: flex;
	justify-content: start;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.book:hover > .book-content {
	transform: scale(0.9) translateY(0px);
}

.book:hover > .book-content h3,
.book:hover > .book-content p {
	opacity: 1;
}

button {
	margin-top: 30px;
	height: 2.8em;
	width: 9em;
	background: transparent;
	-webkit-animation: jello-horizontal 0.9s both;
	animation: jello-horizontal 0.9s both;
	border: 2px solid #b11509;
	outline: none;
	color: #ffffff;
	cursor: pointer;
	font-size: 20px;
	text-transform: capitalize;
	margin-left: 36%;
   }
   
   button:hover {
	background: #b11509;
	color: #ffffff;
	animation: squeeze3124 0.9s both;
   }
   
   @keyframes squeeze3124 {
	0% {
	 -webkit-transform: scale3d(1, 1, 1);
	 transform: scale3d(1, 1, 1);
	}
   
	30% {
	 -webkit-transform: scale3d(1.25, 0.75, 1);
	 transform: scale3d(1.25, 0.75, 1);
	}
   
	40% {
	 -webkit-transform: scale3d(0.75, 1.25, 1);
	 transform: scale3d(0.75, 1.25, 1);
	}
   
	50% {
	 -webkit-transform: scale3d(1.15, 0.85, 1);
	 transform: scale3d(1.15, 0.85, 1);
	}
   
	65% {
	 -webkit-transform: scale3d(0.95, 1.05, 1);
	 transform: scale3d(0.95, 1.05, 1);
	}
   
	75% {
	 -webkit-transform: scale3d(1.05, 0.95, 1);
	 transform: scale3d(1.05, 0.95, 1);
	}
   
	100% {
	 -webkit-transform: scale3d(1, 1, 1);
	 transform: scale3d(1, 1, 1);
	}
   }
</style>