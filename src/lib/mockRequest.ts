/**
 * Purely for the sake of the exercise
 * The arguemtns are passing through and can be reused in the resulting promise
 *
 * Had not enough time to deal with generic types today
 */

export function mockRequest<args>(...args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        reject(new Error('🧨🧨🧨'))
      } else {
        resolve(...args)
      }
    }, Math.random() * 300)
  })
}
