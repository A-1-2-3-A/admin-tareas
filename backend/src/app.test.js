import request from 'supertest'
import { describe, it, expect } from 'vitest'
import jwt from 'jsonwebtoken'
import app from '../src/app'

describe('API de tareas', () => {

    it('responde correctamente en la ruta principal', async () => {
        const res = await request(app).get('/')

        expect(res.status).toBe(200)
        expect(res.text).toBe('Servidor funcionando')
    })

    it('rechaza el login sin correo y contraseña', async () => {
        const res = await request(app)
            .post('/login')
            .send({})

        expect(res.status).toBe(400)
        expect(res.body.message).toBe('Email and password are required')
    })

    it('rechaza el login sin contraseña', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'test@test.com'
            })

        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Email and password are required')
    })

    it('rechaza el registro sin correo y contraseña', async () => {
        const res = await request(app)
            .post('/register')
            .send({})

        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Name, email and password are required')
    })

    it('rechaza el registro sin correo', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                name: 'Usuario'
            })

        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Name, email and password are required')
    })

    it('rechaza el registro sin contraseña', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                name: 'Usuario',
                email: 'test@test.com'
            })

        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Name, email and password are required')
    })

    it('rechaza acceder a tareas sin token', async () => {
        const res = await request(app)
            .get('/tasks')

        expect(res.status).toBe(401)
        expect(res.body.message).toBe('No token provided')
    })

    it('rechaza acceder a tareas con un token inválido', async () => {
        const res = await request(app)
            .get('/tasks')
            .set('Authorization', 'Bearer token-invalido')

        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Invalid token')
    })

    it('rechaza crear una tarea con texto vacío', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'test@test.com'
            },
            'secret_key',
            {
                expiresIn: '1h'
            }
        )

        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                text: ''
            })

        expect(res.status).toBe(400)
    })

    it('rechaza crear una tarea con texto de solo espacios', async () => {

        const token = jwt.sign(
            {
                id: 1,
                email: 'test@test.com'
            },
            'secret_key',
            {
                expiresIn: '1h'
            }
        )

        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                text: '   '
            })

        expect(res.status).toBe(400)
    })

})