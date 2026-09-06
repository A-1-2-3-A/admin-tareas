# Administrador de tareas

Administra una lista de tareas estructurada en memoria y con credenciales fijas, con usuarios reales almacenados en base de datos, contraseñas cifradas y endpoints protegidos por un middleware de control de acceso.

<!-- BADGE_CI -->

## 🚀 Instalación local

```bash

git clone https://github.com/A-1-2-3-A/admin-tareas.git
cd admin-tareas
npm install

```
### Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/admin_tareas"

```

## 📜 Comandos disponibles

| Comando         | Descripción                                             |
|-----------------|---------------------------------------------------------|
| `npm run dev`   | Levanta el entorno de desarrollo                        |
| `npm run build` | Genera el build de producción                           |
| `npm test`      | Corre las pruebas automatizadas (pendiente — Sesión 3)  |

## 🗄️ Base de datos

PostgreSQL con migraciones y seeds gestionados
con Prisma (ver Módulo 2)