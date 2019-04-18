import Table from './components/table.mjs'
import movieService from './api/movie.mjs'

const table = Table('#movies', {
    header: [
        { label: 'Título', field: 'title' },
        { label: 'Descripción', field: 'description' },
        { label: 'Año', field: 'year' },
        { label: 'Duración', field: 'runtime' },        
        { label: 'Pais', field: 'country' },
        {
            label: 'Guionistas',
            field: 'writers',
            render: function (data) { return data.join(', ') }
        }
    ],
    data: [],
    onSelectedRow: function (row) {
        console.log(table.getSelectedRows())
    },
    onDeselectedRow: function () {
        console.log(table.getSelectedRows())
    }
})

movieService.getAll().then(table.update)
