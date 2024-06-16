<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo"/></a>
</p>

# Dólar Argentina Scraper

Este proyecto es una práctica de la herramienta Puppeteer y un apoyo a mi emprendimiento personal. La idea detrás de este proyecto es hacer web scraping a una página de información financiera para obtener el valor del dólar en Argentina. 

Dicha página es la de https://www.finanzasargy.com/

Por lo que los valores de dolar obtenidos son:

- Dólar Blue
- Dólar Oficial
- Dólar Tarjeta
- Dólar Cripto
- Dólar MEP
- Dólar CCL
- Dólar Mayorista

## Descripción del Proyecto

Usé Puppeteer para obtener los datos necesarios y NestJS para construir el backend. El propósito es tener un backend desplegado que pueda proporcionar los valores del dólar en un archivo Excel, actualizándose cada vez que se abra. Esto es crucial para mi emprendimiento, ya que necesito conocer el precio del dólar para fijar los precios de mis productos y mantener una planilla de precios actualizada.

Gracias a este proyecto, tengo una planilla con los precios actualizados del dólar blue en todo momento.

## Tecnologías Utilizadas

- **Puppeteer**: Herramienta de Node.js para automatización del navegador y web scraping.
- **NestJS**: Framework para construir aplicaciones backend eficientes y escalables.

## Configuración del Proyecto

### Requisitos

- Node.js (versión 18 o superior)

### Instalación

1. Clona el repositorio:

```bash
$ git clone https://github.com/Metaldev-06/api-dolar-puppeteer.git
```


### Instalar dependencias

```bash
$ yarn install
```

### Correr la aplicación

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

La aplicación estará disponible en http://localhost:3000.

## Endpoints
- **GET** /dolar: Devuelve todos los tipos de cambio del dólar.
- **GET** /dolar/:name: Devuelve los detalles de un tipo específico de dólar.
- **GET** /dolar/:name/value: Devuelve solo el valor de venta de un tipo específico de dólar.


## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para cualquier mejora o corrección.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.
