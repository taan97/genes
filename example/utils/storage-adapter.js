/**
 * function to save key/value pairs in the browser
 * @param {String} key
 * @param {*} value
 * @return {void}
 */
export function setItemToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * function to retrieve a piece of data which has been saved in the browser before by its key
 * @param {String} key
 * @returns {*}
 */
export function getItemFromStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return localStorage.getItem(key) ?? ''
  }
}

/**
 * function to remove an item in the browser by its key
 * @param {String} key
 * @return {void}
 */
export function removeItemFromStorage(key) {
  localStorage.removeItem(key)
}

/**
 * function to clear all data
 */
export function clearStorage() {
  localStorage.clear()
}
