(function(initialRemainTime) {
  let remainTime = initialRemainTime;
  let interval;
  window['__setRemainTime'] = (newRemainTime) => {
    remainTime = newRemainTime;
  }
  window['__addRemainTime'] = (timeToAdd) => {
    remainTime += timeToAdd;
  }
  window['__stopTimer'] = () => {
    clearInterval(interval);
  }
  window['__startTimer'] = () => {
    interval = setInterval(() => {
      PageCall.setState('PageCallElapsedTime', remainTime -= 500);
    }, 500);
  }
  window['__startTime']();
})(60 * 60000);