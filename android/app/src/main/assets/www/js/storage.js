/**
 * IndexedDB 封装模块
 * 数据库名：VocabAppDB
 * objectStore: words_progress, custom_words
 */
var VocabStorage = (function() {
  var DB_NAME = 'VocabAppDB';
  var DB_VERSION = 3;
  var db = null;

  /**
   * 初始化数据库
   * @returns {Promise<IDBDatabase>}
   */
  function init() {
    return new Promise(function(resolve, reject) {
      if (db) {
        resolve(db);
        return;
      }
      var request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function(event) {
        var database = event.target.result;

        // 学习进度 store
        if (!database.objectStoreNames.contains('words_progress')) {
          var progressStore = database.createObjectStore('words_progress', { keyPath: 'id' });
          progressStore.createIndex('status', 'status', { unique: false });
          progressStore.createIndex('nextReview', 'nextReviewTime', { unique: false });
        }

        // 自定义词库 store
        if (!database.objectStoreNames.contains('custom_words')) {
          var customStore = database.createObjectStore('custom_words', { keyPath: 'id', autoIncrement: true });
          customStore.createIndex('word', 'word', { unique: false });
        }

        // 导入词库组 store（v3新增）
        if (!database.objectStoreNames.contains('vocab_groups')) {
          var groupStore = database.createObjectStore('vocab_groups', { keyPath: 'id', autoIncrement: true });
          groupStore.createIndex('grade', 'grade', { unique: false });
          groupStore.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };

      request.onsuccess = function(event) {
        db = event.target.result;
        resolve(db);
      };

      request.onerror = function(event) {
        reject('IndexedDB error: ' + event.target.errorCode);
      };
    });
  }

  /**
   * 获取事务的 objectStore
   * @param {string} storeName
   * @param {string} mode - 'readonly' or 'readwrite'
   * @returns {IDBObjectStore}
   */
  function getStore(storeName, mode) {
    var tx = db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  // ========== words_progress 操作 ==========

  /**
   * 获取单词学习进度
   * @param {string} id - 如 "3-1-apple"
   * @returns {Promise<Object|null>}
   */
  function getProgress(id) {
    return new Promise(function(resolve, reject) {
      var store = getStore('words_progress', 'readonly');
      var request = store.get(id);
      request.onsuccess = function() { resolve(request.result || null); };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 保存/更新学习进度
   * @param {Object} progress - 进度对象
   * @returns {Promise<void>}
   */
  function saveProgress(progress) {
    return new Promise(function(resolve, reject) {
      var store = getStore('words_progress', 'readwrite');
      var request = store.put(progress);
      request.onsuccess = function() { resolve(); };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 获取所有待复习的单词（nextReviewTime <= now）
   * @returns {Promise<Object[]>}
   */
  function getDueReviews() {
    return new Promise(function(resolve, reject) {
      var store = getStore('words_progress', 'readonly');
      var now = Date.now();
      var results = [];
      var request = store.openCursor();

      request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          var record = cursor.value;
          if (record.nextReviewTime && record.nextReviewTime <= now && record.status !== 'mastered') {
            results.push(record);
          }
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 获取所有学习进度
   * @returns {Promise<Object[]>}
   */
  function getAllProgress() {
    return new Promise(function(resolve, reject) {
      var store = getStore('words_progress', 'readonly');
      var results = [];
      var request = store.openCursor();

      request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 获取指定状态的学习进度
   * @param {string} status - new/learning/mastered
   * @returns {Promise<Object[]>}
   */
  function getProgressByStatus(status) {
    return new Promise(function(resolve, reject) {
      var store = getStore('words_progress', 'readonly');
      var index = store.index('status');
      var results = [];
      var request = index.openCursor(IDBKeyRange.only(status));

      request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 删除学习进度
   * @param {string} id
   * @returns {Promise<void>}
   */
  function deleteProgress(id) {
    return new Promise(function(resolve, reject) {
      var store = getStore('words_progress', 'readwrite');
      var request = store.delete(id);
      request.onsuccess = function() { resolve(); };
      request.onerror = function() { reject(request.error); };
    });
  }

  // ========== custom_words 操作 ==========

  /**
   * 获取所有自定义单词
   * @returns {Promise<Object[]>}
   */
  function getAllCustomWords() {
    return new Promise(function(resolve, reject) {
      var store = getStore('custom_words', 'readonly');
      var results = [];
      var request = store.openCursor();

      request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 添加自定义单词
   * @param {Object} wordObj - { word, phonetic, partOfSpeech, meaning, example, createdAt }
   * @returns {Promise<number>} 新记录的id
   */
  function addCustomWord(wordObj) {
    return new Promise(function(resolve, reject) {
      wordObj.createdAt = Date.now();
      var store = getStore('custom_words', 'readwrite');
      var request = store.add(wordObj);
      request.onsuccess = function() { resolve(request.result); };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 更新自定义单词
   * @param {Object} wordObj - 包含id字段
   * @returns {Promise<void>}
   */
  function updateCustomWord(wordObj) {
    return new Promise(function(resolve, reject) {
      var store = getStore('custom_words', 'readwrite');
      var request = store.put(wordObj);
      request.onsuccess = function() { resolve(); };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 删除自定义单词
   * @param {number} id
   * @returns {Promise<void>}
   */
  function deleteCustomWord(id) {
    return new Promise(function(resolve, reject) {
      var store = getStore('custom_words', 'readwrite');
      var request = store.delete(id);
      request.onsuccess = function() { resolve(); };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 获取统计数据
   * @returns {Promise<Object>}
   */
  function getStats() {    return new Promise(function(resolve, reject) {
      var store = getStore('words_progress', 'readonly');
      var stats = { total: 0, new: 0, learning: 0, mastered: 0, dueToday: 0 };
      var now = Date.now();
      var request = store.openCursor();

      request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          var record = cursor.value;
          stats.total++;
          if (record.status === 'new') stats.new++;
          else if (record.status === 'learning') stats.learning++;
          else if (record.status === 'mastered') stats.mastered++;
          if (record.nextReviewTime && record.nextReviewTime <= now && record.status !== 'mastered') {
            stats.dueToday++;
          }
          cursor.continue();
        } else {
          resolve(stats);
        }
      };

      request.onerror = function() { reject(request.error); };
    });
  }

  // ========== vocab_groups 操作 ==========

  /**
   * 添加词库组
   * @param {Object} group - { title, grade, semester, unit, words, createdAt }
   * @returns {Promise<number>} 新记录的id
   */
  function addVocabGroup(group) {
    return new Promise(function(resolve, reject) {
      group.createdAt = group.createdAt || Date.now();
      var store = getStore('vocab_groups', 'readwrite');
      var request = store.add(group);
      request.onsuccess = function() { resolve(request.result); };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 获取所有词库组
   * @returns {Promise<Object[]>}
   */
  function getAllVocabGroups() {
    return new Promise(function(resolve, reject) {
      var store = getStore('vocab_groups', 'readonly');
      var results = [];
      var request = store.openCursor();
      request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 获取单个词库组
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  function getVocabGroup(id) {
    return new Promise(function(resolve, reject) {
      var store = getStore('vocab_groups', 'readonly');
      var request = store.get(id);
      request.onsuccess = function() { resolve(request.result || null); };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 更新词库组
   * @param {Object} group - 含 id 字段
   * @returns {Promise<void>}
   */
  function updateVocabGroup(group) {
    return new Promise(function(resolve, reject) {
      var store = getStore('vocab_groups', 'readwrite');
      var request = store.put(group);
      request.onsuccess = function() { resolve(); };
      request.onerror = function() { reject(request.error); };
    });
  }

  /**
   * 删除词库组
   * @param {number} id
   * @returns {Promise<void>}
   */
  function deleteVocabGroup(id) {
    return new Promise(function(resolve, reject) {
      var store = getStore('vocab_groups', 'readwrite');
      var request = store.delete(id);
      request.onsuccess = function() { resolve(); };
      request.onerror = function() { reject(request.error); };
    });
  }

  // ========== 数据导出/导入 ==========

  /**
   * 导出词库数据（vocab_groups + custom_words）
   * @returns {Promise<Object>}
   */
  function exportVocabData() {
    return Promise.all([
      getAllVocabGroups(),
      getAllCustomWords()
    ]).then(function(results) {
      return {
        type: 'vocab',
        version: DB_VERSION,
        exportedAt: new Date().toISOString(),
        data: {
          vocab_groups: results[0],
          custom_words: results[1]
        }
      };
    });
  }

  /**
   * 导出学习记录（words_progress）
   * @returns {Promise<Object>}
   */
  function exportProgressData() {
    return getAllProgress().then(function(progress) {
      return {
        type: 'progress',
        version: DB_VERSION,
        exportedAt: new Date().toISOString(),
        data: {
          words_progress: progress
        }
      };
    });
  }

  /**
   * 完整导出备份（所有数据）
   * @returns {Promise<Object>}
   */
  function exportFullBackup() {
    return Promise.all([
      getAllVocabGroups(),
      getAllCustomWords(),
      getAllProgress()
    ]).then(function(results) {
      return {
        type: 'full',
        version: DB_VERSION,
        exportedAt: new Date().toISOString(),
        appVersion: '2.0.0',
        data: {
          vocab_groups: results[0],
          custom_words: results[1],
          words_progress: results[2]
        }
      };
    });
  }

  /**
   * 导入备份数据
   * @param {Object} backupObj - 导出的JSON对象
   * @param {Object} options - { merge: true=合并, false=覆盖 }
   * @returns {Promise<Object>} 导入结果统计
   */
  function importBackup(backupObj, options) {
    options = options || { merge: true };
    var stats = { vocab_groups: 0, custom_words: 0, words_progress: 0 };

    if (!backupObj || !backupObj.data) {
      return Promise.reject('无效的备份文件');
    }

    var data = backupObj.data;
    var tasks = [];

    // 导入词库组
    if (data.vocab_groups && data.vocab_groups.length > 0) {
      if (!options.merge) {
        // 覆盖模式：先清空
        tasks.push(clearStore('vocab_groups'));
      }
      for (var i = 0; i < data.vocab_groups.length; i++) {
        tasks.push((function(item) {
          return function() {
            // 去掉自增id，让IndexedDB重新分配，避免冲突
            var newItem = Object.assign({}, item);
            delete newItem.id;
            return addVocabGroup(newItem).then(function() { stats.vocab_groups++; });
          };
        })(data.vocab_groups[i]));
      }
    }

    // 导入自定义单词
    if (data.custom_words && data.custom_words.length > 0) {
      if (!options.merge) {
        tasks.push(clearStore('custom_words'));
      }
      for (var j = 0; j < data.custom_words.length; j++) {
        tasks.push((function(item) {
          return function() {
            var newItem = Object.assign({}, item);
            delete newItem.id;
            return addCustomWord(newItem).then(function() { stats.custom_words++; });
          };
        })(data.custom_words[j]));
      }
    }

    // 导入学习进度
    if (data.words_progress && data.words_progress.length > 0) {
      if (!options.merge) {
        tasks.push(clearStore('words_progress'));
      }
      for (var k = 0; k < data.words_progress.length; k++) {
        tasks.push((function(item) {
          return function() {
            return saveProgress(item).then(function() { stats.words_progress++; });
          };
        })(data.words_progress[k]));
      }
    }

    // 顺序执行所有任务
    return tasks.reduce(function(promise, task) {
      return promise.then(task);
    }, Promise.resolve()).then(function() {
      return stats;
    });
  }

  /**
   * 清空指定 objectStore
   * @param {string} storeName
   * @returns {Promise<void>}
   */
  function clearStore(storeName) {
    return new Promise(function(resolve, reject) {
      var store = getStore(storeName, 'readwrite');
      var request = store.clear();
      request.onsuccess = function() { resolve(); };
      request.onerror = function() { reject(request.error); };
    });
  }

  return {
    init: init,
    getProgress: getProgress,
    saveProgress: saveProgress,
    getDueReviews: getDueReviews,
    getAllProgress: getAllProgress,
    getProgressByStatus: getProgressByStatus,
    deleteProgress: deleteProgress,
    getAllCustomWords: getAllCustomWords,
    addCustomWord: addCustomWord,
    updateCustomWord: updateCustomWord,
    deleteCustomWord: deleteCustomWord,
    getStats: getStats,
    addVocabGroup: addVocabGroup,
    getAllVocabGroups: getAllVocabGroups,
    getVocabGroup: getVocabGroup,
    updateVocabGroup: updateVocabGroup,
    deleteVocabGroup: deleteVocabGroup,
    exportVocabData: exportVocabData,
    exportProgressData: exportProgressData,
    exportFullBackup: exportFullBackup,
    importBackup: importBackup
  };
})();
