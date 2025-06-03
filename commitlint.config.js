module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nueva característica
        'fix', // Corrección de errores
        'docs', // Documentación
        'style', // Cambios que no afectan el significado del código
        'refactor', // Refactorización del código
        'test', // Añadir o modificar tests
        'chore', // Cambios en el proceso de build o herramientas auxiliares
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
}
