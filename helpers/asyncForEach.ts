export default async function asyncForEach(array: any[], callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
