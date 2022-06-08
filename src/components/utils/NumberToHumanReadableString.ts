export function numberToHumanReadableString (x: number, separator: string) {
    console.log(x, separator);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
