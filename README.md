# Challenge Tenpo

Este proyecto es una aplicación web moderna construida con Next.js que implementa un sistema de autenticación seguro y una interfaz de usuario elegante siguiendo los principios de Atomic Design.

## 🚀 Características

- 🔐 Sistema de autenticación completo
- 🎨 Componentes UI reutilizables basados en Atomic Design
- 📱 Diseño responsive
- 🧪 Testing exhaustivo
- 📚 Documentación de componentes con Storybook
- ♾️ Scroll infinito optimizado
- 🔄 Manejo de estado con React Query

## 🛠️ Tecnologías Principales

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Query
- Jest & React Testing Library
- Storybook
- Zod (validación)

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Git

## 🚀 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/francoalemandi1/challenge-tenpo.git
cd challenge-tenpo
```

2. Instalar dependencias:

```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env.local
```

Editar `.env.local` con tus valores correspondientes.

## 🎮 Scripts Disponibles

- Desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

- Build de producción:

```bash
npm run build
# o
yarn build
```

- Tests:

```bash
# Correr todos los tests
npm test
# o
yarn test

# Modo watch
npm test:watch
# o
yarn test:watch
```

- Storybook:

```bash
npm run storybook
# o
yarn storybook
```

Storybook estará disponible en `http://localhost:6006`

- Linting:

```bash
npm run lint
# o
yarn lint
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App router de Next.js
├── components/
│   ├── atoms/             # Componentes atómicos (Button, Input, etc.)
│   ├── molecules/         # Componentes moleculares
│   ├── organisms/         # Componentes organismos
│   ├── templates/         # Templates de página
│   └── layouts/           # Layouts reutilizables
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades y configuraciones
├── services/              # Servicios de API
└── types/                 # Definiciones de tipos TypeScript
```

## 🧪 Testing

El proyecto utiliza Jest y React Testing Library para testing. Los tests están organizados junto a sus componentes:

```
component/
├── Component.tsx
├── __tests__/
│   └── Component.test.tsx
└── __stories__/
    └── Component.stories.tsx
```

## 📚 Documentación de Componentes

Utilizamos Storybook para documentar nuestros componentes. Cada componente tiene su archivo `.stories.tsx` correspondiente que muestra sus diferentes estados y variantes.

## 🔒 Autenticación

El sistema de autenticación utiliza JWT con refresh tokens. Las rutas protegidas están manejadas por el middleware de Next.js.

## 🌐 API Endpoints

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Refrescar token
- `GET /api/auth/check` - Verificar autenticación

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Convenciones de Código

- Utilizamos ESLint y Prettier para mantener un código consistente
- Seguimos las convenciones de Conventional Commits para los mensajes de commit
- Los componentes están organizados siguiendo la metodología Atomic Design

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un issue describiendo el problema y cómo reproducirlo.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
