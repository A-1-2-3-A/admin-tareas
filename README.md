# Task Manager Full Stack — admin-tareas

Aplicación full stack de administración de tareas construida con React + TypeScript en el frontend y Node.js + Express + PostgreSQL + Prisma en el backend. Cuenta con autenticación de usuarios reales mediante JSON Web Tokens (JWT) y contraseñas protegidas con algoritmos de hashing seguro (`bcrypt`).

El proyecto evolucionó desde una lista de tareas estructurada en memoria y con credenciales fijas, hacia una arquitectura robusta desacoplada con usuarios reales almacenados en base de datos, contraseñas cifradas y endpoints protegidos por un middleware de control de acceso.

## Características

* **Gestión de Sesiones**: Registro e inicio de sesión con usuarios persistidos de forma única en PostgreSQL.
* **Seguridad Avanzada**: Contraseñas protegidas mediante criptografía hash con `bcryptjs`, imposibilitando su almacenamiento en texto plano.
* **Control de Acceso**: Autenticación asíncrona basada en JSON Web Tokens (JWT) con tiempo de expiración configurado de 1 hora.
* **End-points Protegidos**: Operaciones CRUD sobre el recurso de tareas resguardadas tras un middleware de validación estricta en el backend.
* **CRUD Completo de Tareas**: Interfaz adaptativa para crear, listar, modificar estados y eliminar registros.
* **Reactividad en Tiempo Real**: Contadores lógicos integrados en la UI que calculan dinámicamente tareas totales, pendientes y completadas.

---

## Tecnologías Utilizadas

Tecnología            | Tipo          | Uso Específico en el Proyecto 
---                   | ---           | --- 
**React 19**          | Frontend      | Construcción de la interfaz de usuario modular y reactiva. 
**TypeScript**        | Lenguaje      | Tipado estático para la definición de tareas, propiedades y estados lógicos. 
**Vite**              | Herramienta   | Servidor de desarrollo optimizado con HMR y empaquetado del frontend. 
**Lucide React**      | Librería      | Set de iconografía vectorial limpia y estilizada para la botonera de la interfaz. 
**Node.js**           | Backend       | Entorno de ejecución del servidor asíncrono. 
**Express 5**         | Backend       | Framework web para el mapeo de la API REST, enrutamiento y procesamiento de payloads JSON. 
**PostgreSQL**        | Base de Datos | Motor relacional para asegurar la persistencia y atomicidad de los datos. 
**Prisma**            | ORM           | Abstracción de base de datos, tipado automático y manejo del historial de migraciones. 
**jsonwebtoken**      | Seguridad     | Mecanismo descentralizado de generación, firma y verificación de tokens de sesión. 
**bcryptjs**          | Seguridad     | Encriptación unidireccional no reversible para contraseñas críticas. 
**Thunder Client**    | Pruebas       | Extensión integrada para pruebas de endpoints, simulación de cabeceras y flujos de error. 

---

## Estructura del Proyecto

La organización modular del repositorio se compone de la siguiente forma:

admin-tareas/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Modelos de entidad Task y User para PostgreSQL
│   │   └── migrations/            # Historial secuencial de cambios en la BD
│   └── src/
│       └── index.ts               # Inicialización de Express, Middlewares y Endpoints
├── src/
│   ├── components/
│   │   ├── LoginForm.tsx          # Pantalla aislada para la autenticación de usuarios
│   │   ├── RegisterForm.tsx       # Formulario y validaciones para creación de usuarios
│   │   ├── Header.tsx             # Identidad de la app y disparador de cierre de sesión
│   │   ├── TaskInput.tsx          # Control y envío de nuevas descripciones de tareas
│   │   ├── TaskList.tsx           # Contenedor iterador de colecciones o estados vacíos
│   │   ├── TaskCard.tsx           # Renderizado unitario y acciones lógicas por tarea
│   │   ├── EmptyState.tsx         # Componente visual para colecciones sin datos
│   │   └── Footer.tsx             # Panel dinámico de control estadístico de tareas
│   └── App.tsx                    # Nodo raíz del frontend, gestiona estados globales de sesión
├── package.json                   # Manifiesto de dependencias del ecosistema frontend
└── README.md                      # Documentación del sistema

---

## Modelo de Datos (Prisma)

Definición de modelos relacionales estructurados en el archivo `backend/prisma/schema.prisma`:

model Task {
    id          Int         @id @default(autoincrement())
    text        String
    completed   Boolean     @default(false)
    createdAt   DateTime    @default(now())
}

