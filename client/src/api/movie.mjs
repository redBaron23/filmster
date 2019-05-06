function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
}

export default {

    getAll,
}


