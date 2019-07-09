/**
 * 解决JS浮动数计算精度问题
 */
/**
 * 化整
 */
function _toInteger(num1, num2) {
  if (typeof num1 !== 'string') {
    num1 = num1.toString()
  }
  if (typeof num2 !== 'string') {
    num2 = num2.toString()
  }
  let l1 = 0
  let l2 = 0
  let l = 0
  if (num1.indexOf('.') > -1) {
    l1 = num1.split('.')[1].length
  }
  if (num2.indexOf('.') > -1) {
    l2 = num2.split('.')[1].length
  }
  if (l1 > l2) {
    l = 10 ** l1
  } else {
    l = 10 ** l2
  }
  num1 = Number(num1) * l
  num2 = Number(num2) * l
  return {
    num1,
    num2,
    l,
  }
}

exports.addFn = (a, b) => {
  const { num1, num2, l } = _toInteger(a, b)
  return (num1 + num2) / l
}

exports.subFn = (a, b) => {
  const { num1, num2, l } = _toInteger(a, b)
  return (num1 - num2) / l
}

exports.multiFn = (a, b) => {
  const { num1, num2, l } = _toInteger(a, b)
  return (num1 * num2) / l ** 2
}

exports.divideFn = (a, b) => {
  const { num1, num2 } = _toInteger(a, b)
  return (num1 / num2)
}




