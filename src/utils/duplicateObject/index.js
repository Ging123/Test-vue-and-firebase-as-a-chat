export function duplicateObject(object, duplicateQuantity=100) {
  const duplicates = [];
  for (let i = 0; i < duplicateQuantity; i++) duplicates.push({ ...object });
  return duplicates;
}