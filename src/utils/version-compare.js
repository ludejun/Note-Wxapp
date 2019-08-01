// app版本X.X.X格式，X有位数有可能大于1
// v1>=v2返回true,v1<v2返回false;
module.exports = (versionA, versionB) => {
  if (!versionA) {
    return false;
  }
  versionA = (versionA.match(/\d*\.\d*\.\d*/) || versionA.match(/\d*\.\d*/))[0]; // 1.2.1 || 1.2
  versionB = (versionB.match(/\d*\.\d*\.\d*/) || versionB.match(/\d*\.\d*/))[0]; // 1.2.1 || 1.2
  const versionAList = versionA.split('.');
  const versionBList = versionB.split('.');
  if (versionBList.length < 3) {
    versionBList.push(0);
  } // 保证versionB是3位数字
  let result = true;
  for (let i = 0; i < versionAList.length; i++) {
    if (versionBList[i] && parseInt(versionAList[i], 10) > parseInt(versionBList[i], 10)) {
      result = true;
      break;
    } else if (parseInt(versionAList[i], 10) === parseInt(versionBList[i], 10)) {
      result = true;
    } else if (parseInt(versionAList[i], 10) < parseInt(versionBList[i], 10)) {
      result = false;
      break;
    }
  }
  return result;
};
