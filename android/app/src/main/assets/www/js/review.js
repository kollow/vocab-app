/**
 * 艾宾浩斯复习算法
 * 间隔序列：1天、2天、4天、7天、15天、30天
 */
var ReviewScheduler = (function() {
  // 间隔天数
  var INTERVALS = [1, 2, 4, 7, 15, 30];
  // 一天的毫秒数
  var DAY_MS = 24 * 60 * 60 * 1000;

  /**
   * 为新学习的单词创建进度记录
   * @param {Object} wordData - 单词数据（来自词库）
   * @param {number} grade - 年级
   * @param {number} unit - 单元号
   * @returns {Object} 进度记录
   */
  function createProgress(wordData, grade, unit) {
    var now = Date.now();
    var semester = wordData.semester || '上册';
    return {
      id: grade + '-' + semester + '-' + unit + '-' + wordData.word,
      word: wordData.word,
      grade: grade,
      semester: semester,
      unit: unit,
      meaning: wordData.meaning || '',
      status: 'new',
      firstStudyTime: now,
      lastReviewTime: null,
      nextReviewTime: now + INTERVALS[0] * DAY_MS,
      reviewRound: 0,
      correctCount: 0,
      wrongCount: 0
    };
  }

  /**
   * 计算下次复习时间
   * @param {Object} progress - 学习进度
   * @param {boolean} correct - 本次是否答对
   * @returns {Object} 更新后的进度
   */
  function updateReview(progress, correct) {
    var now = Date.now();
    progress.lastReviewTime = now;

    if (correct) {
      progress.correctCount++;
      progress.reviewRound++;

      if (progress.reviewRound >= INTERVALS.length) {
        // 完成全部轮次，标记为已掌握
        progress.status = 'mastered';
        progress.nextReviewTime = null;
      } else {
        progress.status = 'learning';
        progress.nextReviewTime = now + INTERVALS[progress.reviewRound] * DAY_MS;
      }
    } else {
      progress.wrongCount++;
      // 答错重置到第一轮
      progress.reviewRound = 0;
      progress.status = 'learning';
      progress.nextReviewTime = now + INTERVALS[0] * DAY_MS;
    }

    return progress;
  }

  /**
   * 获取当前复习轮次的间隔天数
   * @param {number} round - 轮次
   * @returns {number} 天数
   */
  function getIntervalDays(round) {
    if (round >= INTERVALS.length) return INTERVALS[INTERVALS.length - 1];
    return INTERVALS[round];
  }

  /**
   * 获取复习轮次描述
   * @param {Object} progress
   * @returns {string}
   */
  function getRoundDescription(progress) {
    if (progress.status === 'mastered') {
      return '已掌握';
    }
    if (progress.status === 'new') {
      return '新单词';
    }
    return '第 ' + (progress.reviewRound + 1) + '/' + INTERVALS.length + ' 轮';
  }

  /**
   * 获取今日待复习的单词列表
   * @returns {Promise<Object[]>}
   */
  function getTodayReviews() {
    return VocabStorage.getDueReviews();
  }

  /**
   * 获取今日待复习数量
   * @returns {Promise<number>}
   */
  function getTodayReviewCount() {
    return VocabStorage.getDueReviews().then(function(reviews) {
      return reviews.length;
    });
  }

  return {
    INTERVALS: INTERVALS,
    createProgress: createProgress,
    updateReview: updateReview,
    getIntervalDays: getIntervalDays,
    getRoundDescription: getRoundDescription,
    getTodayReviews: getTodayReviews,
    getTodayReviewCount: getTodayReviewCount
  };
})();
