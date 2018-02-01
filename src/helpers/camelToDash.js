const parse = str => str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
export default (value) => {
  if(typeof value == 'object') {
    const object = {}
    for(let i in value) {
      object[ parse(i) ] = value[i]
    }
    return object
  } else {
    return parse(value)
  }

}
