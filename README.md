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
