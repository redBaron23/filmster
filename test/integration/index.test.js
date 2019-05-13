const startServer = require('../../server/src/index.js')
const fetch = require('node-fetch');

let server, baseURL;

beforeAll(async () => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}/api/v1`
})

afterAll(() => {
    server.close()
})

test('Se debería iniciar la aplicación sin películas', async () => {
    const URL = `${baseURL}/movies`;
    const req = await fetch(URL)
    const movies = await req.json()

    expect(movies.length).toBe(0)
});
