import request from 'supertest'
import { describe, it, expect } from 'vitest'
import jwt from 'jsonwebtoken'
import app from '../src/app'

describe('API de tareas', () => {

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

})