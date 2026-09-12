import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {

    // 1. Abrir la aplicación
    await page.goto('/')

    // 2. Ir al registro
    await page.getByText('¿No tienes cuenta? Regístrate aquí').click()

    // 3. Registrar usuario
    const email = `e2e${Date.now()}@test.com`

    await page.getByPlaceholder('Nombre').fill('Usuario E2E')
    await page.getByPlaceholder('Correo').fill(email)
    await page.getByPlaceholder('Contraseña').fill('123456')

    await page.getByRole('button', { name: 'Registrarse' }).click()

    // 4. Volver al login
    await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible()

    // 5. Iniciar sesión
    await page.getByPlaceholder('Correo').fill(email)
    await page.getByPlaceholder('Contraseña').fill('123456')
    await page.getByRole('button', { name: 'Entrar' }).click()

    // 6. Esperar el formulario de tareas
    await expect(page.getByLabel('Nueva tarea')).toBeVisible()

    // 7. Crear tarea
    const titulo = `Tarea E2E ${Date.now()}`

    await page.getByLabel('Nueva tarea').fill(titulo)
    await page.getByRole('button', { name: 'Agregar' }).click()

    // 8. Verificar que aparece
    await expect(page.getByText(titulo)).toBeVisible()
})