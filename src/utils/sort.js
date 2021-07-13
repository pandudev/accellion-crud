export const SortByObjField = (data, isAscending, field, isNumber) => {

    let sortedData;

    if (isNumber) {
        sortedData = data.sort((a, b) => parseInt(a[field]) - parseInt(b[field]));
    } else {
        sortedData = data.sort((a, b) => a[field] > b[field] ? -1 : (a[field] < b[field] ? 1 : 0));
    }

    if (!isAscending) {
        return sortedData.reverse()
    }
    return sortedData;
}