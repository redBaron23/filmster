export function parseCSV(val) {
    return val.split(',').flatMap(v => v.split());
}

