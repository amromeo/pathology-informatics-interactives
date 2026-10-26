export function mustFind<T>(rows: readonly T[], predicate: (row: T) => boolean, label: string): T {
  const row = rows.find(predicate);
  if (row === undefined) throw Error("Missing lesson record: " + label);
  return row;
}
