const flatten = array =>
  array.reduce((flattened, elem) => {
    if (Array.isArray(elem))
      return elem.reduce((flattened, subelem) => [...flattened, subelem], flattened)
    else
      return [...flattened, elem]
  }, [])

export { flatten }
