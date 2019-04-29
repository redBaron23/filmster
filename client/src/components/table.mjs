import { h, createElement } from '../core/render.mjs';

function generateHeader(headers) {
    const ths = headers.map(function (header) {
        return h('th', {}, header.label);
    })

    const thead = h('thead', {}, h('tr', {}, [
        h('th'),
        ...ths
    ]))

    return createElement(thead)
}

function generateBody(headers, rows) {
    const trs = rows.map(function (row) {
        const tds = headers.map(function (header) {
            const { label, field, render } = header
            const cellData = row[field]
            const cell = render ? render(cellData) : cellData

            return h('td', { 'data-label': label }, cell)
        })

        const $check = createElement(h('input', { type: 'checkbox' }))
        $check.row = row;

        const check = h('td', {}, $check)

        return h('tr', {}, [
            check,
            ...tds
        ])
    })

    const tbody = h('tbody', {}, trs)
    return createElement(tbody)
}

function render(table) {
    const { $el, header, data } = table 
    const $header = generateHeader(header)
    const $body = generateBody(header, data)

    const $fragment = document.createDocumentFragment()
    $fragment.append($header)
    $fragment.append($body)

    $el.append($fragment)
}

function update(table, data) {
    table.selectedRows = []
    table.data = data
    const $body = generateBody(table.header, table.data)

    table.$el.replaceChild($body, table.$el.querySelector('tbody'))
}

function onCheckClicked(table, e) {
    if (e.target.nodeName === 'INPUT') {
        const isSelected = e.target.checked
        const toggleRow = e.target.row

        if (isSelected) {
            table.selectedRows = [...table.selectedRows, toggleRow]

            table.onSelectedRow(toggleRow)
        } else {
            table.selectedRows = table.selectedRows.filter(function (row) {
                return row.title !== toggleRow.title
            })

            table.onDeselectedRow(toggleRow)
        }
    }
}

function init(el, config) {
    const $el = document.querySelector(el)

    const table = {
        $el,
        data: config.data,
        header: config.header,
        selectedRows: [],
        getSelectedRows: () => table.selectedRows,
        onSelectedRow: config.onSelectedRow || new Function(),
        onDeselectedRow: config.onDeselectedRow || new Function()
    }

    render(table)

    table.update = update.bind(null, table),
    $el.addEventListener('click', onCheckClicked.bind(null, table));

    return table
}

export default init
