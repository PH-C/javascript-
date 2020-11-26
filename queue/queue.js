class Queue {
  constructor() {
    this.count = 0;
    this.firstCount = 0;
    this.items = {};
  }
  enQueue(element) {
    this.items[this.count] = element;
    this.count++;
  }
  deQueue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.firstCount];
    delete this.items[this.firstCount];
    this.firstCount++;
    return res;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.firstCount];
  }
  isEmpty() {
    return this.count - this.firstCount === 0;
  }
  size() {
    return this.count - this.firstCount;
  }
}

// 双端队列 是一种类似队列和栈相结合的数据结构
class Deque {
  constructor() {
    this.count = 0;
    this.firstCount = 0;
    this.items = {};
  }
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.firstCount > 0) {
      this.firstCount--;
      this.items[this.firstCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.firstCount = 0;
      this.items[0] = element;
    }
  }
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.firstCount];
    delete this.items[this.firstCount];
    this.firstCount++;
    return res;
  }
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const res = this.items[this.count];
    delete this.items[this.count];
    return res;
  }
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.firstCount];
  }
  peekBack() {
    return this.items[this.count];
  }
  isEmpty() {
    return this.count - this.firstCount === 0;
  }
  size() {
    return this.count - this.firstCount;
  }
}
// 循环队列 --击鼓传花游戏 在这个游戏中，孩子们围成一个圈，把花尽快的传递给旁边的人，某个时刻传话停止，这个时候花在谁的手里，谁就退出游戏，重复这个过程，直到只剩下一个人为止（胜者）
//分析在这个游戏中每个人传一次花可以视为双端队列中，把队头位置的人模拟成手里拿着花的那个人，人从队列头部出列，加入到队列尾部的过程我们可以视为传花过程，我们可以使用队列，人不断地
//从队头跑到队尾，在某个时刻停止，此时在队头位置的人视为手里拿着花的人,这里为了简单模拟某个时刻停止，使用在第n次传花过程结束后，即停止传花
/* 烫手的山芋 */
function hotPotato(elementList, num) {
  const quenu = new Queue();
  const eliminatedList = [];
  elementList.forEach((element) => {
    quenu.enQueue(element);
  });
  while (quenu.size() > 1) {
    for (let i = 0; i < num; i++) {
      quenu.enQueue(quenu.deQueue());
    }
    eliminatedList.push(quenu.deQueue());
  }
  return {
    eliminatedList: eliminatedList,
    winner: quenu.deQueue(),
  };
}
const names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
const result = hotPotato(names, 7);
result.eliminatedList.forEach((name) => {
  console.log(`${name}在击鼓传花游戏中被淘汰。`);
});
console.log(`胜利者：${result.winner}`);
// Camila在击鼓传花游戏中被淘汰。
// Jack在击鼓传花游戏中被淘汰。
// Carl在击鼓传花游戏中被淘汰。
// Ingrid在击鼓传花游戏中被淘汰。
// 胜利者：John

//回文检查器
//回文是正反都能读通的单词、词组、数或一系列的序列
// 最简单的方法是将字符串反向排列并检查他和原字符串是否相同。如果两者相同就是一个回文
// 利用数据结构来解决最简单的方法是使用双端队列
function palindromeChecker(aString) {
  if (
    aString === undefined ||
    aString === null ||
    (aString !== null && aString.length === 0)
  ) {
    return false;
  }
  const deque = new Deque();
  const lowerString = aString.toLocaleLowerCase().split(' ').join('');
  let isEqual = true;
  let firstChar, lastChar;
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}
console.log('a', palindromeChecker('a'))
console.log('level', palindromeChecker('level'))
console.log('see', palindromeChecker('see'))
// a true
// level true
// see false
