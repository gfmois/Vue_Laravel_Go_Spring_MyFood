<p align="center">
<img src="https://raw.githubusercontent.com/gfmois/Vue_Laravel_Go_Spring_MyFood/main/readme_assets/MyFood.png" width="150" alt="MyFood Logo">
</p>

[Vue3-Carousel]: <https://www.npmjs.com/package/vue3-carousel>
[VueForm]: <https://vueform.com/>
[DatePicker]: <https://www.npmjs.com/package/@vuepic/vue-datepicker>
[jsPDF]: <https://github.com/parallax/jsPDF#readme>
[qrcode]: <https://www.npmjs.com/package/qrcode>
[qrcode-svg]: <https://www.npmjs.com/package/qrcode-svg>
[vue-lottie]: <https://www.npmjs.com/package/vue3-lottie>
[vue-chart]: <https://www.npmjs.com/package/vue-chartjs>
[chartjs]: <https://www.chartjs.org/>
[qr-scanner]: <https://www.npmjs.com/package/qr-scanner>

[oh-vue-icons]: <https://www.npmjs.com/package/oh-vue-icons>
[web-oh-vue-icons]: <https://oh-vue-icons.js.org/>
[Lottiefiles]: <https://lottiefiles.com/>
[JWT]: <https://jwt.io>

[Vue3]: <https://vuejs.org/>
[Laravel]: <https://laravel.com/>
[Go]: <https://go.dev/>
[Spring]: <https://spring.io/>

[Docker]: <https://www.docker.com/>
[Node]: <https://nodejs.org/en/>




# Vue_Laravel_Go_Spring_MyFood

## ABOUT THIS PROJECT
>Second project of the second year of the Web Development Applications course. It is an application for a restaurant that has a customer section and an administrator section.

### DATABASE

The database is designed for:
* A Customer can make Reservations and Orders
* A Product can have Categories and Allergens
* An Event has Menus
* A Menu has products

Database diagram:
<img src="https://raw.githubusercontent.com/gfmois/Vue_Laravel_Go_Spring_MyFood/main/readme_assets/MyFood_DB.png"/>

### BUILT WITH
* #### [Vue3] (Composition API)
* #### [Laravel] 9
* #### [Go] 1.19.2
* #### [Spring] 2.7.5

### VIEWS

<i>Client</i>
| Page | Features |
| ---- | -------- |
| Home | [Vue3-Carousel] |
| Auth | Login, Register |
| Reservas | [DatePicker], [jsPDF], [qrcode], [qrcode-svg] | 
| Pedidos | ProductsList, CartModal, Filters([VueForm]), Pagination, FiltersModal, ProductDetails |
| Perfil | [chartjs], [vue-chart] |

<i>Admin</i>
| Page | Features |
| ---- | -------- |
| Dashboard | [chartjs], [vue-chart], LoadingComponent | 
| Productos | CustomModal(Categorias, Alergenos), ProductsList, ProductsForm, LoadingComponent |
| Reservas | [qr-scanner], LoadingComponent, [DatePicker], ReserveForm |
| Clientes | CustomModal |

## WORKING IN ALL WEBSITE

* [JWT]
* Icons ([oh-vue-icons])
* Web Icons ([web-oh-vue-icons])
* Animations ([Lottiefiles])

## PREVIOUS REQUIREMENTS
* #### [Docker] 20.10.22
* #### [Node] 16.19.0

## USAGE
Clone Repository
```bash
git clone --recursive https://github.com/gfmois/Vue_Laravel_Go_Spring_MyFood.git
cd Vue_Laravel_Go_Spring_MyFood/ 
```
Update Repository
```bash
git pull origin [rama]
```
Update submodules of the repository
```bash
git submodule update --remote --merge
```
To launch the repository
* Laravel/Go
```bash
docker-compose -f ./docker-compose.yml -f ./backend/go/docker-compose.yml up
```
* Laravel/Spring
```bash
docker-compose -f ./docker-compose.yml -f ./backend/spring/docker-compose.yml up
```
* Vue
```bash
cd frontend
npm run dev -- --host
```




## AUTHORS
<div class="authors" style="display: flex;
        align-items: center;
        margin: 10px;
        flex-direction: row;
        justify-content: center;
        gap: 50px;">
<div style="text-align:center;">
  <a href="https://github.com/gfmois"><img style="margin-bottom: 10px;" src="https://avatars.githubusercontent.com/u/102977172?s=400&v=4" alt="Creator gfmois" width="150" height="150"></a>
  <h3>gfmois</h3>
</div>
<div style="text-align: center;">
  <a href="https://github.com/JoaquimRS"><img style="margin-bottom: 10px;" src="https://avatars.githubusercontent.com/u/94555035?v=4" alt="Creator JoaquimRS" width="150" height="150"></a>
  <h3>JoaquimRS</h3>
</div>
</div>

## DEMO

###### Home Page
<p align="center">
<img src="https://raw.githubusercontent.com/gfmois/Vue_Laravel_Go_Spring_MyFood/main/readme_assets/home-page.gif" width="100%"/>


###### Filters
<p align="center">
<img src="https://raw.githubusercontent.com/gfmois/Vue_Laravel_Go_Spring_MyFood/main/readme_assets/filters.gif" width="100%"/>
</p>

###### Admin Dashboard
<p align="center">
<img src="https://raw.githubusercontent.com/gfmois/Vue_Laravel_Go_Spring_MyFood/main/readme_assets/charts-admin.gif" width="100%"/>
</p>

###### Loading Animations
<p align="center">
<img src="https://raw.githubusercontent.com/gfmois/Vue_Laravel_Go_Spring_MyFood/main/readme_assets/animations.gif" width="100%"/>
</p>
