# Prueba técnica Quality Assurance Automation Engineer

Evaluar tu conocimiento en el diseño y ejecución de casos de prueba automatizados, utilizando Cypress o Selenium para asegurar la calidad del sistema de registro y autenticación de usuarios en la plataforma.

# Información de la prueba

- Los casos de pruebas diseñados para automatizar se encuentran en el siguiente enlace: [Enlace de diseño](https://docs.google.com/spreadsheets/d/1NZE0UU4KfJgA8L3TXrFeRnN6peBSRS-M/edit?usp=sharing&ouid=115363708547556792577&rtpof=true&sd=true)

- El reporte de bugs encontrados lo encontramos en el siguiente enlace: [Enlace de bug tracker](https://knotty-neem-79b.notion.site/a7840ce1684d4a1aab311409495aed97?v=e9101d9d3f2040098e28bb31388cde91&pvs=4)

# La prueba se realizó con Cypress

## Como instalar y ejecutar el proyecto

## Requisitos Previos

- Node.js (versión 12 o superior)
- npm (Node Package Manager)

## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local.

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local utilizando Git:

```bash
git clone https://github.com/sallacas/prueba-tecnica-cypress.git
```
### 2. Instalar Dependencias
Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
cd tu-repositorio
npm install
```

Este comando instalará todas las dependencias definidas en el archivo package.json.

## Ejecución de Pruebas
Puedes ejecutar las pruebas de Cypress en modo interactivo o desde la consola. A continuación se detallan ambos métodos.

### 1. Modo Interactivo
Para abrir la interfaz gráfica de Cypress y ejecutar las pruebas de forma interactiva, utiliza el siguiente comando:

```bash
npm run cy:open
```
Este comando abrirá la interfaz de Cypress, donde podrás seleccionar y ejecutar las pruebas manualmente.

### 2. Ejecución desde la Consola
Para ejecutar todas las pruebas directamente desde la consola, utiliza el siguiente comando:

```bash
npm test
```

O diretamente con el comando de cypress

```bash
npx cypress run --browser chrome
```

Este comando ejecutará las pruebas y generará videos y capturas de pantalla de los resultados en caso de fallos.

## Resultados de las Pruebas

**Videos**: Los videos de las pruebas se guardarán en la carpeta cypress/videos/.

**Capturas de Pantalla**: Las capturas de pantalla en caso de fallos se guardarán en la carpeta cypress/screenshots/.

Puedes revisar estos archivos para analizar el comportamiento de las pruebas y los posibles errores que hayan ocurrido.