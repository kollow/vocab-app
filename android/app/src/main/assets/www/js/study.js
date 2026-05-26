/**
 * 背诵逻辑模块
 * 支持三种模式：卡片翻面、选择题、拼写
 */
var StudyManager = (function() {
  var currentWords = [];
  var currentIndex = 0;
  var currentMode = 'card'; // card / choice / spell
  var retryQueue = [];
  var correctCount = 0;
  var wrongCount = 0;
  var isReviewMode = false;
  var onCompleteCallback = null;

  /**
   * 开始背诵
   * @param {Object[]} words - 单词列表
   * @param {string} mode - 背诵模式
   * @param {boolean} reviewMode - 是否为复习模式
   * @param {Function} onComplete - 完成回调
   */
  function start(words, mode, reviewMode, onComplete) {
    currentWords = words.slice(); // 复制一份
    // 随机打乱
    shuffleArray(currentWords);
    currentIndex = 0;
    currentMode = mode || 'card';
    retryQueue = [];
    correctCount = 0;
    wrongCount = 0;
    isReviewMode = reviewMode || false;
    onCompleteCallback = onComplete || null;
  }

  /**
   * 获取当前单词
   * @returns {Object|null}
   */
  function getCurrentWord() {
    if (currentIndex < currentWords.length) {
      return currentWords[currentIndex];
    }
    return null;
  }

  /**
   * 标记为已掌握
   */
  function markKnown() {
    correctCount++;
    var word = getCurrentWord();
    if (word) {
      updateWordProgress(word, true);
    }
    nextWord();
  }

  /**
   * 标记为需要再复习
   */
  function markRetry() {
    wrongCount++;
    var word = getCurrentWord();
    if (word) {
      retryQueue.push(word);
      updateWordProgress(word, false);
    }
    nextWord();
  }

  /**
   * 选择题 - 答题
   * @param {boolean} correct - 是否正确
   */
  function answerChoice(correct) {
    if (correct) {
      correctCount++;
      var word = getCurrentWord();
      if (word) {
        updateWordProgress(word, true);
      }
    } else {
      wrongCount++;
      var word2 = getCurrentWord();
      if (word2) {
        retryQueue.push(word2);
        updateWordProgress(word2, false);
      }
    }
  }

  /**
   * 拼写 - 检查答案
   * @param {string} input - 用户输入
   * @returns {{ correct: boolean, diff: Array<{index: number, expected: string, actual: string}> }}
   */
  function checkSpelling(input) {
    var word = getCurrentWord();
    if (!word) return { correct: false, diff: [] };

    var expected = word.word.toLowerCase().trim();
    var actual = input.toLowerCase().trim();

    if (expected === actual) {
      correctCount++;
      updateWordProgress(word, true);
      return { correct: true, diff: [] };
    }

    wrongCount++;
    retryQueue.push(word);
    updateWordProgress(word, false);

    // 计算差异
    var diff = [];
    var maxLen = Math.max(expected.length, actual.length);
    for (var i = 0; i < maxLen; i++) {
      if (expected[i] !== actual[i]) {
        diff.push({
          index: i,
          expected: expected[i] || '',
          actual: actual[i] || ''
        });
      }
    }

    return { correct: false, diff: diff };
  }

  /**
   * 获取拼写提示
   * @returns {string} 如 "a____"
   */
  function getSpellingHint() {
    var word = getCurrentWord();
    if (!word) return '';
    var w = word.word;
    var hint = w[0];
    for (var i = 1; i < w.length; i++) {
      hint += '_';
    }
    return hint;
  }

  /**
   * 前进到下一个单词
   */
  function nextWord() {
    currentIndex++;
    if (currentIndex >= currentWords.length) {
      // 当前轮次结束，检查是否有需要重试的
      if (retryQueue.length > 0) {
        currentWords = retryQueue.slice();
        retryQueue = [];
        currentIndex = 0;
        shuffleArray(currentWords);
      } else {
        // 全部完成
        currentIndex = currentWords.length; // 越界，表示完成
        if (onCompleteCallback) {
          onCompleteCallback({
            total: correctCount + wrongCount,
            correct: correctCount,
            wrong: wrongCount
          });
        }
      }
    }
  }

  /**
   * 是否完成所有单词
   * @returns {boolean}
   */
  function isComplete() {
    return currentIndex >= currentWords.length && retryQueue.length === 0;
  }

  /**
   * 获取进度信息
   * @returns {{ current: number, total: number, correct: number, wrong: number }}
   */
  function getProgress() {
    return {
      current: Math.min(currentIndex + 1, currentWords.length),
      total: currentWords.length,
      correct: correctCount,
      wrong: wrongCount
    };
  }

  /**
   * 获取当前模式
   * @returns {string}
   */
  function getMode() {
    return currentMode;
  }

  /**
   * 设置当前模式
   * @param {string} mode
   */
  function setMode(mode) {
    currentMode = mode;
  }

  /**
   * 是否为复习模式
   * @returns {boolean}
   */
  function isReview() {
    return isReviewMode;
  }

  /**
   * 更新单词的学习进度到 IndexedDB
   * @param {Object} wordData - 单词数据
   * @param {boolean} correct - 是否答对
   */
  function updateWordProgress(wordData, correct) {
    var grade = wordData.grade;
    var semester = wordData.semester || '上册';
    var unit = wordData.unit;
    var progressId = grade + '-' + semester + '-' + unit + '-' + wordData.word;

    VocabStorage.getProgress(progressId).then(function(progress) {
      if (progress) {
        // 已有进度，更新
        progress = ReviewScheduler.updateReview(progress, correct);
        VocabStorage.saveProgress(progress);
      } else {
        // 新进度
        progress = ReviewScheduler.createProgress(wordData, grade, unit);
        progress = ReviewScheduler.updateReview(progress, correct);
        VocabStorage.saveProgress(progress);
      }
    });
  }

  /**
   * 随机打乱数组
   * @param {Array} arr
   */
  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  /**
   * 重置当前学习会话
   */
  function reset() {
    currentWords = [];
    currentIndex = 0;
    retryQueue = [];
    correctCount = 0;
    wrongCount = 0;
    isReviewMode = false;
    onCompleteCallback = null;
  }

  return {
    start: start,
    getCurrentWord: getCurrentWord,
    markKnown: markKnown,
    markRetry: markRetry,
    answerChoice: answerChoice,
    checkSpelling: checkSpelling,
    getSpellingHint: getSpellingHint,
    nextWord: nextWord,
    isComplete: isComplete,
    getProgress: getProgress,
    getMode: getMode,
    setMode: setMode,
    isReview: isReview,
    reset: reset,
    getAllWords: function() { return currentWords; }
  };
})();
