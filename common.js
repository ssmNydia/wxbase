/** 
 * 检测小程序是否有新版本
 */
exports.appUpdate = () => {
  // 小程序冷启动
  if (wx.getUpdateManager) {
    // 检测更新机制
    const updateMg = wx.getUpdateManager();
    // 当向微信后台请求完新版本信息
    updateMg.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调

    });
    // 检查到小程序有新版本，下载完成时触发
    updateMg.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateMg.applyUpdate()
          }
        }
      });
    });
  } else {
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，请更新后再来~'
    })
  }
}

/**
 * 小程序二维码参数格式化
 */
exports.sceneParam = (scene) => {
  let param = decodeURIComponent(scene)
  let result = {}
  param.split(',').forEach(o => {
    let [key, val] = o.split(':')
    result[key] = val
  })
  return result
}

/**
 * 是否分享页
 */
exports.isShare = (scene) => {
  if (scene == '1007' || scene == '1008' || scene == '1031' || scene == '1032') {
    // 是从分享方式进入
    return true;
  } else {
    return false;
  }
}