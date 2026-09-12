import { describe, it, expect } from 'vitest'
import { esCorreoValido, contarTareasPendientes } from './validaciones'

describe('esCorreoValido', () => {
  it('acepta un correo con formato valido', () => {
    // Arrange
    const correo = 'usuario@ejemplo.com'
    // Act
    const resultado = esCorreoValido(correo)
    // Assert
    expect(resultado).toBe(true)
  })

  it('rechaza un correo sin arroba', () => {
    // Arrange
    const correo = 'usuario-dominio.com'
    // Act
    const resultado = esCorreoValido(correo)
    // Assert
    expect(resultado).toBe(false)
  })

  it('rechaza un correo sin extensión de dominio', () => {
    // Arrange
    const correo = 'usuario@dominio'
    // Act
    const resultado = esCorreoValido(correo)
    // Assert
    expect(resultado).toBe(false)
  })
})

describe('contarTareasPendientes', () => {
  it('debe contar el número de tareas pendientes', () => {
    const tareas = [
      { completada: true },
      { completada: false },
      { completada: false }
    ]
    expect(contarTareasPendientes(tareas)).toBe(2)
  })

  it('devuelve 0 si no hay tareas pendientes', () => {
    expect(contarTareasPendientes([])).toBe(0)
  })
})