export const LocalStorage = {
  get(key) {},
  set(key, value) {},
  remove(key) {},
  clear() {},
}

// function saveBreed(breed) {
//     localStorage.seetItem('breed', breed)
// }

// function getSavedBreed() {
//     return localStorage.getItem('breed')
// }

// function removeBreed() {
//     return localStorage.removeItem('breed')
// }

// function applyBreedPreference(filters) {
//     const breed = getSavedBreed()

//     if(breed) {
//         filters.set('breed', breed)
//     }

//     return filters
// }

// function savePreferences(filters) {
//     const filterString = JSON.stringify([...filters])
//     localStorage.setItem('preferences', filterString)
// }

// function retrievePreferences() {
//     const preferences = JSON.parse(localStorage.getItem('preferences'))
//     return new Map(preferences)
// }

// function clearPreferences() {
//     localStorage.clear()
// }

// // 배열이나 객체를 저장할 때 JSON.stringify() 문자열로 변환 / JSON.parse() 객체로 변환
