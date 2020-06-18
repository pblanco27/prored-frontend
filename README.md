## Prerrequisitos para ejecución de la interfaz

### Sistema Operativo

La interfaz gráfica se encuentra desarrollada en React Js PI y se probó en Linux, por lo que se debe de utilizar este sistema operativo.

### Tecnologías
#### Node JS

Node Js es un entorno de ejecución para JavaScript el cual nos permitirá ejecutar el API y también instalar las dependencias necesarias. El API fue desarrollado con la versión 13.11.0 de node, por lo que esta es la necesaria para ejecutar los comandos del API. Para instalar Node se debe de ejecutar los siguientes comandos en la terminal:

``` $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash```

Cerramos la terminal como nos indica.

``` $ nvm install 13.11.0```

Una vez ejecutado este comando ya tendremos Node instalado en nuestro sistema listo para ejecutarse.

### React Js

Primero debemos de agregar el repositorio donde se encuentran almacenados los datos del framework. Para esto corremos los siguientes comandos:

``` npm install -g create-react-app ```

Por último actualizamos los repositorios de nuestro sistema para que aparezcan los que acabamos de añadir.

``` sudo apt update```


## Descarga del repositorio

El código fuente junto con los datos necesarios para inicializar la base de datos se encuentran almacenados dentro de un repositorio de GitHub. El link a este repositorio es el siguiente:

[https://github.com/pblanco27/prored-frontend](https://github.com/pblanco27/prored-frontend)

Para obtener el sistema podemos descargar el repositorio como un zip o correr el siguiente comando en nuestro sistema:

``` git clone https://github.com/pblanco27/prored-frontend.git```

Teniendo el repositorio descargado, procedemos a preparar nuestro sistema para ejecución.

## Preparación para ejecución

Una vez con el código fuente descargado, procedemos a realizar las labores de preparación necesarias para su ejecución. 

### Instalación de dependencias

Para poder ejecutar nuestro sistema debemos de instalar todas las dependencias que este tiene. Esto se puede realizar con un simple comando que se encarga de descargarlos todos. Este comando debe de ser ejecutado en la base de la carpeta que contiene el código fuente:

``` npm install ```

## Ejecución de la GUI (interfaz de usuario)

### Ejecución en modo de desarrollo

Para ejecutar el API  y poder comenzar a utilizarla en modo de desarrollo se debe de ejecutar el siguiente comando en la base de la carpeta que contiene el código fuente:

``` npm start ```

Esto iniciara la compilación automática y el levantamiento de la interfaz.

### Ejecución en modo de producción

Para ejecutar la interfaz  y poder comenzar a utilizarla en modo de producción, primero debemos de compilar a mano el sistema. Para hacer esto debemos de ejecutar el siguiente comando en la base de la carpeta que contiene el código fuente:

```npm run build ```

Una vez compilado, se deberá ejecutar los siguientes comandos:

``` npm install -g serve```

Seguidamente se procederá a levantar la aplicación de producción a través del comando:

``` serve -s build  ```


Con esto ya tendremos la aplicación con la compilación de producción.

## Estructura del código fuente

La estructura del código funte dentro de la carpeta del APi se divide de la siguiente manera:
*	<strong>node_modules</strong>
Esta carpeta contiene todas las dependencias del proyecto, sin estas el proyecto no puede ser ejecutado
*	<strong>build</strong>
Esta carpeta contiene los archivos compilados y listos para ejecución.
*	<strong>public</strong>
Dentro de esta carpeta se tienen distintos elementos, el más importante es el index.html ,donde va montada la interfaz a través de React Js
*	<strong>src</strong>
Esta carpeta contiene todo el código fuente de la aplicación. Aquí se detallan todos los contenidos de las subcarpetas internas:
	*	<strong>components</strong>
En esta carpeta se encuentran los componentes que forman parte de la aplicación y diseñados para cada funcionalidad del sistema.
	*	<strong>assets</strong>
En esta carpeta se elementos multimedia necesarios para la aplicación.
	*	<strong>helpers</strong>
En esta carpeta se encuentran herramientas para realizar procedimientos dentro de los componentes.
	*	<strong>sass</strong>
En esta carpeta se encuentran los métodos que realizan la migración de la base de datos, en ellos se ejecutan los scripts de borrado y creado de toda la base de datos.
	*	<strong>services</strong>
Archivo que brinda la conexión con el backend de la aplicación
	*	<strong>componentes importantes</strong>
En esta carpeta se encuentran:
    1. App Js: archivo donde se condensa el funcionamiento de la aplicación a través un router
    2. index.css:  CSS general de la aplicación 
    3. index.js: archivo que redirige App Js al index.html de la aplicación 
