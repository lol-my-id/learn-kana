export function randomEntry(table: Array<string>): string {
    const randomIndex = Math.floor(Math.random() * table.length);

    return table[randomIndex];
}