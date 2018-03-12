function contains(string, array, wordMatch = false) {
  return array.some((term) => {
    const includes = string.toLowerCase().includes(term)
    if(wordMatch && includes && term.split().length > 0) {
      const regex = new RegExp('\\b'+term+'\\b', 'g')
      return !!string.toLowerCase().match(regex)
    }

    //default behaviour
    return includes
  });
}

// loops arguments and returns a random one
// each entry has equal chance unless a weight is specified
// 'hi' as an argument this will have 1/n chance
// [4, 'lol'] as an argument this will have 4/n chance
// oneOf('hi', [2, 'hello']) this has 1/3 chance of returning hi
//                           and a 2/3 chance of returning hello
function oneOf() {
  let args = [...arguments]
  let arr = []
  args.forEach((item) => {
    if(Array.isArray(item)) {
      arr = arr.concat(Array(item[0]).fill(item[1]))
    } else {
      arr.push(item)
    }
  })
  console.log(arr)
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = {
  contains,
  oneOf
}
