export const UpperCaseFirstLetter = (value) =>{
    if(value == null) return ''
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}