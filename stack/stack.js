class Stack {
  constructor() {
    this.items = [];
  }
  //添加一个新元素到栈顶
  push(ele) {
    this.items.push(ele);
  }
  //移除栈顶元素，同时返回被移除元素
  pop() {
    return this.items.pop();
  }
  //返回栈顶元素
  peek() {
    return this.items[this.items.length - 1];
  }
  //判断栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  //移除栈内所有元素
  clear() {
    this.items = [];
  }
  //返回栈里元素个数
  size() {
    return this.items.length;
  }
}
//栈的应用 十进制转二进制
//问题分析十进制转二进制是将数除以2，得到商和余数，余数压入栈内，商继续除以2直至商为0为止
function decimalToBinary(decNumber) {
  const remStack = []
 
  function getQuotientAndRemainder(dividend) {
    let remainder = Math.floor(dividend % 2) // 余数
    let quotient = Math.floor(dividend / 2)  // 商

    if (quotient === 0) {
      return remStack.reverse().join('')
    } else {
      remStack.push(remainder)
      return getQuotientAndRemainder(quotient)
    }
  }

  return getQuotientAndRemainder(decNumber)
}
console.log('decimalToBinary(233)', decimalToBinary(233))


function decimalToBinary2(decNumber) {
  const remStack = new Stack()

  let remainder // 余数
  let quotient = decNumber  // 商
  let result = ''

  while (quotient > 0) {
    remainder = Math.floor(quotient % 2)
    remStack.push(remainder)
    quotient = Math.floor(quotient / 2)
  }

  while (!remStack.isEmpty()){
    result += remStack.pop().toString()
  }
  return result
}
console.log('decimalToBinary-2(233)', decimalToBinary2(233))

