/**
 * 词库导入模块
 * 支持：图片OCR识别、PDF提取、CSV/Excel模板导入
 * 支持：联网查询音标/词性/例句自动补全
 * 支持：导入前设置年级/上下册/单元信息
 */
var VocabImporter = (function() {

  // ========== 工具函数 ==========

  /**
   * 解析纯文本为单词列表（每行一个单词，可含中文释义）
   * 支持格式：
   *   apple 苹果
   *   apple,苹果
   *   apple - 苹果
   *   apple\t苹果
   *   apple（苹果）
   *   apple 苹 果  （OCR中文带空格断字）
   *   apple苹 果    （OCR无空格分隔）
   */
  function parseTextToWords(text) {
    var lines = text.split(/\r?\n/);
    var words = [];
    var seen = {};

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;

      // 去掉序号前缀，如 "1. " "1、" "(1)" "1)"
      line = line.replace(/^[\d]+[\.、\)）]\s*/, '').trim();
      if (!line) continue;

      // 预处理：修复 OCR 常见问题
      line = cleanOcrLine(line);
      if (!line) continue;

      var word = '';
      var meaning = '';

      // 尝试各种分隔符（按优先级）
      var parsed = tryParseLine(line);
      word = parsed.word;
      meaning = parsed.meaning;

      // 清理 word
      word = word.replace(/\s+/g, ' ').toLowerCase().trim();
      // 只保留英文字母、空格、连字符、撇号、点号
      word = word.replace(/[^a-zA-Z\s'\-\.]/g, '').trim();
      // 过滤太长或不像单词的内容（超过5个英文词的短语略过）
      if (!word || word.split(' ').length > 5) continue;
      // 过滤单个字母（OCR噪声）
      if (word.length === 1) continue;
      // 去重
      if (seen[word]) continue;
      seen[word] = true;

      // 清理 meaning（去掉 OCR 产生的多余空格、奇怪字符）
      meaning = cleanMeaning(meaning);

      words.push({ word: word, meaning: meaning });
    }

    return words;
  }

  /**
   * 清理 OCR 行文本
   * @param {string} line
   * @returns {string}
   */
  function cleanOcrLine(line) {
    // 去掉全角空格
    line = line.replace(/\u3000/g, ' ');
    // 去掉零宽字符
    line = line.replace(/[\u200b\u200c\u200d\ufeff]/g, '');
    // 去掉制表符，替换为空格
    line = line.replace(/\t/g, ' ');
    // 多个空格合并
    line = line.replace(/\s{2,}/g, ' ');
    return line.trim();
  }

  /**
   * 尝试用多种模式解析行
   * @param {string} line
   * @returns {{ word: string, meaning: string }}
   */
  function tryParseLine(line) {
    // 1. 中文括号包裹：apple（苹果）
    var bracketMatch = line.match(/^([a-zA-Z][a-zA-Z\s'\-\.]*?)\s*[（(]\s*(.+?)\s*[）)]/);
    if (bracketMatch) {
      return { word: bracketMatch[1].trim(), meaning: bracketMatch[2].trim() };
    }

    // 2. 分隔符：逗号、制表符、破折号、斜杠
    var sepMatch = line.match(/^([a-zA-Z][a-zA-Z\s'\-\.]*?)\s*[,，\t\-–—/\/]\s*(.+)$/);
    if (sepMatch) {
      return { word: sepMatch[1].trim(), meaning: sepMatch[2].trim() };
    }

    // 3. 英文 + 空格 + 中文（最常见的词汇表格式）
    var spaceMatch = line.match(/^([a-zA-Z][a-zA-Z\s'\-\.]*?)\s+([\u4e00-\u9fa5].*)$/);
    if (spaceMatch) {
      return { word: spaceMatch[1].trim(), meaning: spaceMatch[2].trim() };
    }

    // 4. OCR无空格：英文紧跟中文（apple苹果）
    var noSpaceMatch = line.match(/^([a-zA-Z][a-zA-Z'\-\.]*)([\u4e00-\u9fa5].*)$/);
    if (noSpaceMatch) {
      return { word: noSpaceMatch[1].trim(), meaning: noSpaceMatch[2].trim() };
    }

    // 5. 纯英文单词
    var pureEngMatch = line.match(/^([a-zA-Z][a-zA-Z\s'\-\.]*?)$/);
    if (pureEngMatch) {
      return { word: pureEngMatch[1].trim(), meaning: '' };
    }

    // 6. 英文开头但后面混合了乱码/特殊字符，尝试提取英文部分
    var engPrefix = line.match(/^([a-zA-Z][a-zA-Z'\-\.]{1,30})/);
    if (engPrefix) {
      // 提取后面的中文部分（跳过可能的噪声）
      var rest = line.substring(engPrefix[0].length);
      var chiPart = rest.match(/[\u4e00-\u9fa5]+/g);
      return {
        word: engPrefix[1].trim(),
        meaning: chiPart ? chiPart.join('') : ''
      };
    }

    return { word: '', meaning: '' };
  }

  /**
   * 清理中文含义（修复 OCR 常见错误）
   * @param {string} meaning
   * @returns {string}
   */
  function cleanMeaning(meaning) {
    if (!meaning) return '';
    // 去掉中文里的空格（OCR 常把"苹果"识别成"苹 果"）
    meaning = meaning.replace(/([\u4e00-\u9fa5])\s+([\u4e00-\u9fa5])/g, '$1$2');
    // 去掉首尾空格和标点
    meaning = meaning.trim();
    // 去掉开头和结尾的英文标点（OCR噪声）
    meaning = meaning.replace(/^[,.\-:;!\?\s]+/, '').replace(/[,.\-:;!\?\s]+$/, '');
    // 常见 OCR 中文误识别修正
    var ocrFixes = {
      '苯': '苹', '呆': '果', '粟': '粟', '捻': '念',
      '侣': '伴', '侍': '待', '住': '往', '己': '已',
      '大': '大', '木': '木', '十': '十', '口': '口'
    };
    return meaning;
  }

  // ========== 文件编码检测 ==========

  /**
   * 读取文件并自动检测编码（解决 Excel CSV 的 GBK 编码问题）
   * 策略：
   *   1. 先用 UTF-8 读取
   *   2. 检测是否包含乱码特征（Unicode 替换字符 �）
   *   3. 如果有乱码，用 GBK 重新读取
   *   4. 如果 GBK 也读不出有效中文，回退 UTF-8
   * @param {File} file
   * @returns {Promise<string>}
   */
  function readFileWithEncodingDetection(file) {
    return new Promise(function(resolve, reject) {
      // 第一步：用 UTF-8 读取
      var readerUtf8 = new FileReader();
      readerUtf8.onload = function(e) {
        var text = e.target.result;

        // 去掉 BOM（如果有）
        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.substring(1);
        }

        // 检测是否有乱码
        if (hasGarbledText(text)) {
          // 疑似乱码，尝试 GBK 解码
          readFileAsGBK(file).then(function(gbkText) {
            // GBK 解码后仍有乱码？对比哪个结果包含更多中文
            if (hasGarbledText(gbkText)) {
              // 两个都有问题，选中文含量更多的那个
              var utf8ChiCount = countChinese(text);
              var gbkChiCount = countChinese(gbkText);
              resolve(gbkChiCount > utf8ChiCount ? gbkText : text);
            } else {
              // GBK 没乱码，用 GBK
              resolve(gbkText);
            }
          }).catch(function() {
            // GBK 读取失败，回退 UTF-8
            resolve(text);
          });
        } else {
          // UTF-8 没问题
          resolve(text);
        }
      };
      readerUtf8.onerror = function() { reject(new Error('文件读取失败')); };
      readerUtf8.readAsText(file, 'UTF-8');
    });
  }

  /**
   * 用 GBK 编码读取文件
   * @param {File} file
   * @returns {Promise<string>}
   */
  function readFileAsGBK(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var text = e.target.result;
        // 去掉 BOM
        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.substring(1);
        }
        resolve(text);
      };
      reader.onerror = function() { reject(new Error('GBK读取失败')); };
      reader.readAsText(file, 'GBK');
    });
  }

  /**
   * 检测文本是否包含乱码特征
   * GBK 文本被误读为 UTF-8 时会出现：
   *   - Unicode 替换字符 (\uFFFD = �)
   *   - 大量连续的非打印字符
   * @param {string} text
   * @returns {boolean}
   */
  function hasGarbledText(text) {
    if (!text) return false;
    // 检测 Unicode 替换字符（UTF-8 解码失败时产生的）
    if (text.indexOf('\uFFFD') !== -1) return true;
    // 检测大量不可见控制字符（非空格、非换行、非制表符）
    var controlCount = 0;
    for (var i = 0; i < Math.min(text.length, 500); i++) {
      var code = text.charCodeAt(i);
      // 控制字符范围（排除常见空白字符）
      if (code < 0x20 && code !== 0x09 && code !== 0x0A && code !== 0x0D) {
        controlCount++;
      }
    }
    // 如果控制字符超过5%，很可能是乱码
    return controlCount > 25;
  }

  /**
   * 统计文本中的中文字符数量
   * @param {string} text
   * @returns {number}
   */
  function countChinese(text) {
    if (!text) return 0;
    var count = 0;
    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i);
      if (code >= 0x4E00 && code <= 0x9FA5) count++;
    }
    return count;
  }

  /**
   * 解析 CSV 模板内容为单词列表
   * 格式：第一行为表头(word,meaning)，后续行为数据
   */
  function parseCSV(text) {
    var lines = text.split(/\r?\n/);
    var words = [];
    var seen = {};
    var startRow = 0;

    // 检测是否有表头
    if (lines[0] && /word|单词|english/i.test(lines[0])) {
      startRow = 1;
    }

    for (var i = startRow; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;

      // 处理带引号的CSV字段
      var cols = parseCSVLine(line);
      if (cols.length < 1) continue;

      var word = (cols[0] || '').trim().toLowerCase();
      var meaning = cols.length >= 2 ? (cols[1] || '').trim() : '';

      if (!word || !/^[a-zA-Z]/.test(word)) continue;
      if (seen[word]) continue;
      seen[word] = true;

      words.push({ word: word, meaning: meaning });
    }

    return words;
  }

  /**
   * 解析单行CSV（处理引号字段）
   */
  function parseCSVLine(line) {
    var cols = [];
    var cur = '';
    var inQuote = false;

    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuote = !inQuote;
        }
      } else if ((ch === ',' || ch === '\t') && !inQuote) {
        cols.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    cols.push(cur);
    return cols;
  }

  // ========== OCR 识别图片 ==========

  /**
   * 使用 Tesseract.js 识别图片中的单词
   * 策略：两步识别
   *   1. 先用 eng 模型识别英文（准确率高）
   *   2. 再用 chi_sim 模型识别中文（解决中英混排问题）
   *   3. 合并两次结果，英文优先
   * @param {File} file - 图片文件
   * @param {Function} onProgress - 进度回调(0~1)
   * @returns {Promise<string>} 识别出的原始文本
   */
  function recognizeImage(file, onProgress) {
    return new Promise(function(resolve, reject) {
      if (typeof Tesseract === 'undefined') {
        reject(new Error('OCR引擎未加载，请确保网络连接正常'));
        return;
      }

      var url = URL.createObjectURL(file);
      var engText = '';
      var chiText = '';

      // 第一步：英文识别（PSM=6 适合词汇表这种单列文本）
      Tesseract.recognize(url, 'eng', {
        tessedit_pageseg_mode: '6',
        logger: function(m) {
          if (m.status === 'recognizing text' && onProgress) {
            onProgress(m.progress * 0.5); // 前50%进度
          }
        }
      }).then(function(engResult) {
        engText = engResult.data.text || '';

        // 第二步：中文识别
        return Tesseract.recognize(url, 'chi_sim', {
          tessedit_pageseg_mode: '6',
          logger: function(m) {
            if (m.status === 'recognizing text' && onProgress) {
              onProgress(0.5 + m.progress * 0.5); // 后50%进度
            }
          }
        });
      }).then(function(chiResult) {
        chiText = chiResult.data.text || '';
        URL.revokeObjectURL(url);

        // 合并结果：逐行合并英文和中文
        var merged = mergeOcrResults(engText, chiText);
        resolve(merged);
      }).catch(function(err) {
        URL.revokeObjectURL(url);
        reject(err);
      });
    });
  }

  /**
   * 合并英文和中文 OCR 结果
   * 策略：逐行对比，英文结果中的英文部分 + 中文结果中的中文部分
   * @param {string} engText - 英文OCR结果
   * @param {string} chiText - 中文OCR结果
   * @returns {string} 合并后的文本
   */
  function mergeOcrResults(engText, chiText) {
    var engLines = engText.split(/\r?\n/);
    var chiLines = chiText.split(/\r?\n/);
    var maxLines = Math.max(engLines.length, chiLines.length);
    var result = [];

    for (var i = 0; i < maxLines; i++) {
      var engLine = (engLines[i] || '').trim();
      var chiLine = (chiLines[i] || '').trim();

      if (!engLine && !chiLine) continue;

      // 从英文结果提取英文部分
      var engPart = extractEnglishPart(engLine);
      // 从中文结果提取中文部分
      var chiPart = extractChinesePart(chiLine);

      // 如果中文结果里也有英文，但英文行的英文更准确，用英文行的
      if (engPart && !chiPart) {
        // 只有英文没有中文
        result.push(engPart);
      } else if (chiPart && !engPart) {
        // 只有中文没有英文 — 尝试从中文行提取可能的英文
        var engFromChi = extractEnglishPart(chiLine);
        if (engFromChi) {
          result.push(engFromChi + ' ' + chiPart);
        } else {
          result.push(chiPart);
        }
      } else if (engPart && chiPart) {
        result.push(engPart + ' ' + chiPart);
      } else {
        // 都提取不到有效内容，用原始行
        result.push(engLine || chiLine);
      }
    }

    return result.join('\n');
  }

  /**
   * 从文本行中提取英文部分
   * @param {string} line
   * @returns {string}
   */
  function extractEnglishPart(line) {
    if (!line) return '';
    // 提取开头的连续英文单词（允许连字符、撇号、点号）
    var match = line.match(/^([a-zA-Z][a-zA-Z\s'\-\.]*?)(?:\s+[\u4e00-\u9fa5]|\s*$)/);
    if (match) return match[1].trim();
    // 整行纯英文
    match = line.match(/^([a-zA-Z][a-zA-Z\s'\-\.]*)$/);
    if (match) return match[1].trim();
    return '';
  }

  /**
   * 从文本行中提取中文部分
   * @param {string} line
   * @returns {string}
   */
  function extractChinesePart(line) {
    if (!line) return '';
    // 提取中文字符（含标点）
    var matches = line.match(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]+/g);
    if (matches) return matches.join('');
    return '';
  }

  // ========== PDF 提取 ==========

  /**
   * 使用 PDF.js 提取 PDF 文本
   * @param {File} file - PDF文件
   * @param {Function} onProgress - 进度回调
   * @returns {Promise<string>} 提取出的原始文本
   */
  function extractPDF(file, onProgress) {
    return new Promise(function(resolve, reject) {
      if (typeof pdfjsLib === 'undefined') {
        reject(new Error('PDF解析库未加载，请确保网络连接正常'));
        return;
      }

      var reader = new FileReader();
      reader.onload = function(e) {
        var arrayBuffer = e.target.result;
        var loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

        loadingTask.promise.then(function(pdf) {
          var numPages = pdf.numPages;
          var textParts = [];
          var processed = 0;

          function extractPage(pageNum) {
            if (pageNum > numPages) {
              resolve(textParts.join('\n'));
              return;
            }

            pdf.getPage(pageNum).then(function(page) {
              page.getTextContent().then(function(textContent) {
                var pageText = textContent.items
                  .map(function(item) { return item.str; })
                  .join(' ');
                textParts.push(pageText);
                processed++;
                if (onProgress) onProgress(processed / numPages);
                extractPage(pageNum + 1);
              });
            }).catch(function() {
              extractPage(pageNum + 1);
            });
          }

          extractPage(1);
        }).catch(reject);
      };

      reader.onerror = function() { reject(new Error('文件读取失败')); };
      reader.readAsArrayBuffer(file);
    });
  }

  // ========== 联网查询音标/词性/例句 ==========

  /**
   * 使用 Free Dictionary API 查询单词详情
   * API: https://api.dictionaryapi.dev/api/v2/entries/en/{word}
   * @param {string} word
   * @returns {Promise<Object>} { phonetic, partOfSpeech, example }
   */
  function lookupWord(word) {
    return new Promise(function(resolve) {
      var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word);

      fetch(url, { signal: AbortSignal.timeout(5000) })
        .then(function(res) {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then(function(data) {
          if (!data || !data[0]) {
            resolve({});
            return;
          }

          var entry = data[0];
          var phonetic = '';
          var partOfSpeech = '';
          var example = '';

          // 提取音标
          if (entry.phonetic) {
            phonetic = entry.phonetic;
          } else if (entry.phonetics && entry.phonetics.length > 0) {
            for (var p = 0; p < entry.phonetics.length; p++) {
              if (entry.phonetics[p].text) {
                phonetic = entry.phonetics[p].text;
                break;
              }
            }
          }

          // 提取词性和例句
          if (entry.meanings && entry.meanings.length > 0) {
            var m = entry.meanings[0];
            partOfSpeech = m.partOfSpeech || '';
            // 格式化词性为缩写
            var posMap = {
              'noun': 'n.', 'verb': 'v.', 'adjective': 'adj.',
              'adverb': 'adv.', 'preposition': 'prep.', 'conjunction': 'conj.',
              'interjection': 'int.', 'pronoun': 'pron.', 'article': 'art.',
              'numeral': 'num.'
            };
            partOfSpeech = posMap[partOfSpeech.toLowerCase()] || partOfSpeech;

            if (m.definitions && m.definitions.length > 0) {
              var def = m.definitions[0];
              if (def.example) {
                example = def.example;
                // 首字母大写
                example = example.charAt(0).toUpperCase() + example.slice(1);
                if (!example.endsWith('.') && !example.endsWith('!') && !example.endsWith('?')) {
                  example += '.';
                }
              }
            }
          }

          resolve({ phonetic: phonetic, partOfSpeech: partOfSpeech, example: example });
        })
        .catch(function() {
          resolve({});
        });
    });
  }

  /**
   * 批量查询单词详情（带限速，避免API请求过快）
   * @param {Array} words - [{ word, meaning }]
   * @param {Function} onProgress - 进度回调(current, total, wordObj)
   * @returns {Promise<Array>} 补全后的单词数组
   */
  function batchLookup(words, onProgress) {
    return new Promise(function(resolve) {
      var results = [];
      var total = words.length;
      var index = 0;

      function next() {
        if (index >= total) {
          resolve(results);
          return;
        }

        var item = words[index];
        var currentIndex = index;
        index++;

        lookupWord(item.word).then(function(detail) {
          var enriched = {
            word: item.word,
            meaning: item.meaning || '',
            phonetic: detail.phonetic || '',
            partOfSpeech: detail.partOfSpeech || '',
            example: detail.example || ''
          };
          results.push(enriched);

          if (onProgress) {
            onProgress(currentIndex + 1, total, enriched);
          }

          // 限速：每100ms查询一个，避免API限流
          setTimeout(next, 120);
        });
      }

      next();
    });
  }

  // ========== CSV 模板下载 ==========

  /**
   * 生成并下载 CSV 模板
   */
  function downloadTemplate() {
    var csvContent = '\ufeff'; // BOM for Excel UTF-8
    csvContent += 'word,meaning\n';
    csvContent += 'apple,苹果\n';
    csvContent += 'book,书本\n';
    csvContent += 'cat,猫\n';
    csvContent += 'dog,狗\n';
    csvContent += 'egg,鸡蛋\n';
    csvContent += '(填写单词),(填写中文含义)\n';

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = '单词导入模板.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ========== 导入向导 UI ==========

  /**
   * 显示导入向导弹窗
   * @param {Function} onImportComplete - 导入完成回调(vocabGroup)
   */
  function showImportWizard(onImportComplete) {
    var modal = createModal();
    var step = 1;
    var rawWords = []; // [{ word, meaning }]
    var enrichedWords = []; // 补全后的单词
    var groupInfo = { grade: 3, semester: '上册', unit: 1, title: '' };

    function renderStep1() {
      modal.body.innerHTML = '';
      step = 1;
      updateStepIndicator(1);

      // 装饰插图
      var hero = document.createElement('div');
      hero.className = 'wizard-hero';
      hero.innerHTML = '<div class="wizard-hero-icon">📥</div><div class="wizard-hero-desc">选择一种方式导入你的单词表</div>';
      modal.body.appendChild(hero);

      var title = document.createElement('h3');
      title.className = 'wizard-title';
      title.textContent = '选择导入方式';
      modal.body.appendChild(title);

      var methods = [
        { icon: '📷', label: '拍照识别', desc: '使用相机拍单词表', key: 'camera', accept: 'image/*', capture: 'environment' },
        { icon: '🖼️', label: '上传图片', desc: '从相册选择图片', key: 'image', accept: 'image/*', capture: '' },
        { icon: '📄', label: '上传 PDF', desc: '提取PDF中的文字', key: 'pdf', accept: '.pdf', capture: '' },
        { icon: '📋', label: '上传 CSV', desc: '使用模板批量导入', key: 'csv', accept: '.csv,.txt', capture: '' }
      ];

      var grid = document.createElement('div');
      grid.className = 'import-method-grid';

      for (var i = 0; i < methods.length; i++) {
        (function(method) {
          var card = document.createElement('div');
          card.className = 'import-method-card';

          var iconEl = document.createElement('div');
          iconEl.className = 'import-method-icon';
          iconEl.textContent = method.icon;

          var labelEl = document.createElement('div');
          labelEl.className = 'import-method-label';
          labelEl.textContent = method.label;

          var descEl = document.createElement('div');
          descEl.style.cssText = 'font-size:11px;color:#999;margin-top:3px;';
          descEl.textContent = method.desc;

          card.appendChild(iconEl);
          card.appendChild(labelEl);
          card.appendChild(descEl);

          card.addEventListener('click', function() {
            var fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = method.accept;
            if (method.capture) fileInput.setAttribute('capture', method.capture);
            fileInput.style.display = 'none';

            fileInput.addEventListener('change', function() {
              if (fileInput.files.length > 0) {
                processFile(fileInput.files[0], method.key);
              }
            });

            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
          });

          grid.appendChild(card);
        })(methods[i]);
      }

      modal.body.appendChild(grid);

      // 下载模板按钮
      var dlBtn = document.createElement('button');
      dlBtn.className = 'btn-download-tpl';
      dlBtn.textContent = '⬇️ 下载 CSV 导入模板';
      dlBtn.addEventListener('click', downloadTemplate);
      modal.body.appendChild(dlBtn);

      // 手动输入入口
      var manualBtn = document.createElement('button');
      manualBtn.className = 'btn-text-link';
      manualBtn.textContent = '✏️ 或者，手动输入单词列表';
      manualBtn.addEventListener('click', function() {
        showManualInput();
      });
      modal.body.appendChild(manualBtn);

      // 添加进入动画
      modal.body.classList.add('wizard-step-content-enter');
      setTimeout(function() { modal.body.classList.remove('wizard-step-content-enter'); }, 400);
    }

    /**
     * 处理文件（OCR / PDF / CSV）
     */
    function processFile(file, type) {
      var progressDiv = document.createElement('div');
      progressDiv.className = 'import-progress';
      var spinnerIcon = type === 'camera' || type === 'image' ? '🔍' : (type === 'pdf' ? '📄' : '📋');
      progressDiv.innerHTML = '<div class="import-spinner">' + spinnerIcon + '</div><div class="import-progress-text">正在处理文件...</div>';
      modal.body.innerHTML = '';
      modal.body.appendChild(progressDiv);

      var updateText = function(msg) {
        var textEl = progressDiv.querySelector('.import-progress-text');
        if (textEl) textEl.textContent = msg;
      };

      var promise;
      if (type === 'csv') {
        promise = readFileWithEncodingDetection(file).then(function(text) {
          return parseCSV(text);
        }).then(function(words) {
          rawWords = words;
          renderStep2();
        });
      } else if (type === 'pdf') {
        promise = extractPDF(file, function(progress) {
          updateText('正在提取 PDF 文字... ' + Math.round(progress * 100) + '%');
        }).then(function(text) {
          rawWords = parseTextToWords(text);
          renderStep2();
        });
      } else {
        // image / camera: OCR
        promise = recognizeImage(file, function(progress) {
          updateText('OCR识别中... ' + Math.round(progress * 100) + '%');
        }).then(function(text) {
          rawWords = parseTextToWords(text);
          renderStep2();
        });
      }

      promise.catch(function(err) {
        modal.body.innerHTML = '';
        var errDiv = document.createElement('div');
        errDiv.className = 'import-error';
        errDiv.innerHTML = '<div style="font-size:48px;margin-bottom:12px;">😕</div><p style="font-size:16px;font-weight:600;color:var(--text-dark);margin-bottom:4px;">处理失败</p><p style="color:var(--text-gray);">' + (err.message || '请重试或换一种方式') + '</p>';

        var retryBtn = document.createElement('button');
        retryBtn.className = 'btn-primary';
        retryBtn.style.marginTop = '16px';
        retryBtn.textContent = '← 重新选择';
        retryBtn.addEventListener('click', renderStep1);

        errDiv.appendChild(retryBtn);
        modal.body.appendChild(errDiv);
      });
    }

    /**
     * 手动输入单词
     */
    function showManualInput() {
      modal.body.innerHTML = '';

      var hero = document.createElement('div');
      hero.className = 'wizard-hero';
      hero.innerHTML = '<div class="wizard-hero-icon">✏️</div>';
      modal.body.appendChild(hero);

      var title = document.createElement('h3');
      title.className = 'wizard-title';
      title.textContent = '手动输入单词';
      modal.body.appendChild(title);

      var hint = document.createElement('p');
      hint.className = 'form-hint';
      hint.textContent = '每行一个，格式：英文单词 中文含义\n也可以只填英文，中文后续自动查询补全';
      modal.body.appendChild(hint);

      var textarea = document.createElement('textarea');
      textarea.className = 'manual-input-area';
      textarea.placeholder = '例如：\napple 苹果\nbook 书本\ncat\ndog 狗';
      textarea.rows = 12;
      modal.body.appendChild(textarea);

      var btnRow = document.createElement('div');
      btnRow.className = 'wizard-btn-row';

      var cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn-secondary';
      cancelBtn.textContent = '← 返回';
      cancelBtn.addEventListener('click', renderStep1);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'btn-primary';
      nextBtn.textContent = '下一步 →';
      nextBtn.addEventListener('click', function() {
        var text = textarea.value.trim();
        if (!text) {
          alert('请输入至少一个单词');
          return;
        }
        rawWords = parseTextToWords(text);
        renderStep2();
      });

      btnRow.appendChild(cancelBtn);
      btnRow.appendChild(nextBtn);
      modal.body.appendChild(btnRow);
    }

    /**
     * 第二步：预览识别结果并编辑
     */
    function renderStep2() {
      modal.body.innerHTML = '';
      step = 2;
      updateStepIndicator(2);

      var hero = document.createElement('div');
      hero.className = 'wizard-hero';
      hero.innerHTML = '<div class="wizard-hero-icon">👀</div>';
      modal.body.appendChild(hero);

      var title = document.createElement('h3');
      title.className = 'wizard-title';
      title.textContent = '确认单词列表';
      modal.body.appendChild(title);

      if (rawWords.length === 0) {
        var empty = document.createElement('div');
        empty.className = 'import-error';
        empty.innerHTML = '<div style="font-size:48px;margin-bottom:12px;">😕</div><p style="font-size:16px;font-weight:600;">未识别到单词</p><p>请重试或使用手动输入</p>';

        var backBtn = document.createElement('button');
        backBtn.className = 'btn-primary';
        backBtn.style.marginTop = '16px';
        backBtn.textContent = '← 重新选择';
        backBtn.addEventListener('click', renderStep1);
        empty.appendChild(backBtn);
        modal.body.appendChild(empty);
        return;
      }

      var hint = document.createElement('p');
      hint.className = 'form-hint';
      hint.textContent = '识别到 ' + rawWords.length + ' 个单词，可编辑或删除';
      modal.body.appendChild(hint);

      // 可编辑列表
      var listContainer = document.createElement('div');
      listContainer.className = 'preview-word-list';

      function renderPreviewList() {
        listContainer.innerHTML = '';
        for (var i = 0; i < rawWords.length; i++) {
          (function(idx) {
            var row = document.createElement('div');
            row.className = 'preview-word-row';

            var numEl = document.createElement('span');
            numEl.className = 'preview-num';
            numEl.textContent = idx + 1;

            var wordInput = document.createElement('input');
            wordInput.className = 'preview-word-input';
            wordInput.value = rawWords[idx].word;
            wordInput.placeholder = '英文单词';
            wordInput.addEventListener('change', function() {
              rawWords[idx].word = this.value.trim().toLowerCase();
            });

            var meaningInput = document.createElement('input');
            meaningInput.className = 'preview-meaning-input';
            meaningInput.value = rawWords[idx].meaning;
            meaningInput.placeholder = '中文含义（可留空）';
            meaningInput.addEventListener('change', function() {
              rawWords[idx].meaning = this.value.trim();
            });

            var delBtn = document.createElement('button');
            delBtn.className = 'btn-icon btn-icon-danger';
            delBtn.innerHTML = '×';
            delBtn.title = '删除此行';
            delBtn.addEventListener('click', function() {
              rawWords.splice(idx, 1);
              renderPreviewList();
            });

            row.appendChild(numEl);
            row.appendChild(wordInput);
            row.appendChild(meaningInput);
            row.appendChild(delBtn);
            listContainer.appendChild(row);
          })(i);
        }

        // 添加新行按钮
        var addRow = document.createElement('div');
        addRow.className = 'preview-word-row preview-add-row';
        var addBtn = document.createElement('button');
        addBtn.className = 'btn-text-link';
        addBtn.textContent = '+ 添加单词';
        addBtn.addEventListener('click', function() {
          rawWords.push({ word: '', meaning: '' });
          renderPreviewList();
          // 滚动到底部
          setTimeout(function() {
            listContainer.scrollTop = listContainer.scrollHeight;
          }, 50);
        });
        addRow.appendChild(addBtn);
        listContainer.appendChild(addRow);
      }

      renderPreviewList();
      modal.body.appendChild(listContainer);

      var btnRow = document.createElement('div');
      btnRow.className = 'wizard-btn-row';

      var backBtn = document.createElement('button');
      backBtn.className = 'btn-secondary';
      backBtn.textContent = '← 返回';
      backBtn.addEventListener('click', renderStep1);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'btn-primary';
      nextBtn.textContent = '下一步 →';
      nextBtn.addEventListener('click', function() {
        // 过滤空行
        rawWords = rawWords.filter(function(w) { return w.word && w.word.trim(); });
        if (rawWords.length === 0) {
          alert('请至少保留一个有效单词');
          return;
        }
        renderStep3();
      });

      btnRow.appendChild(backBtn);
      btnRow.appendChild(nextBtn);
      modal.body.appendChild(btnRow);

      // 进入动画
      modal.body.classList.add('wizard-step-content-enter');
      setTimeout(function() { modal.body.classList.remove('wizard-step-content-enter'); }, 400);
    }

    /**
     * 第三步：设置年级/上下册/单元信息
     */
    function renderStep3() {
      modal.body.innerHTML = '';
      step = 3;
      updateStepIndicator(3);

      var hero = document.createElement('div');
      hero.className = 'wizard-hero';
      hero.innerHTML = '<div class="wizard-hero-icon">⚙️</div>';
      modal.body.appendChild(hero);

      var title = document.createElement('h3');
      title.className = 'wizard-title';
      title.textContent = '设置词库信息';
      modal.body.appendChild(title);

      var hint = document.createElement('p');
      hint.className = 'form-hint';
      hint.textContent = '为这批单词归类，方便后续管理和复习';
      modal.body.appendChild(hint);

      var form = document.createElement('div');
      form.className = 'group-info-form';

      // 年级选择
      var gradeLabel = document.createElement('label');
      gradeLabel.className = 'form-label';
      gradeLabel.textContent = '📚 年级';
      form.appendChild(gradeLabel);

      var gradeRow = document.createElement('div');
      gradeRow.className = 'form-btn-row';
      for (var g = 3; g <= 6; g++) {
        (function(grade) {
          var btn = document.createElement('button');
          btn.className = 'form-select-btn' + (groupInfo.grade === grade ? ' active' : '');
          btn.textContent = grade + '年级';
          btn.addEventListener('click', function() {
            groupInfo.grade = grade;
            gradeRow.querySelectorAll('.form-select-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
          });
          gradeRow.appendChild(btn);
        })(g);
      }
      // 其他年级
      var otherBtn = document.createElement('button');
      otherBtn.className = 'form-select-btn' + (groupInfo.grade === 0 ? ' active' : '');
      otherBtn.textContent = '其他';
      otherBtn.addEventListener('click', function() {
        groupInfo.grade = 0;
        gradeRow.querySelectorAll('.form-select-btn').forEach(function(b) { b.classList.remove('active'); });
        otherBtn.classList.add('active');
      });
      gradeRow.appendChild(otherBtn);
      form.appendChild(gradeRow);

      // 学期选择
      var semLabel = document.createElement('label');
      semLabel.className = 'form-label';
      semLabel.textContent = '📅 学期';
      form.appendChild(semLabel);

      var semRow = document.createElement('div');
      semRow.className = 'form-btn-row';
      ['上册', '下册', '不限'].forEach(function(sem) {
        var btn = document.createElement('button');
        btn.className = 'form-select-btn' + (groupInfo.semester === sem ? ' active' : '');
        btn.textContent = sem;
        btn.addEventListener('click', function() {
          groupInfo.semester = sem;
          semRow.querySelectorAll('.form-select-btn').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
        semRow.appendChild(btn);
      });
      form.appendChild(semRow);

      // 单元
      var unitLabel = document.createElement('label');
      unitLabel.className = 'form-label';
      unitLabel.textContent = '📖 单元编号';
      form.appendChild(unitLabel);

      var unitInput = document.createElement('input');
      unitInput.type = 'number';
      unitInput.className = 'form-input';
      unitInput.min = '1';
      unitInput.max = '20';
      unitInput.value = groupInfo.unit;
      unitInput.placeholder = '如：1（若无单元可留空或填0）';
      unitInput.addEventListener('change', function() {
        groupInfo.unit = parseInt(this.value) || 0;
      });
      form.appendChild(unitInput);

      // 自定义名称
      var nameLabel = document.createElement('label');
      nameLabel.className = 'form-label';
      nameLabel.textContent = '✏️ 词库名称（可选）';
      form.appendChild(nameLabel);

      var nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'form-input';
      nameInput.placeholder = '如：三年级上册Unit1单词（留空将自动生成）';
      nameInput.value = groupInfo.title;
      nameInput.addEventListener('input', function() {
        groupInfo.title = this.value.trim();
      });
      form.appendChild(nameInput);

      modal.body.appendChild(form);

      var btnRow = document.createElement('div');
      btnRow.className = 'wizard-btn-row';

      var backBtn = document.createElement('button');
      backBtn.className = 'btn-secondary';
      backBtn.textContent = '← 返回';
      backBtn.addEventListener('click', renderStep2);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'btn-primary';
      nextBtn.textContent = '🌐 联网补全并保存';
      nextBtn.addEventListener('click', function() {
        groupInfo.unit = parseInt(unitInput.value) || 0;
        groupInfo.title = nameInput.value.trim();
        if (!groupInfo.title) {
          // 自动生成名称
          var gradeStr = groupInfo.grade > 0 ? groupInfo.grade + '年级' : '';
          var semStr = groupInfo.semester !== '不限' ? groupInfo.semester : '';
          var unitStr = groupInfo.unit > 0 ? 'Unit' + groupInfo.unit : '';
          groupInfo.title = [gradeStr, semStr, unitStr].filter(Boolean).join(' ') || '导入词库';
        }
        renderStep4();
      });

      btnRow.appendChild(backBtn);
      btnRow.appendChild(nextBtn);
      modal.body.appendChild(btnRow);

      // 进入动画
      modal.body.classList.add('wizard-step-content-enter');
      setTimeout(function() { modal.body.classList.remove('wizard-step-content-enter'); }, 400);
    }

    /**
     * 第四步：联网查询补全 + 完成
     */
    function renderStep4() {
      modal.body.innerHTML = '';
      step = 4;
      updateStepIndicator(4);

      var hero = document.createElement('div');
      hero.className = 'wizard-hero';
      hero.innerHTML = '<div class="wizard-hero-icon">🌐</div><div class="wizard-hero-desc">正在联网查询音标、词性和例句</div>';
      modal.body.appendChild(hero);

      var title = document.createElement('h3');
      title.className = 'wizard-title';
      title.textContent = '自动补全信息';
      modal.body.appendChild(title);

      var progressContainer = document.createElement('div');
      progressContainer.className = 'lookup-progress';

      var progressBar = document.createElement('div');
      progressBar.className = 'lookup-progress-bar';
      var progressInner = document.createElement('div');
      progressInner.className = 'lookup-progress-inner';
      progressInner.style.width = '0%';
      progressBar.appendChild(progressInner);

      var progressText = document.createElement('div');
      progressText.className = 'lookup-progress-text';
      progressText.textContent = '准备查询...';

      var currentWordEl = document.createElement('div');
      currentWordEl.className = 'lookup-current-word';

      progressContainer.appendChild(progressBar);
      progressContainer.appendChild(progressText);
      progressContainer.appendChild(currentWordEl);
      modal.body.appendChild(progressContainer);

      // 需要查询的单词（仅查询缺少音标的）
      var toQuery = rawWords.slice();
      var total = toQuery.length;

      batchLookup(toQuery, function(current, tot, enriched) {
        var pct = Math.round((current / tot) * 100);
        progressInner.style.width = pct + '%';
        progressText.textContent = '已查询 ' + current + ' / ' + tot + ' 个单词';
        currentWordEl.textContent = '🔍 ' + enriched.word;
      }).then(function(results) {
        enrichedWords = results;
        showFinalConfirm();
      });

      // 跳过联网查询的选项
      var skipBtn = document.createElement('button');
      skipBtn.className = 'btn-text-link';
      skipBtn.style.marginTop = '12px';
      skipBtn.textContent = '⏭️ 跳过查询，直接保存';
      skipBtn.addEventListener('click', function() {
        // 使用原始单词，不补全
        enrichedWords = rawWords.map(function(w) {
          return {
            word: w.word,
            meaning: w.meaning || '',
            phonetic: '',
            partOfSpeech: '',
            example: ''
          };
        });
        showFinalConfirm();
      });
      modal.body.appendChild(skipBtn);

      // 进入动画
      modal.body.classList.add('wizard-step-content-enter');
      setTimeout(function() { modal.body.classList.remove('wizard-step-content-enter'); }, 400);
    }

    /**
     * 最终确认 + 保存
     */
    function showFinalConfirm() {
      modal.body.innerHTML = '';

      var hero = document.createElement('div');
      hero.className = 'wizard-hero';
      hero.innerHTML = '<div class="wizard-hero-icon">✅</div>';
      modal.body.appendChild(hero);

      var title = document.createElement('h3');
      title.className = 'wizard-title';
      title.textContent = '即将导入';
      modal.body.appendChild(title);

      var summary = document.createElement('div');
      summary.className = 'import-summary';
      summary.innerHTML =
        '<div class="summary-row"><span>词库名称</span><strong>' + groupInfo.title + '</strong></div>' +
        '<div class="summary-row"><span>年级/学期</span><strong>' +
          (groupInfo.grade > 0 ? groupInfo.grade + '年级' : '其他') +
          (groupInfo.semester !== '不限' ? ' ' + groupInfo.semester : '') + '</strong></div>' +
        '<div class="summary-row"><span>单元</span><strong>' + (groupInfo.unit > 0 ? 'Unit ' + groupInfo.unit : '不限') + '</strong></div>' +
        '<div class="summary-row"><span>单词数量</span><strong>' + enrichedWords.length + ' 个</strong></div>';
      modal.body.appendChild(summary);

      // 预览前5个单词
      var previewList = document.createElement('div');
      previewList.className = 'final-preview-list';
      var showCount = Math.min(5, enrichedWords.length);
      for (var i = 0; i < showCount; i++) {
        var w = enrichedWords[i];
        var row = document.createElement('div');
        row.className = 'final-preview-row';
        row.innerHTML =
          '<span class="fp-word">' + w.word + '</span>' +
          '<span class="fp-phonetic">' + (w.phonetic || '') + '</span>' +
          '<span class="fp-pos">' + (w.partOfSpeech || '') + '</span>' +
          '<span class="fp-meaning">' + (w.meaning || '') + '</span>';
        previewList.appendChild(row);
      }
      if (enrichedWords.length > 5) {
        var moreEl = document.createElement('div');
        moreEl.className = 'fp-more';
        moreEl.textContent = '... 还有 ' + (enrichedWords.length - 5) + ' 个单词';
        previewList.appendChild(moreEl);
      }
      modal.body.appendChild(previewList);

      var btnRow = document.createElement('div');
      btnRow.className = 'wizard-btn-row';

      var backBtn = document.createElement('button');
      backBtn.className = 'btn-secondary';
      backBtn.textContent = '← 返回修改';
      backBtn.addEventListener('click', renderStep3);

      var saveBtn = document.createElement('button');
      saveBtn.className = 'btn-primary';
      saveBtn.textContent = '💾 确认导入';
      saveBtn.addEventListener('click', function() {
        var vocabGroup = {
          title: groupInfo.title,
          grade: groupInfo.grade,
          semester: groupInfo.semester,
          unit: groupInfo.unit,
          words: enrichedWords,
          createdAt: Date.now()
        };

        VocabStorage.addVocabGroup(vocabGroup).then(function(id) {
          vocabGroup.id = id;
          closeModal(modal);
          if (onImportComplete) onImportComplete(vocabGroup);
        }).catch(function(err) {
          alert('保存失败：' + (err.message || err));
        });
      });

      btnRow.appendChild(backBtn);
      btnRow.appendChild(saveBtn);
      modal.body.appendChild(btnRow);

      // 进入动画
      modal.body.classList.add('wizard-step-content-enter');
      setTimeout(function() { modal.body.classList.remove('wizard-step-content-enter'); }, 400);
    }

    // ---- 步骤指示器 ----
    function updateStepIndicator(current) {
      var steps = modal.header.querySelectorAll('.wizard-step');
      for (var i = 0; i < steps.length; i++) {
        steps[i].classList.toggle('active', (i + 1) === current);
        steps[i].classList.toggle('done', (i + 1) < current);
      }
    }

    // 启动第一步
    renderStep1();
    document.body.appendChild(modal.overlay);
  }

  // ========== 词库编辑弹窗 ==========

  /**
   * 显示词库组编辑弹窗（修改名称/单词）
   * @param {Object} group
   * @param {Function} onSave
   */
  function showGroupEditor(group, onSave) {
    var modal = createModal();
    var editGroup = JSON.parse(JSON.stringify(group)); // 深拷贝

    modal.body.innerHTML = '';

    var hero = document.createElement('div');
    hero.className = 'wizard-hero';
    hero.innerHTML = '<div class="wizard-hero-icon">✏️</div>';
    modal.body.appendChild(hero);

    var title = document.createElement('h3');
    title.className = 'wizard-title';
    title.textContent = '编辑词库';
    modal.body.appendChild(title);

    // 词库副标题
    var subtitle = document.createElement('div');
    subtitle.className = 'form-hint';
    subtitle.textContent = group.title;
    modal.body.appendChild(subtitle);

    // 词库信息编辑
    var form = document.createElement('div');
    form.className = 'group-info-form';

    var nameLabel = document.createElement('label');
    nameLabel.className = 'form-label';
    nameLabel.textContent = '词库名称';
    form.appendChild(nameLabel);

    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'form-input';
    nameInput.value = editGroup.title;
    nameInput.addEventListener('input', function() { editGroup.title = this.value.trim(); });
    form.appendChild(nameInput);

    modal.body.appendChild(form);

    // 单词列表
    var listTitle = document.createElement('div');
    listTitle.className = 'form-label';
    listTitle.style.marginTop = '12px';
    listTitle.textContent = '单词列表（' + editGroup.words.length + ' 个）';
    modal.body.appendChild(listTitle);

    var wordList = document.createElement('div');
    wordList.className = 'preview-word-list';

    function renderWordListEdit() {
      wordList.innerHTML = '';
      for (var i = 0; i < editGroup.words.length; i++) {
        (function(idx) {
          var row = document.createElement('div');
          row.className = 'preview-word-row';

          var numEl = document.createElement('span');
          numEl.className = 'preview-num';
          numEl.textContent = idx + 1;

          var wordInput = document.createElement('input');
          wordInput.className = 'preview-word-input';
          wordInput.value = editGroup.words[idx].word;
          wordInput.addEventListener('change', function() {
            editGroup.words[idx].word = this.value.trim().toLowerCase();
          });

          var meaningInput = document.createElement('input');
          meaningInput.className = 'preview-meaning-input';
          meaningInput.value = editGroup.words[idx].meaning || '';
          meaningInput.placeholder = '中文含义';
          meaningInput.addEventListener('change', function() {
            editGroup.words[idx].meaning = this.value.trim();
          });

          var delBtn = document.createElement('button');
          delBtn.className = 'btn-icon btn-icon-danger';
          delBtn.innerHTML = '×';
          delBtn.addEventListener('click', function() {
            editGroup.words.splice(idx, 1);
            renderWordListEdit();
          });

          row.appendChild(numEl);
          row.appendChild(wordInput);
          row.appendChild(meaningInput);
          row.appendChild(delBtn);
          wordList.appendChild(row);
        })(i);
      }

      var addRow = document.createElement('div');
      addRow.className = 'preview-word-row preview-add-row';
      var addBtn = document.createElement('button');
      addBtn.className = 'btn-text-link';
      addBtn.textContent = '+ 添加单词';
      addBtn.addEventListener('click', function() {
        editGroup.words.push({ word: '', meaning: '', phonetic: '', partOfSpeech: '', example: '' });
        renderWordListEdit();
      });
      addRow.appendChild(addBtn);
      wordList.appendChild(addRow);
    }

    renderWordListEdit();
    modal.body.appendChild(wordList);

    var btnRow = document.createElement('div');
    btnRow.className = 'wizard-btn-row';

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn-secondary';
    cancelBtn.textContent = '取消';
    cancelBtn.addEventListener('click', function() { closeModal(modal); });

    var saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary';
    saveBtn.textContent = '保存';
    saveBtn.addEventListener('click', function() {
      editGroup.words = editGroup.words.filter(function(w) { return w.word && w.word.trim(); });
      VocabStorage.updateVocabGroup(editGroup).then(function() {
        closeModal(modal);
        if (onSave) onSave(editGroup);
      });
    });

    btnRow.appendChild(cancelBtn);
    btnRow.appendChild(saveBtn);
    modal.body.appendChild(btnRow);

    document.body.appendChild(modal.overlay);
  }

  // ========== 通用弹窗创建 ==========

  function createModal() {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    var content = document.createElement('div');
    content.className = 'modal-content import-modal';

    // 步骤指示器
    var header = document.createElement('div');
    header.className = 'wizard-header';

    var stepLabels = ['选择方式', '确认单词', '设置信息', '补全保存'];
    for (var i = 0; i < stepLabels.length; i++) {
      var stepEl = document.createElement('div');
      stepEl.className = 'wizard-step' + (i === 0 ? ' active' : '');
      stepEl.innerHTML = '<span class="wizard-step-num">' + (i + 1) + '</span><span class="wizard-step-label">' + stepLabels[i] + '</span>';
      header.appendChild(stepEl);
    }

    // 关闭按钮
    var closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', function() {
      closeModal({ overlay: overlay });
    });
    header.appendChild(closeBtn);

    var body = document.createElement('div');
    body.className = 'modal-body';

    content.appendChild(header);
    content.appendChild(body);
    overlay.appendChild(content);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal({ overlay: overlay });
    });

    return { overlay: overlay, header: header, body: body };
  }

  function closeModal(modal) {
    if (modal.overlay && modal.overlay.parentNode) {
      modal.overlay.parentNode.removeChild(modal.overlay);
    }
  }

  // ========== 公共 API ==========

  return {
    showImportWizard: showImportWizard,
    showGroupEditor: showGroupEditor,
    downloadTemplate: downloadTemplate,
    parseTextToWords: parseTextToWords,
    parseCSV: parseCSV,
    lookupWord: lookupWord,
    batchLookup: batchLookup
  };

})();
