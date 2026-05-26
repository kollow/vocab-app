/**
 * Web Speech API 发音封装
 */
var TTS = (function() {
  var synthesis = window.speechSynthesis;
  var available = false;

  /**
   * 检查 TTS 是否可用
   * @returns {boolean}
   */
  function isAvailable() {
    return synthesis && typeof synthesis.speak === 'function';
  }

  /**
   * 朗读英文单词
   * @param {string} text - 要朗读的文本
   * @param {number} [rate=0.8] - 语速（0.1-10，默认0.8适合学习）
   */
  function speak(text, rate) {
    if (!isAvailable()) return;
    rate = rate || 0.8;

    // 取消之前的朗读
    synthesis.cancel();

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // 尝试选择英文语音
    var voices = synthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].lang && voices[i].lang.indexOf('en') === 0) {
        utterance.voice = voices[i];
        break;
      }
    }

    synthesis.speak(utterance);
  }

  /**
   * 停止朗读
   */
  function stop() {
    if (isAvailable()) {
      synthesis.cancel();
    }
  }

  /**
   * 初始化 TTS（加载语音列表）
   * @param {Function} callback - 语音列表就绪后的回调
   */
  function init(callback) {
    if (!isAvailable()) {
      available = false;
      if (callback) callback(false);
      return;
    }
    available = true;

    // 某些浏览器异步加载语音列表
    if (synthesis.getVoices().length > 0) {
      if (callback) callback(true);
    } else if (synthesis.onvoiceschanged !== undefined) {
      synthesis.onvoiceschanged = function() {
        if (callback) callback(true);
      };
    } else {
      // 回退：延迟回调
      setTimeout(function() {
        if (callback) callback(isAvailable());
      }, 500);
    }
  }

  return {
    init: init,
    speak: speak,
    stop: stop,
    isAvailable: isAvailable
  };
})();
