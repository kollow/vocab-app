/**
 * 应用主控制器 v2
 * 首页：展示"我的词库"词库组列表，点击开始背诵
 * 取消内置词库，全面支持导入词库组
 */
var App = (function() {
  var currentPage = 'home';

  /**
   * 应用初始化
   */
  function init() {
    VocabStorage.init().then(function() {
      console.log('VocabAppDB initialized');
      TTS.init(function(available) {
        console.log('TTS available: ' + available);
        renderHome();
        updateReviewCount();
      });
    });

    setupNavigation();
    showPage('home');
  }

  /**
   * 设置底部导航事件
   */
  function setupNavigation() {
    var navItems = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener('click', function() {
        var page = this.getAttribute('data-page');
        showPage(page);
      });
    }
  }

  /**
   * 切换页面
   */
  function showPage(pageName) {
    currentPage = pageName;
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
      pages[i].style.display = 'none';
    }

    var targetPage = document.getElementById('page-' + pageName);
    if (targetPage) {
      targetPage.style.display = 'block';
    }

    var navItems = document.querySelectorAll('.nav-item');
    for (var j = 0; j < navItems.length; j++) {
      navItems[j].classList.remove('active');
      if (navItems[j].getAttribute('data-page') === pageName) {
        navItems[j].classList.add('active');
      }
    }

    switch (pageName) {
      case 'home':
        renderHome();
        break;
      case 'study':
        renderStudy();
        break;
      case 'wordlist':
        renderWordList();
        break;
      case 'about':
        renderAbout();
        break;
    }
  }

  /**
   * 渲染首页 — 显示词库组列表
   */
  function renderHome() {
    updateReviewCount();

    VocabStorage.getStats().then(function(stats) {
      var statsEl = document.getElementById('home-stats');
      if (statsEl) {
        statsEl.innerHTML =
          '<div class="stat-item"><span class="stat-number">' + stats.new + '</span><span class="stat-label">新学</span></div>' +
          '<div class="stat-item"><span class="stat-number">' + stats.learning + '</span><span class="stat-label">学习中</span></div>' +
          '<div class="stat-item"><span class="stat-number">' + stats.mastered + '</span><span class="stat-label">已掌握</span></div>';
      }
    });

    var homeGroups = document.getElementById('home-vocab-groups');
    if (!homeGroups) return;
    homeGroups.innerHTML = '';

    VocabStorage.getAllVocabGroups().then(function(groups) {
      if (groups.length === 0) {
        homeGroups.innerHTML =
          '<div class="home-empty">' +
            '<div class="home-empty-icon">📚</div>' +
            '<p class="home-empty-title">还没有词库哦</p>' +
            '<p class="home-empty-hint">去"词库"页面导入单词，就可以在这里开始背诵了！</p>' +
            '<button class="btn-primary btn-go-import" onclick="App.showPage(\'wordlist\')">去导入词库</button>' +
          '</div>';
        return;
      }

      // 按年级+学期排序显示
      groups.sort(function(a, b) {
        var ga = (a.grade || 99) * 10 + (a.semester === '上册' ? 0 : 1);
        var gb = (b.grade || 99) * 10 + (b.semester === '上册' ? 0 : 1);
        return ga - gb;
      });

      var listEl = document.createElement('div');
      listEl.className = 'home-group-list';

      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var card = document.createElement('div');
        card.className = 'home-group-card';

        var infoDiv = document.createElement('div');
        infoDiv.className = 'home-group-info';

        var titleEl = document.createElement('div');
        titleEl.className = 'home-group-title';
        titleEl.textContent = g.title || '未命名词库';

        var metaEl = document.createElement('div');
        metaEl.className = 'home-group-meta';
        var metaParts = [];
        if (g.grade) metaParts.push(g.grade + '年级');
        if (g.semester) metaParts.push(g.semester);
        if (g.unit) metaParts.push('U' + g.unit);
        metaParts.push((g.words ? g.words.length : 0) + '词');
        metaEl.textContent = metaParts.join(' · ');

        infoDiv.appendChild(titleEl);
        infoDiv.appendChild(metaEl);

        var startBtn = document.createElement('button');
        startBtn.className = 'btn-primary btn-start-study';
        startBtn.textContent = '开始';
        startBtn.addEventListener('click', (function(group) {
          return function(e) {
            e.stopPropagation();
            startGroupStudySession(group);
          };
        })(g));

        card.appendChild(infoDiv);
        card.appendChild(startBtn);
        listEl.appendChild(card);
      }

      homeGroups.appendChild(listEl);
    });
  }

  /**
   * 渲染背诵页面
   */
  function renderStudy() {
    var container = document.getElementById('study-content');
    if (!container) return;

    container.innerHTML = '';

    var modeBar = document.createElement('div');
    modeBar.className = 'mode-bar';

    var modes = [
      { key: 'card', label: '🃏 卡片' },
      { key: 'choice', label: '✅ 选择' },
      { key: 'spell', label: '✏️ 拼写' }
    ];

    for (var i = 0; i < modes.length; i++) {
      var modeBtn = document.createElement('button');
      modeBtn.className = 'mode-btn' + (StudyManager.getMode() === modes[i].key ? ' active' : '');
      modeBtn.textContent = modes[i].label;
      modeBtn.setAttribute('data-mode', modes[i].key);
      modeBtn.addEventListener('click', (function(m) {
        return function() {
          StudyManager.setMode(m);
          renderStudy();
        };
      })(modes[i].key));
      modeBar.appendChild(modeBtn);
    }

    container.appendChild(modeBar);

    if (StudyManager.isComplete() || !StudyManager.getCurrentWord()) {
      renderStudyStart(container);
    } else {
      renderStudyContent(container);
    }
  }

  /**
   * 渲染背诵开始选择（从词库组选择）
   */
  function renderStudyStart(container) {
    var startSection = document.createElement('div');
    startSection.className = 'study-start';

    // 今日复习按钮
    var reviewBtn = document.createElement('button');
    reviewBtn.className = 'btn-review-start btn-disabled';
    reviewBtn.textContent = '🔄 今日复习 (0个)';
    reviewBtn.disabled = true;

    VocabStorage.getDueReviews().then(function(reviews) {
      if (reviews.length > 0) {
        reviewBtn.textContent = '🔄 今日复习 (' + reviews.length + '个)';
        reviewBtn.disabled = false;
        reviewBtn.className = 'btn-review-start';
        reviewBtn.addEventListener('click', function() {
          startReviewSession();
        });
      }
    });
    startSection.appendChild(reviewBtn);

    // 从词库组选择
    VocabStorage.getAllVocabGroups().then(function(groups) {
      if (groups.length === 0) {
        var emptyTip = document.createElement('div');
        emptyTip.className = 'study-empty-tip';
        emptyTip.innerHTML = '<p>还没有词库</p><button class="btn-primary" onclick="App.showPage(\'wordlist\')">去导入词库</button>';
        startSection.appendChild(emptyTip);
      } else {
        var title = document.createElement('h3');
        title.textContent = '选择词库开始背诵';
        startSection.appendChild(title);

        groups.sort(function(a, b) {
          var ga = (a.grade || 99) * 10 + (a.semester === '上册' ? 0 : 1);
          var gb = (b.grade || 99) * 10 + (b.semester === '上册' ? 0 : 1);
          return ga - gb;
        });

        for (var i = 0; i < groups.length; i++) {
          (function(group) {
            var groupDiv = document.createElement('div');
            groupDiv.className = 'study-group-item';

            var label = document.createElement('div');
            label.className = 'study-group-label';
            var parts = [];
            if (group.grade) parts.push(group.grade + '年级');
            if (group.semester) parts.push(group.semester);
            if (group.unit) parts.push('U' + group.unit);
            label.textContent = (group.title || '未命名') + (parts.length ? ' · ' + parts.join(' ') : '');

            var btn = document.createElement('button');
            btn.className = 'btn-primary btn-study-group';
            btn.textContent = '背诵 (' + (group.words ? group.words.length : 0) + '词)';
            btn.addEventListener('click', function() {
              startGroupStudySession(group);
            });

            groupDiv.appendChild(label);
            groupDiv.appendChild(btn);
            startSection.appendChild(groupDiv);
          })(groups[i]);
        }
      }

      container.appendChild(startSection);
    });
  }

  /**
   * 开始词库组背诵
   * @param {Object} group
   */
  function startGroupStudySession(group) {
    var words = WordListManager.getGroupWordsForStudy(group);
    if (words.length === 0) {
      alert('该词库没有单词！');
      return;
    }

    StudyManager.start(words, StudyManager.getMode(), false, function(result) {
      showStudyResult(result);
    });

    showPage('study');
    renderStudy();
  }

  /**
   * 开始复习会话
   */
  function startReviewSession() {
    VocabStorage.getDueReviews().then(function(reviews) {
      if (reviews.length === 0) {
        alert('今天没有需要复习的单词！');
        return;
      }

      Promise.all([
        VocabStorage.getAllVocabGroups(),
        VocabStorage.getAllCustomWords()
      ]).then(function(results) {
        var groups = results[0];
        var customWords = results[1];

        // 构建单词索引
        var wordIndex = {};
        for (var gi = 0; gi < groups.length; gi++) {
          var gWords = groups[gi].words || [];
          for (var wi = 0; wi < gWords.length; wi++) {
            var w = gWords[wi];
            wordIndex[w.word + '|' + (groups[gi].grade || 0) + '|' + (groups[gi].semester || '') + '|' + (groups[gi].unit || 0)] = w;
          }
        }
        for (var ci = 0; ci < customWords.length; ci++) {
          wordIndex[customWords[ci].word + '|0||0'] = customWords[ci];
        }

        var words = [];
        for (var ri = 0; ri < reviews.length; ri++) {
          var r = reviews[ri];
          var key = r.word + '|' + (r.grade || 0) + '|' + (r.semester || '') + '|' + (r.unit || 0);
          if (wordIndex[key]) {
            words.push(wordIndex[key]);
          } else {
            words.push({
              word: r.word,
              phonetic: '',
              partOfSpeech: '',
              meaning: r.meaning || '',
              example: '',
              grade: r.grade || 0,
              semester: r.semester || '',
              unit: r.unit || 0
            });
          }
        }

        StudyManager.start(words, StudyManager.getMode(), true, function(result) {
          showStudyResult(result);
        });
        renderStudy();
      });
    });
  }

  /**
   * 渲染背诵内容
   */
  function renderStudyContent(container) {
    var word = StudyManager.getCurrentWord();
    if (!word) return;

    var progressInfo = StudyManager.getProgress();
    var progressBar = document.createElement('div');
    progressBar.className = 'progress-bar-container';
    var progressInner = document.createElement('div');
    progressInner.className = 'progress-bar-inner';
    progressInner.style.width = Math.round((progressInfo.current / progressInfo.total) * 100) + '%';
    progressBar.appendChild(progressInner);

    var progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = progressInfo.current + ' / ' + progressInfo.total;

    container.appendChild(progressBar);
    container.appendChild(progressText);

    var mode = StudyManager.getMode();
    if (mode === 'card') {
      renderCardMode(container, word);
    } else if (mode === 'choice') {
      renderChoiceMode(container, word);
    } else if (mode === 'spell') {
      renderSpellMode(container, word);
    }
  }

  /**
   * 卡片翻面模式
   */
  function renderCardMode(container, word) {
    var cardContainer = document.createElement('div');
    cardContainer.className = 'flip-card-container';

    var flipCard = document.createElement('div');
    flipCard.className = 'flip-card';

    var front = document.createElement('div');
    front.className = 'flip-card-front';

    var speakBtn = document.createElement('button');
    speakBtn.className = 'btn-speak';
    speakBtn.innerHTML = '🔊';
    speakBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      TTS.speak(word.word);
    });

    var wordEl = document.createElement('div');
    wordEl.className = 'card-word';
    wordEl.textContent = word.word;

    var phoneticEl = document.createElement('div');
    phoneticEl.className = 'card-phonetic';
    phoneticEl.textContent = word.phonetic || '';

    var posEl = document.createElement('div');
    posEl.className = 'card-pos';
    posEl.textContent = word.partOfSpeech || '';

    front.appendChild(speakBtn);
    front.appendChild(wordEl);
    front.appendChild(phoneticEl);
    front.appendChild(posEl);

    var back = document.createElement('div');
    back.className = 'flip-card-back';

    var posMeaningEl = document.createElement('div');
    posMeaningEl.className = 'card-pos-meaning';
    posMeaningEl.innerHTML =
      (word.partOfSpeech ? '<span class="card-pos-tag">' + word.partOfSpeech + '</span>' : '') +
      '<span class="card-meaning">' + word.meaning + '</span>';

    var exampleEl = document.createElement('div');
    exampleEl.className = 'card-example';
    if (word.example) {
      exampleEl.textContent = word.example;
    } else {
      exampleEl.textContent = '';
      exampleEl.style.display = 'none';
    }

    back.appendChild(posMeaningEl);
    back.appendChild(exampleEl);

    flipCard.appendChild(front);
    flipCard.appendChild(back);
    cardContainer.appendChild(flipCard);

    var isFlipped = false;
    flipCard.addEventListener('click', function() {
      isFlipped = !isFlipped;
      if (isFlipped) {
        flipCard.classList.add('flipped');
      } else {
        flipCard.classList.remove('flipped');
      }
    });

    container.appendChild(cardContainer);

    var actionRow = document.createElement('div');
    actionRow.className = 'action-row';

    var retryBtn = document.createElement('button');
    retryBtn.className = 'btn-retry';
    retryBtn.innerHTML = '🔄 再复习';
    retryBtn.addEventListener('click', function() {
      StudyManager.markRetry();
      renderStudy();
    });

    var knownBtn = document.createElement('button');
    knownBtn.className = 'btn-known';
    knownBtn.innerHTML = '✅ 已掌握';
    knownBtn.addEventListener('click', function() {
      StudyManager.markKnown();
      renderStudy();
    });

    actionRow.appendChild(retryBtn);
    actionRow.appendChild(knownBtn);
    container.appendChild(actionRow);
  }

  /**
   * 选择题模式
   */
  function renderChoiceMode(container, word) {
    var choiceContainer = document.createElement('div');
    choiceContainer.className = 'choice-container';

    var question = document.createElement('div');
    question.className = 'choice-question';

    var speakBtn = document.createElement('button');
    speakBtn.className = 'btn-speak';
    speakBtn.innerHTML = '🔊';
    speakBtn.addEventListener('click', function() {
      TTS.speak(word.word);
    });

    var questionText = document.createElement('div');
    questionText.className = 'choice-word';
    questionText.textContent = word.word;

    var choicePhonetic = document.createElement('div');
    choicePhonetic.className = 'choice-phonetic';
    choicePhonetic.textContent = word.phonetic || '';

    var choicePos = document.createElement('div');
    choicePos.className = 'choice-pos';
    choicePos.textContent = word.partOfSpeech ? '(' + word.partOfSpeech + ')' : '';

    question.appendChild(speakBtn);
    question.appendChild(questionText);
    question.appendChild(choicePhonetic);
    question.appendChild(choicePos);
    choiceContainer.appendChild(question);

    // 从当前session的单词中随机取干扰项
    var allWords = StudyManager.getAllWords ? StudyManager.getAllWords() : [];
    var distractors = [];
    var others = allWords.filter(function(w) { return w.word !== word.word && w.meaning; });
    for (var i = others.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = others[i]; others[i] = others[j]; others[j] = tmp;
    }
    for (var k = 0; k < Math.min(3, others.length); k++) {
      distractors.push(others[k].meaning);
    }

    var options = [word.meaning].concat(distractors);
    for (var m = options.length - 1; m > 0; m--) {
      var n = Math.floor(Math.random() * (m + 1));
      var temp = options[m]; options[m] = options[n]; options[n] = temp;
    }

    var optionsDiv = document.createElement('div');
    optionsDiv.className = 'choice-options';

    var answered = false;

    for (var o = 0; o < options.length; o++) {
      var optionBtn = document.createElement('button');
      optionBtn.className = 'choice-option';
      optionBtn.textContent = options[o];
      optionBtn.setAttribute('data-correct', options[o] === word.meaning ? 'true' : 'false');

      optionBtn.addEventListener('click', (function(btn, isCorrect) {
        return function() {
          if (answered) return;
          answered = true;

          if (isCorrect) {
            btn.classList.add('correct');
            StudyManager.answerChoice(true);
            showCelebration();
          } else {
            btn.classList.add('wrong');
            var allOptions = optionsDiv.querySelectorAll('.choice-option');
            for (var p = 0; p < allOptions.length; p++) {
              if (allOptions[p].getAttribute('data-correct') === 'true') {
                allOptions[p].classList.add('correct');
              }
            }
            StudyManager.answerChoice(false);
          }

          setTimeout(function() {
            StudyManager.nextWord();
            renderStudy();
          }, 1500);
        };
      })(optionBtn, options[o] === word.meaning));

      optionsDiv.appendChild(optionBtn);
    }

    choiceContainer.appendChild(optionsDiv);
    container.appendChild(choiceContainer);
  }

  /**
   * 拼写模式
   */
  function renderSpellMode(container, word) {
    var spellContainer = document.createElement('div');
    spellContainer.className = 'spell-container';

    var meaningEl = document.createElement('div');
    meaningEl.className = 'spell-meaning';
    var meaningParts = [];
    if (word.partOfSpeech) meaningParts.push('<span class="spell-pos">' + word.partOfSpeech + '</span>');
    meaningParts.push(word.meaning);
    meaningEl.innerHTML = meaningParts.join(' ');
    spellContainer.appendChild(meaningEl);

    var spellPhonetic = document.createElement('div');
    spellPhonetic.className = 'spell-phonetic';
    spellPhonetic.textContent = word.phonetic || '';
    spellContainer.appendChild(spellPhonetic);

    var speakBtn = document.createElement('button');
    speakBtn.className = 'btn-speak';
    speakBtn.innerHTML = '🔊 听发音';
    speakBtn.addEventListener('click', function() { TTS.speak(word.word); });
    spellContainer.appendChild(speakBtn);

    var inputGroup = document.createElement('div');
    inputGroup.className = 'spell-input-group';

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'spell-input';
    input.placeholder = '输入英文单词...';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');

    var submitBtn = document.createElement('button');
    submitBtn.className = 'btn-primary btn-spell-submit';
    submitBtn.textContent = '提交';

    var hintBtn = document.createElement('button');
    hintBtn.className = 'btn-secondary btn-hint';
    hintBtn.textContent = '💡 提示';

    var resultDiv = document.createElement('div');
    resultDiv.className = 'spell-result';

    var answered = false;

    function handleSubmit() {
      if (answered) return;
      var userInput = input.value.trim();
      if (!userInput) return;

      answered = true;
      var result = StudyManager.checkSpelling(userInput);

      if (result.correct) {
        resultDiv.innerHTML = '<div class="spell-correct">✅ 正确！</div>';
        showCelebration();
      } else {
        var diffHtml = '<div class="spell-wrong">❌ 错误</div>';
        diffHtml += '<div class="spell-answer">正确答案：<strong>' + word.word + '</strong></div>';

        if (result.diff && result.diff.length > 0) {
          diffHtml += '<div class="spell-diff">';
          var letters = word.word.split('');
          for (var i = 0; i < letters.length; i++) {
            var isDiff = false;
            for (var d = 0; d < result.diff.length; d++) {
              if (result.diff[d].index === i) { isDiff = true; break; }
            }
            if (isDiff) {
              diffHtml += '<span class="diff-letter">' + letters[i] + '</span>';
            } else {
              diffHtml += '<span class="correct-letter">' + letters[i] + '</span>';
            }
          }
          diffHtml += '</div>';
        }
        resultDiv.innerHTML = diffHtml;
      }

      setTimeout(function() {
        StudyManager.nextWord();
        renderStudy();
      }, 2500);
    }

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleSubmit();
    });
    submitBtn.addEventListener('click', handleSubmit);
    hintBtn.addEventListener('click', function() {
      if (!answered) {
        var hint = StudyManager.getSpellingHint();
        input.placeholder = '提示：' + hint;
        input.focus();
      }
    });

    inputGroup.appendChild(input);
    inputGroup.appendChild(submitBtn);
    inputGroup.appendChild(hintBtn);
    spellContainer.appendChild(inputGroup);
    spellContainer.appendChild(resultDiv);
    container.appendChild(spellContainer);

    setTimeout(function() { input.focus(); }, 100);
  }

  /**
   * 显示背诵结果
   */
  function showStudyResult(result) {
    var container = document.getElementById('study-content');
    if (!container) return;

    container.innerHTML = '';

    var resultDiv = document.createElement('div');
    resultDiv.className = 'study-result';

    var title = document.createElement('h2');
    title.className = 'result-title';
    title.textContent = '🎉 学习完成！';

    var scoreDiv = document.createElement('div');
    scoreDiv.className = 'result-score';
    var accuracy = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
    scoreDiv.innerHTML =
      '<div class="score-circle">' + accuracy + '%</div>' +
      '<div class="score-details">' +
        '<p>✅ 正确：' + result.correct + ' 个</p>' +
        '<p>❌ 错误：' + result.wrong + ' 个</p>' +
        '<p>📝 总计：' + result.total + ' 个</p>' +
      '</div>';

    var backBtn = document.createElement('button');
    backBtn.className = 'btn-primary btn-back-home';
    backBtn.textContent = '返回首页';
    backBtn.addEventListener('click', function() {
      StudyManager.reset();
      showPage('home');
    });

    var retryBtn = document.createElement('button');
    retryBtn.className = 'btn-secondary btn-retry-all';
    retryBtn.textContent = '再学一次';
    retryBtn.addEventListener('click', function() {
      StudyManager.reset();
      renderStudy();
    });

    resultDiv.appendChild(title);
    resultDiv.appendChild(scoreDiv);
    resultDiv.appendChild(backBtn);
    resultDiv.appendChild(retryBtn);
    container.appendChild(resultDiv);

    if (accuracy >= 80) showCelebration();
  }

  /**
   * 庆祝动画
   */
  function showCelebration() {
    var overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = '';

    var stars = ['⭐', '🌟', '✨', '💫', '🎉', '🎊'];
    for (var i = 0; i < 20; i++) {
      var star = document.createElement('span');
      star.className = 'falling-star';
      star.textContent = stars[Math.floor(Math.random() * stars.length)];
      star.style.left = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 2 + 's';
      star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      star.style.fontSize = (16 + Math.random() * 24) + 'px';
      overlay.appendChild(star);
    }

    document.body.appendChild(overlay);
    setTimeout(function() {
      if (overlay.parentNode) document.body.removeChild(overlay);
    }, 4000);
  }

  /**
   * 渲染词库页面（我的词库 + 手动单词）
   */
  function renderWordList() {
    var myVocabContainer = document.getElementById('my-vocablist');
    var customContainer = document.getElementById('custom-wordlist');

    // 绑定Tab切换（只绑一次）
    var tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length && !tabBtns[0]._vocabTabBound) {
      for (var i = 0; i < tabBtns.length; i++) {
        tabBtns[i]._vocabTabBound = true;
        tabBtns[i].addEventListener('click', function() {
          switchTab(this.getAttribute('data-tab'));
        });
      }
    }

    if (myVocabContainer) {
      WordListManager.renderMyVocab(myVocabContainer);
    }
    if (customContainer) {
      WordListManager.renderCustomList(customContainer);
    }
  }

  /**
   * 切换词库标签
   */
  function switchTab(tab) {
    var tabBtns = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < tabBtns.length; i++) {
      tabBtns[i].classList.remove('active');
      if (tabBtns[i].getAttribute('data-tab') === tab) {
        tabBtns[i].classList.add('active');
      }
    }

    var myPanel = document.getElementById('my-vocab-panel');
    var customPanel = document.getElementById('custom-panel');

    if (tab === 'my-vocab') {
      if (myPanel) myPanel.style.display = 'block';
      if (customPanel) customPanel.style.display = 'none';
      var myVocabContainer = document.getElementById('my-vocablist');
      if (myVocabContainer) WordListManager.renderMyVocab(myVocabContainer);
    } else {
      if (myPanel) myPanel.style.display = 'none';
      if (customPanel) customPanel.style.display = 'block';
      var customContainer = document.getElementById('custom-wordlist');
      if (customContainer) WordListManager.renderCustomList(customContainer);
    }
  }

  /**
   * 显示单词详情弹窗
   */
  function showWordDetail(wordData) {
    var modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.addEventListener('click', function(e) {
      if (e.target === modal) document.body.removeChild(modal);
    });

    var content = document.createElement('div');
    content.className = 'modal-content word-detail-modal';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'btn-close';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', function() { document.body.removeChild(modal); });

    var wordEl = document.createElement('div');
    wordEl.className = 'detail-word';
    wordEl.textContent = wordData.word;

    var speakBtn = document.createElement('button');
    speakBtn.className = 'btn-speak';
    speakBtn.innerHTML = '🔊';
    speakBtn.addEventListener('click', function() { TTS.speak(wordData.word); });

    if (!TTS.isAvailable()) speakBtn.style.display = 'none';

    var phoneticEl = document.createElement('div');
    phoneticEl.className = 'detail-phonetic';
    phoneticEl.textContent = wordData.phonetic || '';

    var posEl = document.createElement('div');
    posEl.className = 'detail-pos';
    posEl.textContent = (wordData.partOfSpeech || '') + ' ' + (wordData.meaning || '');

    var exampleEl = document.createElement('div');
    exampleEl.className = 'detail-example';
    exampleEl.textContent = wordData.example || '';

    content.appendChild(closeBtn);
    content.appendChild(wordEl);
    content.appendChild(speakBtn);
    content.appendChild(phoneticEl);
    content.appendChild(posEl);
    content.appendChild(exampleEl);

    modal.appendChild(content);
    document.body.appendChild(modal);
  }

  /**
   * 更新今日待复习数量
   */
  function updateReviewCount() {
    VocabStorage.getDueReviews().then(function(reviews) {
      var countEl = document.getElementById('review-count');
      if (countEl) countEl.textContent = reviews.length;
    });
  }

  /**
   * 渲染关于页（数据备份与恢复）
   */
  function renderAbout() {
    var container = document.getElementById('backup-content');
    if (!container) return;
    container.innerHTML = '';

    // 数据概览
    var overviewDiv = document.createElement('div');
    overviewDiv.className = 'backup-overview';
    overviewDiv.innerHTML = '<div class="backup-loading">加载中...</div>';
    container.appendChild(overviewDiv);

    VocabStorage.getAllVocabGroups().then(function(groups) {
      var groupCount = groups.length;
      var wordCount = 0;
      for (var i = 0; i < groups.length; i++) {
        wordCount += (groups[i].words ? groups[i].words.length : 0);
      }
      return { groupCount: groupCount, wordCount: wordCount };
    }).then(function(info) {
      return VocabStorage.getAllCustomWords().then(function(customs) {
        return VocabStorage.getStats().then(function(stats) {
          overviewDiv.innerHTML =
            '<div class="backup-stat-row">' +
              '<span class="backup-stat-label">词库组</span>' +
              '<span class="backup-stat-value">' + info.groupCount + ' 个</span>' +
            '</div>' +
            '<div class="backup-stat-row">' +
              '<span class="backup-stat-label">导入单词</span>' +
              '<span class="backup-stat-value">' + info.wordCount + ' 个</span>' +
            '</div>' +
            '<div class="backup-stat-row">' +
              '<span class="backup-stat-label">手动单词</span>' +
              '<span class="backup-stat-value">' + customs.length + ' 个</span>' +
            '</div>' +
            '<div class="backup-stat-row">' +
              '<span class="backup-stat-label">学习记录</span>' +
              '<span class="backup-stat-value">' + stats.total + ' 条</span>' +
            '</div>';
        });
      });
    });

    // 导出区域
    var exportDiv = document.createElement('div');
    exportDiv.className = 'backup-export-section';
    exportDiv.innerHTML = '<div class="backup-subtitle">📤 导出数据</div>';

    var exportBtns = [
      { key: 'vocab', label: '导出词库', desc: '词库组 + 手动添加的单词', icon: '📚' },
      { key: 'progress', label: '导出学习记录', desc: '背诵进度、复习时间等', icon: '📊' },
      { key: 'full', label: '完整备份', desc: '所有数据，可用于迁移设备', icon: '💾' }
    ];

    for (var i = 0; i < exportBtns.length; i++) {
      (function(btn) {
        var item = document.createElement('div');
        item.className = 'backup-action-item';
        item.innerHTML =
          '<div class="backup-action-info">' +
            '<span class="backup-action-icon">' + btn.icon + '</span>' +
            '<div>' +
              '<div class="backup-action-label">' + btn.label + '</div>' +
              '<div class="backup-action-desc">' + btn.desc + '</div>' +
            '</div>' +
          '</div>';
        var actionBtn = document.createElement('button');
        actionBtn.className = 'btn-primary btn-backup-action';
        actionBtn.textContent = '导出';
        actionBtn.addEventListener('click', function() {
          handleExport(btn.key);
        });
        item.appendChild(actionBtn);
        exportDiv.appendChild(item);
      })(exportBtns[i]);
    }
    container.appendChild(exportDiv);

    // 导入区域
    var importDiv = document.createElement('div');
    importDiv.className = 'backup-import-section';
    importDiv.innerHTML = '<div class="backup-subtitle">📥 恢复数据</div>';

    var importItem = document.createElement('div');
    importItem.className = 'backup-action-item';
    importItem.innerHTML =
      '<div class="backup-action-info">' +
        '<span class="backup-action-icon">📂</span>' +
        '<div>' +
          '<div class="backup-action-label">导入备份文件</div>' +
          '<div class="backup-action-desc">选择之前导出的 .json 文件</div>' +
        '</div>' +
      '</div>';

    var importBtn = document.createElement('button');
    importBtn.className = 'btn-secondary btn-backup-action';
    importBtn.textContent = '选择文件';
    importBtn.addEventListener('click', function() {
      triggerImportFile();
    });
    importItem.appendChild(importBtn);
    importDiv.appendChild(importItem);

    // 隐藏的 file input
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    fileInput.id = 'backup-file-input';
    fileInput.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        handleImportFile(e.target.files[0]);
      }
    });
    importDiv.appendChild(fileInput);

    container.appendChild(importDiv);
  }

  /**
   * 处理导出操作
   * @param {string} type - vocab/progress/full
   */
  function handleExport(type) {
    var exportFn;
    var filename;

    switch (type) {
      case 'vocab':
        exportFn = VocabStorage.exportVocabData;
        filename = 'vocab-backup';
        break;
      case 'progress':
        exportFn = VocabStorage.exportProgressData;
        filename = 'progress-backup';
        break;
      case 'full':
        exportFn = VocabStorage.exportFullBackup;
        filename = 'full-backup';
        break;
      default:
        return;
    }

    var dateStr = new Date().toISOString().slice(0, 10);
    var fullFilename = '英语单词-' + filename + '-' + dateStr + '.json';

    exportFn.call(VocabStorage).then(function(data) {
      var json = JSON.stringify(data, null, 2);
      var blob = new Blob([json], { type: 'application/json' });
      var url = URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.href = url;
      a.download = fullFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showBackupToast('导出成功：' + fullFilename);
    }).catch(function(err) {
      showBackupToast('导出失败：' + err, true);
    });
  }

  /**
   * 触发选择备份文件
   */
  function triggerImportFile() {
    var fileInput = document.getElementById('backup-file-input');
    if (fileInput) fileInput.click();
  }

  /**
   * 处理导入备份文件
   * @param {File} file
   */
  function handleImportFile(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var backupObj = JSON.parse(e.target.result);

        if (!backupObj || !backupObj.type || !backupObj.data) {
          showBackupToast('文件格式无效，请选择正确的备份文件', true);
          return;
        }

        var typeLabel = { vocab: '词库', progress: '学习记录', full: '完整' };
        var label = typeLabel[backupObj.type] || '未知';

        showImportConfirmDialog(backupObj, label);
      } catch (err) {
        showBackupToast('文件解析失败：' + err.message, true);
      }
    };
    reader.readAsText(file);
  }

  /**
   * 显示导入确认对话框
   * @param {Object} backupObj
   * @param {string} label
   */
  function showImportConfirmDialog(backupObj, label) {
    var modal = document.createElement('div');
    modal.className = 'modal-overlay';

    var content = document.createElement('div');
    content.className = 'modal-content backup-import-modal';

    var title = document.createElement('h3');
    title.className = 'backup-modal-title';
    title.textContent = '📥 导入' + label + '备份';

    var info = document.createElement('div');
    info.className = 'backup-import-info';

    var data = backupObj.data;
    var infoHtml = '';
    if (data.vocab_groups) {
      infoHtml += '<div>📚 词库组：' + data.vocab_groups.length + ' 个</div>';
    }
    if (data.custom_words) {
      infoHtml += '<div>📝 手动单词：' + data.custom_words.length + ' 个</div>';
    }
    if (data.words_progress) {
      infoHtml += '<div>📊 学习记录：' + data.words_progress.length + ' 条</div>';
    }
    if (backupObj.exportedAt) {
      infoHtml += '<div>🕐 备份时间：' + new Date(backupObj.exportedAt).toLocaleString('zh-CN') + '</div>';
    }
    info.innerHTML = infoHtml;

    var modeHint = document.createElement('div');
    modeHint.className = 'backup-mode-hint';
    modeHint.innerHTML =
      '<div class="backup-mode-option" data-mode="merge">' +
        '<strong>🔀 合并</strong>：保留现有数据，追加备份数据（推荐）' +
      '</div>' +
      '<div class="backup-mode-option" data-mode="replace">' +
        '<strong>⚠️ 覆盖</strong>：清空现有数据，用备份数据替换' +
      '</div>';

    var btnRow = document.createElement('div');
    btnRow.className = 'backup-modal-btns';

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn-secondary';
    cancelBtn.textContent = '取消';
    cancelBtn.addEventListener('click', function() {
      document.body.removeChild(modal);
    });

    var mergeBtn = document.createElement('button');
    mergeBtn.className = 'btn-primary';
    mergeBtn.textContent = '🔀 合并导入';
    mergeBtn.addEventListener('click', function() {
      document.body.removeChild(modal);
      doImport(backupObj, true);
    });

    var replaceBtn = document.createElement('button');
    replaceBtn.className = 'btn-danger';
    replaceBtn.textContent = '⚠️ 覆盖导入';
    replaceBtn.addEventListener('click', function() {
      document.body.removeChild(modal);
      doImport(backupObj, false);
    });

    btnRow.appendChild(cancelBtn);
    btnRow.appendChild(mergeBtn);
    btnRow.appendChild(replaceBtn);

    content.appendChild(title);
    content.appendChild(info);
    content.appendChild(modeHint);
    content.appendChild(btnRow);
    modal.appendChild(content);
    document.body.appendChild(modal);
  }

  /**
   * 执行导入
   * @param {Object} backupObj
   * @param {boolean} merge - true=合并, false=覆盖
   */
  function doImport(backupObj, merge) {
    showBackupToast('正在导入...');

    VocabStorage.importBackup(backupObj, { merge: merge }).then(function(stats) {
      var msg = '导入完成！';
      var parts = [];
      if (stats.vocab_groups > 0) parts.push('词库 ' + stats.vocab_groups + ' 个');
      if (stats.custom_words > 0) parts.push('单词 ' + stats.custom_words + ' 个');
      if (stats.words_progress > 0) parts.push('记录 ' + stats.words_progress + ' 条');
      if (parts.length > 0) msg += ' ' + parts.join('，');

      showBackupToast(msg);
      renderAbout();
      updateReviewCount();
    }).catch(function(err) {
      showBackupToast('导入失败：' + err, true);
    });
  }

  /**
   * 显示备份操作提示
   * @param {string} message
   * @param {boolean} isError
   */
  function showBackupToast(message, isError) {
    var existing = document.querySelector('.backup-toast');
    if (existing) document.body.removeChild(existing);

    var toast = document.createElement('div');
    toast.className = 'backup-toast' + (isError ? ' backup-toast-error' : '');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function() {
      toast.classList.add('backup-toast-fade');
    }, 2500);

    setTimeout(function() {
      if (toast.parentNode) document.body.removeChild(toast);
    }, 3000);
  }

  return {
    init: init,
    showPage: showPage,
    renderHome: renderHome,
    renderStudy: renderStudy,
    renderWordList: renderWordList,
    showWordDetail: showWordDetail,
    showCelebration: showCelebration,
    startGroupStudySession: startGroupStudySession,
    startReviewSession: startReviewSession,
    updateReviewCount: updateReviewCount
  };
})();

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', function() {
  App.init();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      console.log('Service Worker registered: ' + registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed: ' + error);
    });
  }
});
