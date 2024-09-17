# wellezyPTC (prueba tecnica)

- **Wezelley**: Una aplicación React.
- **API-Wellezy**: Una API construida con Laravel.	

## Clonar el Repositorio

Para clonar este repositorio en tu máquina local, usa el siguiente comando:

```bash
git clone https://github.com/tu-usuario/wellezyPTC.git
cd wellezyPTC
```
## Instalación de Dependencias
### Wezelley (React)
1. Navega al directorio del proyecto React:
```bash
cd wezelley
```
2. Instala las dependencias usando npm o yarn. Puedes elegir el que prefieras:
#### Con npm:
```bash
npm install
```
#### Con yarn:
```bash
yarn install
```
### API-Wellezy (Laravel)
1. Navega al directorio del proyecto Laravel:
```bash
cd api-wellezy
```
2. Instala las dependencias usando Composer:
```bash
composer install
```
3. Copia el archivo de configuración .env.example a .env y configura las variables de entorno:
```bash
cp .env.example .env
```
4. Genera una nueva clave de aplicación:
```bash
php artisan key:generate
```
5. Ejecuta las migraciones de base de datos (si es necesario):
```bash
php artisan migrate
```
## Instalación de Dependencias
### Wezelley (React)
1. Navega al directorio del proyecto React (si no estás ya allí):
```bash
cd wezelley
```
2. Ejecuta la aplicación en modo de desarrollo:
#### Con npm:
```bash
npm run dev
```
#### Con yarn:
```bash
yarn run dev
```
Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en http://localhost:3000.

### API-Wellezy (Laravel)
1. Navega al directorio del proyecto Laravel (si no estás ya allí):
```bash
cd api-wellezy
```
2. Inicia el servidor de desarrollo de Laravel:
```bash
php artisan serve
```
Esto iniciará el servidor en http://localhost:8000.

### Notas Adicionales
- Asegúrate de tener las versiones correctas de Node.js, npm/yarn, PHP y Composer instaladas en tu sistema.
- Verifica la configuración de tu base de datos en el archivo .env para el proyecto Laravel.

