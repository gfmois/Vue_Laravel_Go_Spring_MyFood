<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

[Laravel]: <https://laravel.com>
[Eloquent]: <https://laravel.com/docs/9.x/eloquent>
[MyFood]: <https://github.com/gfmois/Vue_Laravel_Go_Spring_MyFood.git>


## ABOUT THIS PROJECT

>We have used Laravel as a server to perform all administrator tasks such as 
  ·  Creating
  ·  Modifying
  ·  Deleting
  ·  Managing 
The entire application from an admin panel.
You need to be an administrator to make requests.
The application will authorize or not your actions based on the generated token.


## BUILT WITH
* [Laravel] - Backend
* [Eloquent] - ORM

## API
URL
```
http://localhost:8000/api/
```

The available endpoints are:

<td colspan=6> Client
<table>
  <tr>
    <th>Function</th>
    <th>Request</th>
    <th>Route</th>
    <th>Params</th>
    <th>Body</th>
    <th>Response</th>
  </tr>
  <tr>
    <th colspan="6">Clients</th>
  </tr>
  <tr>
    <td>getClients()</td>
    <td>GET</td>
    <td>/clients</td>
    <td></td>
    <td></td>
    <td>[clients]</td>
  </tr>
  <tr>
    <td>addClient()</td>
    <td>POST</td>
    <td>/clients</td>
    <td></td>
    <td>{infoClient}</td>
    <td>{client}</td>
  </tr>
  <tr>
    <td>updateClient()</td>
    <td>POST</td>
    <td>/clients/update</td>
    <td></td>
    <td>{infoClient}</td>
    <td>{status,msg}</td>
  </tr>
  <tr>
    <td>deleteClient()</td>
    <td>DELETE</td>
    <td>/clients/:id_client</td>
    <td></td>
    <td></td>
    <td>{status,msg}</td>
  </tr>
  <tr>
    <td>getClientProperties()</td>
    <td>GET</td>
    <td>/clients/properties</td>
    <td></td>
    <td></td>
    <td>[column_name,data_type]</td>
  </tr>
  <tr>
    <th colspan="6">Products</th>
  </tr>
  <tr>
    <td>getProducts()</td>
    <td>GET</td>
    <td>/productos</td>
    <td></td>
    <td></td>
    <td>[products]</td>
  </tr>
  <tr>
    <td>addProduct()</td>
    <td>POST</td>
    <td>/productos</td>
    <td></td>
    <td>{infoProduct}</td>
    <td>{product}</td>
  </tr>
  <tr>
    <td>updateProduct()</td>
    <td>POST</td>
    <td>/productos/:id_product</td>
    <td></td>
    <td>{infoProduct}</td>
    <td>{product}</td>
  </tr>
  <tr>
    <td>deleteProduct()</td>
    <td>DELETE</td>
    <td>/productos/:id_product</td>
    <td></td>
    <td></td>
    <td>{msg}</td>
  </tr>
  <tr>
    <td>getProduct()</td>
    <td>GET</td>
    <td>/productos/:id_product</td>
    <td></td>
    <td></td>
    <td>{product}</td>
  </tr>
  <tr>
    <th colspan="6">Reserves</th>
  </tr>
  <tr>
    <td>getReserves()</td>
    <td>GET</td>
    <td>/reservas</td>
    <td></td>
    <td></td>
    <td>[reserves]</td>
  </tr>
  <tr>
    <td>createReserva()</td>
    <td>POST</td>
    <td>/reservas</td>
    <td></td>
    <td>{infoReserva}</td>
    <td>{reserva}</td>
  </tr>
  <tr>
    <td>updateReserva()</td>
    <td>POST</td>
    <td>/reservas/update</td>
    <td></td>
    <td>{infoReserva}</td>
    <td>{status,msg}</td>
  </tr>
  <tr>
    <td>getReserva()</td>
    <td>GET</td>
    <td>/reservas/:id_reserve</td>
    <td></td>
    <td></td>
    <td>{reserve}</td>
  </tr>
  <tr>
  <tr>
    <th colspan="6">Categories</th>
  </tr>
  <tr>
    <td>getCategories()</td>
    <td>GET</td>
    <td>/categorias</td>
    <td></td>
    <td></td>
    <td>[categories]</td>
  </tr>
  <tr>
    <td>addCategory()</td>
    <td>POST</td>
    <td>/categorias</td>
    <td></td>
    <td>{infoCategory}</td>
    <td>{category}</td>
  </tr>
  <tr>
    <td>updateCategory()</td>
    <td>POST</td>
    <td>/categorias/:id_category</td>
    <td></td>
    <td>{infoCategory}</td>
    <td>{status,msg}</td>
  </tr>
  <tr>
    <td>deleteCategory()</td>
    <td>DELETE</td>
    <td>/categorias/:id_category</td>
    <td></td>
    <td></td>
    <td>{status}</td>
  </tr>
  <tr>
    <td>getCategoryProperties()</td>
    <td>GET</td>
    <td>/categorias/properties</td>
    <td></td>
    <td></td>
    <td>[column_name,data_type]</td>
  </tr>
  <tr>
    <th colspan="6">Allergens</th>
  </tr>
  <tr>
    <td>getAllergens()</td>
    <td>GET</td>
    <td>/alergenos</td>
    <td></td>
    <td></td>
    <td>[allergens]</td>
  </tr>
  <tr>
    <td>addAllergen()</td>
    <td>POST</td>
    <td>/alergenos</td>
    <td></td>
    <td>{infoAllergen}</td>
    <td>{allergen}</td>
  </tr>
  <tr>
    <td>updateAllergen()</td>
    <td>POST</td>
    <td>/alergenos/:id_allergen</td>
    <td></td>
    <td>{infoAllergen}</td>
    <td>{status,msg}</td>
  </tr>
  <tr>
    <td>deleteAllergen()</td>
    <td>DELETE</td>
    <td>/alergenos/:id_allergen</td>
    <td></td>
    <td></td>
    <td>{status}</td>
  </tr>
  <tr>
    <td>getAllergenProperties()</td>
    <td>GET</td>
    <td>/alergenos/properties</td>
    <td></td>
    <td></td>
    <td>[column_name,data_type]</td>
  </tr>
  <tr>
    <th colspan="6">Orders</th>
  </tr>
  <tr>
    <td>getOrders()</td>
    <td>GET</td>
    <td>/pedidos</td>
    <td></td>
    <td></td>
    <td>[pedidos]</td>
  </tr>
  <tr>
    <th colspan="6">Images</th>
  </tr>
  <tr>
    <td>getImage()</td>
    <td>GET</td>
    <td>/public/:image</td>
    <td></td>
    <td></td>
    <td>{image}</td>
  </tr>
  <tr>
    <th colspan="6">Auth</th>
  </tr>
  <tr>
    <td>login()</td>
    <td>POST</td>
    <td>/auth/login</td>
    <td></td>
    <td>{infoUser}</td>
    <td>{user,token}</td>
  </tr>
  <tr>
    <td>register()</td>
    <td>POST</td>
    <td>/auth/register</td>
    <td></td>
    <td>{infoUser}</td>
    <td>{user,token}</td>
  </tr>
  <tr>
    <td>isAdmin()</td>
    <td>GET</td>
    <td>/auth/isAdmin</td>
    <td></td>
    <td></td>
    <td>{user,token}</td>
  </tr>
  <tr>
    <td>refresh()</td>
    <td>GET</td>
    <td>/auth/refresh</td>
    <td></td>
    <td></td>
    <td>{user,token}</td>
  </tr>
  <tr>
    <td>me()</td>
    <td>GET</td>
    <td>/auth/profile</td>
    <td></td>
    <td></td>
    <td>{meta,data}</td>
  </tr>
</table>


## FEATURES
* JWT Auth
* Guards On Routes
* Server Dockerized
* File Upload
* Image Server

## USAGE
This server is intended both for the administrative use of the project ([MyFood]) and as an image server for the client.

This server is launched directly from docker, if you want to launch it go to the root of the project and run the command `docker-compose up`, this will raise three containers:
* MySQL
* PhpMyAdmin
* Laravel


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
