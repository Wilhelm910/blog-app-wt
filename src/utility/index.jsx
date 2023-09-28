export const excerpt = (string, count) => {
    let str
    if (string.length > count) {
        str = string.substring(0, count) + "..."
    }
    return str
}