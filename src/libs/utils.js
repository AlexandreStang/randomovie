export function sortData(data, value) {
    return data.sort((a, b) => a[value].localeCompare(b[value]))
}