model User {
    id          Int         @id @default(autoincrement())
    name        String      
    email       String      @unique
    password    String      
    createdAt   DateTime    @default(now())
}

---

## Rutas de la API REST

* **Base URL en entorno de desarrollo:** `http://localhost:3000`

Método      | Ruta          | Protegida | Descripción                                       | Payloads esperados / Respuestas
---         | ---           | ---       | ---                                               | ---
**GET**     | `/`           | No        | Comprobación de salud (Health check).             | Retorna texto plano confirmando ejecución.
**POST**    | `/register`   | No        | Registra un nuevo usuario en la base de datos.    | `body: { name, email, password }` $\rightarrow$ Hashea la clave.
**POST**    | `/login`      | No        | Evalúa credenciales y emite tokens JWT.           | `body: { email, password }` $\rightarrow$ Responde con Token y Datos de Usuario.
**GET**     | `/tasks`      | **Sí**    | Obtiene la colección completa de tareas mapeadas. | Retorna un arreglo JSON con las tareas encontradas.
**POST**    | `/tasks`      | **Sí**    | Inserta una nueva tarea asociada en el sistema.   | `body: { text }` $\rightarrow$ Retorna el objeto de la tarea creada (201).
**PUT**     | `/tasks/:id`  | **Sí**    | Modifica el texto o el estado de completitud.     | `body: { text, completed }` por parámetro id de ruta.
**DELETE**  | `/tasks/:id`  | **Sí**    | Remueve físicamente el registro según su ID.      | Parámetro id de ruta $\rightarrow$ Devuelve confirmación de éxito.

> ⚠️ **Inyección de Cabecera Obligatoria:** Todas las solicitudes hacia endpoints marcados como protegidos deben suministrar la propiedad estruturada en su cabecera HTTP:
> `Authorization: Bearer <token_jwt>`
> Ante la ausencia, malformación o expiración del token, el backend responderá un código de estado `401 Unauthorized`.

---

## Instalación y Ejecución

### Requisitos Previos

* **Node.js**: Versión 18.0.0 o superior instalada.
* **PostgreSQL**: Servidor activo de base de datos relacional.

### 1. Clonar el repositorio

```bash
git clone https://github.com/A-1-2-3-A/admin-tareas.git
cd admin-tareas

```

### 2. Despliegue y Configuración del Backend

Navega al subdirectorio del backend e instala su árbol de dependencias:

```bash
cd backend
npm install

```

Genera un archivo de variables de entorno `.env` en la raíz de la carpeta `backend/` e introduce tu string de conexión de PostgreSQL:

DATABASE_URL="postgresql://usuario:password@localhost:5432/admin_tareas"

Impacta la estructura relacional ejecutando el motor de migraciones del ORM y generando el respectivo cliente programático:

```bash
npx prisma migrate dev

```

Levanta el servidor Express en modo de desarrollo adaptativo (`ts-node-dev`):

```bash
npm run dev

```

### 3. Configuración del Frontend

Abre una terminal paralela orientada en el directorio raíz del proyecto:

```bash
npm install
npm run dev

```

La SPA estará disponible de forma automática en la dirección local provista por Vite (por defecto, `http://localhost:5173`).

### 4. Inspección Visual de Datos (Opcional)

Puedes valerte de la interfaz administrativa gráfica integrada de Prisma para monitorear y alterar tablas de forma visual:

```bash
cd backend
npx prisma studio

```

---

## Consideraciones de Seguridad

1. **Hashing Unidireccional**: Al procesar solicitudes en `/register`, las contraseñas planas sufren un proceso de salado y hashing mediante `bcrypt` con un factor de coste de 10 rondas, resguardando la integridad física ante posibles brechas de datos.
2. **Middleware de Intercepción**: La función `authenticateToken` actúa como una capa defensiva que extrae, sanitiza mediante `.split(" ")[1]` y valida las firmas criptográficas de los tokens emitidos antes de otorgar paso a las consultas a la base de datos.

---

## Capturas de Evidencia

*Espacio reservado para incorporar los gráficos requeridos por los criterios de evaluación:*

* **Pantalla de Aplicación Principal**: Interfaz operativa listando tareas y mostrando contadores de estado.
* **Vistas de Login y Registro**: Formularios con persistencia y manejo de errores dinámicos.
* **Pruebas en Thunder Client**:
* `POST /login` retornando exitosamente el token JWT.
* Petición autorizada con cabecera `Authorization` respondiendo `200 OK`.
* Simulación de rechazo (`401 Unauthorized`) al realizar consultas sin token.


* **Prisma Studio**: Captura de las colecciones de usuarios y tareas sincronizadas de manera persistente.

---