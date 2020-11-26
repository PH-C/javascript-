function lottery(whiteList, participant, lotteryWhiteNum, lotteryParticipantNum) {
  const whiteListObj = {}; //白名单列表数组转对象
  const lotteryList = {} // 中奖用户
  const restParticipant = [] //除必中用户之外其他参与用户
  const whiteListlen = whiteList.length;
  const participantLen = participant.length;
  for (let i = 0; i < whiteListlen; i++) {
    const item = whiteList[i];
    whiteListObj[item] = 1;
  }
  for (let j = 0; j < participantLen; j++) {
    const vItem = participant[j];
    if (whiteListObj[vItem] &&  Object.keys(lotteryList).length < lotteryWhiteNum) {
      lotteryList[vItem] = 1
    } else {
      restParticipant.push(vItem)
    }
  }
  const restLotteryLen = lotteryParticipantNum - Object.keys(lotteryList).length //还需中奖人数
  const restParticipantLen = restParticipant.length
  console.log('还需中奖人数:', restLotteryLen, '除必中用户之外其他参与用户的总数:', restParticipantLen)

  function getRandomNum(num) {
    return Math.ceil(Math.random()*num)
  }

  for (let k = 0; k < restLotteryLen; k++) {
    function getRestLottery() {
      let preItem = restParticipant[getRandomNum(restParticipantLen-1)]
      
      if(!lotteryList[preItem]) {
        lotteryList[preItem] = 1
      } else {
        getRestLottery()
      }
    }
    getRestLottery()
  }

  return lotteryList
}
const whiteList = [112, 113, 115, 116, 221, 331, 445, 667, 899];//表示从其他系统中计算出来的活跃用户，如果这批用户参与抽奖则必中，需限制必中用户最多中奖人数即通过下面的lotteryWhiteNum控制
const lotteryWhiteNum = 5; //限制必中用户最多中奖人数
const participant = [899, 112, 677, 113, 788, 115, 116, 331, 445, 566, 778, 992, 377, 777, 888, 999];//表示此次活动参与抽奖的用户，需限制中奖用户数量，下面的lotteryParticipantNum变量用于控制中奖用户数量
const lotteryParticipantNum = 10;//控制中奖用户数量
console.log('恭喜中奖了！', Object.keys(lottery(whiteList, participant, 5, 10)))
