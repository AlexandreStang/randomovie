export function sortData(data, value) {
    return data.sort((a, b) => a[value].localeCompare(b[value]))
}

export function calculateRuntime(time) {
    const minutes = time % 60;

    if (time < 60) {
        return (minutes + "m");
    }

    var hours = Math.floor(time / 60);

    return (hours + "h " + minutes + "m");
}