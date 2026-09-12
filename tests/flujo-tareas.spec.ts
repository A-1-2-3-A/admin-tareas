import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
    // 1. Entrar a la aplicación
    await page.goto('/')

    // 2. Iniciar sesión
    await page.getByPlaceholder('Correo').fill('admin@test.com')
    await page.getByPlaceholder('Contraseña').fill('admin')
    await page.getByRole('button', { name: 'Entrar' }).click()

    // 3. Esperar a que aparezca el formulario de tareas
    await expect(page.getByLabel('Nueva tarea')).toBeVisible()

    // 4. Crear una tarea
    const titulo = `Completar la tarea del ${Date.now()}`

    await page.getByLabel('Nueva tarea').fill(titulo)
    await page.getByRole('button', { name: 'Agregar' }).click()

    // 5. Verificar que aparece en la lista
    await expect(page.getByText(titulo)).toBeVisible()
})