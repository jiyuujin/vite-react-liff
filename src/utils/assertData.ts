export function assertData<T>(data: T): asserts data is NonNullable<T> {
  if (data === undefined || data === null) throw new Error('Invalid Data')
}
