/**
 * 词库管理模块 v2
 * 支持导入词库组管理、自定义单词管理
 * 取消内置词库展示，改为"我的词库"
 */
var WordListManager = (function() {

  /**
   * 渲染"我的词库"主页（首屏）
   * @param {HTMLElement} container
   */
  function renderMyVocab(container) {
    container.innerHTML = '';

    // 顶部操作栏
    var toolbar = document.createElement('div');
    toolbar.className = 'vocab-toolbar';

    var importBtnGroup = document.createElement('div');
    importBtnGroup.className = 'import-btn-group';

    // 统一使用导入向导（内部有4种方式选择）
    var importMainBtn = document.createElement('button');
    importMainBtn.className = 'btn-import btn-import-main';
    importMainBtn.innerHTML = '📥 导入词库';
    importMainBtn.addEventListener('click', function() {
      VocabImporter.showImportWizard(function(vocabGroup) {
        // 导入完成后刷新列表
        renderMyVocab(container);
        App.updateReviewCount();
      });
    });

    var downloadTplBtn = document.createElement('button');
    downloadTplBtn.className = 'btn-secondary btn-download-tpl';
    downloadTplBtn.innerHTML = '⬇️ 下载模板';
    downloadTplBtn.addEventListener('click', function() {
      VocabImporter.downloadTemplate();
    });

    importBtnGroup.appendChild(importMainBtn);
    importBtnGroup.appendChild(downloadTplBtn);
    toolbar.appendChild(importBtnGroup);
    container.appendChild(toolbar);

    // 词库组列表
    VocabStorage.getAllVocabGroups().then(function(groups) {
      if (groups.length === 0) {
        var emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-message';
        emptyMsg.innerHTML = '<div class="empty-icon">📚</div><p>还没有词库，点击上方按钮导入吧！</p><p class="empty-hint">支持拍照、上传图片/PDF，或使用模板批量导入</p>';
        container.appendChild(emptyMsg);
        return;
      }

      // 按年级+学期分组显示
      var groupMap = {};
      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var key = (g.grade || '自定义') + (g.semester || '');
        if (!groupMap[key]) {
          groupMap[key] = { label: (g.grade ? g.grade + '年级' + (g.semester || '') : '自定义'), items: [] };
        }
        groupMap[key].items.push(g);
      }

      for (var key in groupMap) {
        if (!groupMap.hasOwnProperty(key)) continue;
        var section = document.createElement('div');
        section.className = 'vocab-group-section';

        var sectionTitle = document.createElement('div');
        sectionTitle.className = 'vocab-section-title';
        sectionTitle.textContent = '🎓 ' + groupMap[key].label;
        section.appendChild(sectionTitle);

        var items = groupMap[key].items;
        for (var j = 0; j < items.length; j++) {
          section.appendChild(createGroupCard(items[j], container));
        }

        container.appendChild(section);
      }
    });
  }

  /**
   * 创建词库组卡片
   * @param {Object} group
   * @param {HTMLElement} listContainer - 用于刷新的父容器
   * @returns {HTMLElement}
   */
  function createGroupCard(group, listContainer) {
    var card = document.createElement('div');
    card.className = 'vocab-group-card';

    var info = document.createElement('div');
    info.className = 'group-card-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'group-card-title';
    titleEl.textContent = group.title || '未命名词库';

    var metaEl = document.createElement('div');
    metaEl.className = 'group-card-meta';
    var metaParts = [];
    if (group.grade) metaParts.push(group.grade + '年级');
    if (group.semester) metaParts.push(group.semester);
    if (group.unit) metaParts.push('第' + group.unit + '单元');
    metaParts.push((group.words ? group.words.length : 0) + '个单词');
    metaEl.textContent = metaParts.join(' · ');

    info.appendChild(titleEl);
    info.appendChild(metaEl);

    var actions = document.createElement('div');
    actions.className = 'group-card-actions';

    var studyBtn = document.createElement('button');
    studyBtn.className = 'btn-primary btn-study-group';
    studyBtn.innerHTML = '📖 背诵';
    studyBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      App.startGroupStudySession(group);
    });

    var editBtn = document.createElement('button');
    editBtn.className = 'btn-icon';
    editBtn.innerHTML = '✏️';
    editBtn.title = '编辑词库';
    editBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showGroupEditor(group, listContainer);
    });

    var enrichBtn = document.createElement('button');
    enrichBtn.className = 'btn-icon';
    enrichBtn.innerHTML = '🌐';
    enrichBtn.title = '联网补全词性/例句';
    enrichBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      enrichGroupWords(group, listContainer);
    });

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon btn-icon-danger';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = '删除词库';
    deleteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (confirm('确定要删除词库"' + (group.title || '未命名') + '"吗？')) {
        VocabStorage.deleteVocabGroup(group.id).then(function() {
          renderMyVocab(listContainer);
        });
      }
    });

    actions.appendChild(studyBtn);
    actions.appendChild(enrichBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(info);
    card.appendChild(actions);

    // 点击展开单词列表
    card.addEventListener('click', function() {
      showGroupDetail(group);
    });

    return card;
  }

  /**
   * 显示词库组详情弹窗
   * @param {Object} group
   */
  function showGroupDetail(group) {
    var modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.addEventListener('click', function(e) {
      if (e.target === modal) document.body.removeChild(modal);
    });

    var content = document.createElement('div');
    content.className = 'modal-content group-detail-modal';

    var header = document.createElement('div');
    header.className = 'modal-header';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'btn-close';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', function() { document.body.removeChild(modal); });

    var titleEl = document.createElement('h3');
    titleEl.textContent = group.title || '未命名词库';

    header.appendChild(closeBtn);
    header.appendChild(titleEl);
    content.appendChild(header);

    var wordList = document.createElement('div');
    wordList.className = 'group-word-list';

    var words = group.words || [];
    for (var i = 0; i < words.length; i++) {
      var wordItem = createWordItem(words[i]);
      wordList.appendChild(wordItem);
    }

    content.appendChild(wordList);
    modal.appendChild(content);
    document.body.appendChild(modal);
  }

  /**
   * 显示词库组编辑器
   * @param {Object} group
   * @param {HTMLElement} listContainer
   */
  function showGroupEditor(group, listContainer) {
    var modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.addEventListener('click', function(e) {
      if (e.target === modal) document.body.removeChild(modal);
    });

    var content = document.createElement('div');
    content.className = 'modal-content group-editor-modal';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'btn-close';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', function() { document.body.removeChild(modal); });

    var titleEl = document.createElement('h3');
    titleEl.textContent = '编辑词库：' + (group.title || '');

    content.appendChild(closeBtn);
    content.appendChild(titleEl);

    // 基本信息编辑
    var infoForm = document.createElement('div');
    infoForm.className = 'group-info-form';

    // 标题
    var titleLabel = document.createElement('label');
    titleLabel.textContent = '词库名称';
    titleLabel.className = 'form-label';
    var titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'form-input';
    titleInput.value = group.title || '';

    // 年级
    var gradeLabel = document.createElement('label');
    gradeLabel.textContent = '年级';
    gradeLabel.className = 'form-label';
    var gradeSelect = document.createElement('select');
    gradeSelect.className = 'form-select';
    [3,4,5,6].forEach(function(g) {
      var opt = document.createElement('option');
      opt.value = g;
      opt.textContent = g + '年级';
      if (group.grade == g) opt.selected = true;
      gradeSelect.appendChild(opt);
    });

    // 学期
    var semLabel = document.createElement('label');
    semLabel.textContent = '学期';
    semLabel.className = 'form-label';
    var semSelect = document.createElement('select');
    semSelect.className = 'form-select';
    ['上册','下册'].forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      if (group.semester === s) opt.selected = true;
      semSelect.appendChild(opt);
    });

    // 单元
    var unitLabel = document.createElement('label');
    unitLabel.textContent = '单元（选填）';
    unitLabel.className = 'form-label';
    var unitInput = document.createElement('input');
    unitInput.type = 'number';
    unitInput.className = 'form-input';
    unitInput.min = 1;
    unitInput.max = 20;
    unitInput.value = group.unit || '';
    unitInput.placeholder = '例如：1';

    infoForm.appendChild(titleLabel);
    infoForm.appendChild(titleInput);
    infoForm.appendChild(gradeLabel);
    infoForm.appendChild(gradeSelect);
    infoForm.appendChild(semLabel);
    infoForm.appendChild(semSelect);
    infoForm.appendChild(unitLabel);
    infoForm.appendChild(unitInput);
    content.appendChild(infoForm);

    // 单词列表编辑
    var wordsTitle = document.createElement('div');
    wordsTitle.className = 'editor-section-title';
    wordsTitle.textContent = '单词列表（点击单词可编辑/删除）';
    content.appendChild(wordsTitle);

    var wordsContainer = document.createElement('div');
    wordsContainer.className = 'editor-words-container';

    var editableWords = (group.words || []).map(function(w) { return Object.assign({}, w); });

    function renderEditableWords() {
      wordsContainer.innerHTML = '';
      for (var i = 0; i < editableWords.length; i++) {
        (function(idx) {
          var row = document.createElement('div');
          row.className = 'editor-word-row';

          var wordSpan = document.createElement('span');
          wordSpan.className = 'editor-word-en';
          wordSpan.textContent = editableWords[idx].word;

          var meaningSpan = document.createElement('span');
          meaningSpan.className = 'editor-word-cn';
          meaningSpan.textContent = editableWords[idx].meaning;

          var delBtn = document.createElement('button');
          delBtn.className = 'btn-icon btn-icon-danger btn-sm';
          delBtn.innerHTML = '✕';
          delBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            editableWords.splice(idx, 1);
            renderEditableWords();
          });

          row.appendChild(wordSpan);
          row.appendChild(meaningSpan);
          row.appendChild(delBtn);

          row.addEventListener('click', function() {
            var newWord = prompt('修改英文单词：', editableWords[idx].word);
            if (newWord && newWord.trim()) {
              editableWords[idx].word = newWord.trim();
              var newMeaning = prompt('修改中文释义：', editableWords[idx].meaning);
              if (newMeaning && newMeaning.trim()) {
                editableWords[idx].meaning = newMeaning.trim();
              }
              renderEditableWords();
            }
          });

          wordsContainer.appendChild(row);
        })(i);
      }

      // 添加单词按钮
      var addWordRow = document.createElement('div');
      addWordRow.className = 'editor-add-row';
      var addWordBtn = document.createElement('button');
      addWordBtn.className = 'btn-secondary btn-sm';
      addWordBtn.textContent = '➕ 添加单词';
      addWordBtn.addEventListener('click', function() {
        var newWord = prompt('英文单词：');
        if (!newWord || !newWord.trim()) return;
        var newMeaning = prompt('中文释义：');
        if (!newMeaning || !newMeaning.trim()) return;
        editableWords.push({ word: newWord.trim(), meaning: newMeaning.trim(), phonetic: '', partOfSpeech: '', example: '' });
        renderEditableWords();
      });
      addWordRow.appendChild(addWordBtn);
      wordsContainer.appendChild(addWordRow);
    }

    renderEditableWords();
    content.appendChild(wordsContainer);

    // 保存按钮
    var saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary btn-block';
    saveBtn.textContent = '💾 保存';
    saveBtn.addEventListener('click', function() {
      var updatedGroup = Object.assign({}, group, {
        title: titleInput.value.trim() || group.title,
        grade: parseInt(gradeSelect.value),
        semester: semSelect.value,
        unit: unitInput.value ? parseInt(unitInput.value) : null,
        words: editableWords
      });
      VocabStorage.updateVocabGroup(updatedGroup).then(function() {
        document.body.removeChild(modal);
        renderMyVocab(listContainer);
      });
    });

    content.appendChild(saveBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
  }

  /**
   * 创建单词展示项
   * @param {Object} wordData
   * @returns {HTMLElement}
   */
  function createWordItem(wordData) {
    var item = document.createElement('div');
    item.className = 'word-item';

    var wordText = document.createElement('span');
    wordText.className = 'word-text';
    wordText.textContent = wordData.word;

    var phoneticText = document.createElement('span');
    phoneticText.className = 'phonetic-text';
    phoneticText.textContent = wordData.phonetic || '';

    var posText = document.createElement('span');
    posText.className = 'pos-text';
    posText.textContent = wordData.partOfSpeech || '';

    var meaningText = document.createElement('span');
    meaningText.className = 'meaning-text';
    meaningText.textContent = wordData.meaning;

    var speakBtn = document.createElement('button');
    speakBtn.className = 'btn-speak-small';
    speakBtn.innerHTML = '🔊';
    speakBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      TTS.speak(wordData.word);
    });

    if (!TTS.isAvailable()) {
      speakBtn.style.display = 'none';
    }

    item.appendChild(speakBtn);
    item.appendChild(wordText);
    item.appendChild(phoneticText);
    item.appendChild(posText);
    item.appendChild(meaningText);

    return item;
  }

  /**
   * 渲染自定义单词页（手动维护单个单词）
   * @param {HTMLElement} container
   */
  function renderCustomList(container) {
    container.innerHTML = '';

    var addBtn = document.createElement('button');
    addBtn.className = 'btn-primary btn-add-word';
    addBtn.textContent = '➕ 手动添加单词';
    addBtn.addEventListener('click', function() {
      showCustomWordForm(container, null);
    });
    container.appendChild(addBtn);

    VocabStorage.getAllCustomWords().then(function(words) {
      if (words.length === 0) {
        var emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-message';
        emptyMsg.textContent = '还没有自定义单词，点击上方按钮添加吧！';
        container.appendChild(emptyMsg);
        return;
      }

      words.sort(function(a, b) { return b.createdAt - a.createdAt; });

      var listDiv = document.createElement('div');
      listDiv.className = 'custom-word-list';

      for (var i = 0; i < words.length; i++) {
        var wordCard = createCustomWordCard(words[i], container);
        listDiv.appendChild(wordCard);
      }

      container.appendChild(listDiv);
    });
  }

  /**
   * 创建自定义单词卡片
   */
  function createCustomWordCard(wordData, container) {
    var card = document.createElement('div');
    card.className = 'custom-word-card';

    var info = document.createElement('div');
    info.className = 'custom-word-info';

    var wordSpan = document.createElement('span');
    wordSpan.className = 'word-text';
    wordSpan.textContent = wordData.word;

    var phoneticSpan = document.createElement('span');
    phoneticSpan.className = 'phonetic-text';
    phoneticSpan.textContent = wordData.phonetic || '';

    var posSpan = document.createElement('span');
    posSpan.className = 'pos-text';
    posSpan.textContent = wordData.partOfSpeech || '';

    var meaningSpan = document.createElement('span');
    meaningSpan.className = 'meaning-text';
    meaningSpan.textContent = wordData.meaning;

    info.appendChild(wordSpan);
    info.appendChild(phoneticSpan);
    info.appendChild(posSpan);
    info.appendChild(meaningSpan);

    var actions = document.createElement('div');
    actions.className = 'custom-word-actions';

    var speakBtn = document.createElement('button');
    speakBtn.className = 'btn-icon';
    speakBtn.innerHTML = '🔊';
    speakBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      TTS.speak(wordData.word);
    });

    var editBtn = document.createElement('button');
    editBtn.className = 'btn-icon';
    editBtn.innerHTML = '✏️';
    editBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showCustomWordForm(container, wordData);
    });

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon btn-icon-danger';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (confirm('确定要删除 "' + wordData.word + '" 吗？')) {
        VocabStorage.deleteCustomWord(wordData.id).then(function() {
          renderCustomList(container);
        });
      }
    });

    actions.appendChild(speakBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(info);
    card.appendChild(actions);

    card.addEventListener('click', function() {
      App.showWordDetail(wordData);
    });

    return card;
  }

  /**
   * 显示自定义单词表单
   */
  function showCustomWordForm(container, editData) {
    var isEdit = editData !== null;

    var modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.addEventListener('click', function(e) {
      if (e.target === modal) document.body.removeChild(modal);
    });

    var form = document.createElement('div');
    form.className = 'modal-content custom-word-form';

    var title = document.createElement('h3');
    title.textContent = isEdit ? '编辑单词' : '添加单词';
    form.appendChild(title);

    var fields = [
      { key: 'word', label: '英文单词 *', type: 'text', placeholder: '例如：apple' },
      { key: 'phonetic', label: '音标', type: 'text', placeholder: '联网自动填充' },
      { key: 'partOfSpeech', label: '词性', type: 'text', placeholder: '联网自动填充' },
      { key: 'meaning', label: '中文释义 *', type: 'text', placeholder: '例如：苹果' },
      { key: 'example', label: '例句', type: 'text', placeholder: '联网自动填充' }
    ];

    var inputEls = {};
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var label = document.createElement('label');
      label.textContent = field.label;
      label.className = 'form-label';
      form.appendChild(label);

      var input = document.createElement('input');
      input.type = field.type;
      input.className = 'form-input';
      input.placeholder = field.placeholder;
      if (isEdit && editData[field.key]) {
        input.value = editData[field.key];
      }
      form.appendChild(input);
      inputEls[field.key] = input;
    }

    // 联网查询按钮
    var fetchBtn = document.createElement('button');
    fetchBtn.className = 'btn-secondary btn-fetch-info';
    fetchBtn.textContent = '🌐 联网自动填写音标/词性/例句';
    fetchBtn.addEventListener('click', function() {
      var wordVal = inputEls.word.value.trim();
      if (!wordVal) { alert('请先填写英文单词'); return; }
      fetchBtn.textContent = '查询中...';
      fetchBtn.disabled = true;
      VocabImporter.lookupWord(wordVal).then(function(info) {
        if (info.phonetic) inputEls.phonetic.value = info.phonetic;
        if (info.partOfSpeech) inputEls.partOfSpeech.value = info.partOfSpeech;
        if (info.example) inputEls.example.value = info.example;
        fetchBtn.textContent = '✅ 查询完成';
        fetchBtn.disabled = false;
      }).catch(function() {
        fetchBtn.textContent = '❌ 查询失败，请手动填写';
        fetchBtn.disabled = false;
      });
    });
    form.appendChild(fetchBtn);

    var btnGroup = document.createElement('div');
    btnGroup.className = 'form-btn-group';

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn-secondary';
    cancelBtn.textContent = '取消';
    cancelBtn.addEventListener('click', function() { document.body.removeChild(modal); });

    var saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary';
    saveBtn.textContent = '保存';
    saveBtn.addEventListener('click', function() {
      var wordVal = inputEls.word.value.trim();
      var meaningVal = inputEls.meaning.value.trim();

      if (!wordVal || !meaningVal) {
        alert('请至少填写英文单词和中文释义！');
        return;
      }

      var wordObj = {
        word: wordVal,
        phonetic: inputEls.phonetic.value.trim(),
        partOfSpeech: inputEls.partOfSpeech.value.trim(),
        meaning: meaningVal,
        example: inputEls.example.value.trim()
      };

      if (isEdit) {
        wordObj.id = editData.id;
        wordObj.createdAt = editData.createdAt;
        VocabStorage.updateCustomWord(wordObj).then(function() {
          document.body.removeChild(modal);
          renderCustomList(container);
        });
      } else {
        VocabStorage.addCustomWord(wordObj).then(function() {
          document.body.removeChild(modal);
          renderCustomList(container);
        });
      }
    });

    btnGroup.appendChild(cancelBtn);
    btnGroup.appendChild(saveBtn);
    form.appendChild(btnGroup);

    modal.appendChild(form);
    document.body.appendChild(modal);
  }

  /**
   * 获取指定词库组的单词（用于背诵）
   * @param {Object} group
   * @returns {Object[]}
   */
  function getGroupWordsForStudy(group) {
    var words = group.words || [];
    return words.map(function(w) {
      return {
        word: w.word,
        phonetic: w.phonetic || '',
        partOfSpeech: w.partOfSpeech || '',
        meaning: w.meaning || '',
        example: w.example || '',
        grade: group.grade || 0,
        semester: group.semester || '',
        unit: group.unit || 0,
        groupId: group.id,
        groupTitle: group.title
      };
    });
  }

  /**
   * 获取自定义词库的所有单词（用于背诵）
   * @returns {Promise<Object[]>}
   */
  function getCustomWordsForStudy() {
    return VocabStorage.getAllCustomWords().then(function(words) {
      return words.map(function(w) {
        return {
          word: w.word,
          phonetic: w.phonetic || '',
          partOfSpeech: w.partOfSpeech || '',
          meaning: w.meaning,
          example: w.example || '',
          grade: 0,
          unit: 0
        };
      });
    });
  }

  /**
   * 联网补全词库组中缺少词性/例句的单词
   * @param {Object} group - 词库组
   * @param {HTMLElement} listContainer - 用于刷新的父容器
   */
  function enrichGroupWords(group, listContainer) {
    var words = group.words || [];
    // 找出缺少词性和例句的单词
    var needEnrich = words.filter(function(w) {
      return !w.partOfSpeech || !w.example;
    });

    if (needEnrich.length === 0) {
      alert('该词库所有单词信息已完整，无需补全！');
      return;
    }

    // 弹出进度弹窗
    var modal = document.createElement('div');
    modal.className = 'modal-overlay';

    var content = document.createElement('div');
    content.className = 'modal-content enrich-modal';

    var title = document.createElement('h3');
    title.className = 'enrich-modal-title';
    title.textContent = '🌐 联网补全词性/例句';

    var infoEl = document.createElement('div');
    infoEl.className = 'enrich-info';
    infoEl.textContent = '需要补全 ' + needEnrich.length + ' 个单词...';

    var progressBar = document.createElement('div');
    progressBar.className = 'lookup-progress-bar';
    var progressInner = document.createElement('div');
    progressInner.className = 'lookup-progress-inner';
    progressInner.style.width = '0%';
    progressBar.appendChild(progressInner);

    var progressText = document.createElement('div');
    progressText.className = 'enrich-progress-text';
    progressText.textContent = '准备查询...';

    var currentWordEl = document.createElement('div');
    currentWordEl.className = 'enrich-current-word';

    content.appendChild(title);
    content.appendChild(infoEl);
    content.appendChild(progressBar);
    content.appendChild(progressText);
    content.appendChild(currentWordEl);
    modal.appendChild(content);
    document.body.appendChild(modal);

    // 逐个查询补全
    var enriched = 0;
    var failed = 0;
    var index = 0;

    function processNext() {
      if (index >= needEnrich.length) {
        // 完成，保存并关闭
        VocabStorage.updateVocabGroup(group).then(function() {
          progressText.textContent = '补全完成！成功 ' + enriched + ' 个，失败 ' + failed + ' 个';
          currentWordEl.textContent = '';

          var closeBtn = document.createElement('button');
          closeBtn.className = 'btn-primary';
          closeBtn.textContent = '确定';
          closeBtn.style.marginTop = '16px';
          closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
            renderMyVocab(listContainer);
          });
          content.appendChild(closeBtn);
        });
        return;
      }

      var w = needEnrich[index];
      index++;
      var pct = Math.round((index / needEnrich.length) * 100);
      progressInner.style.width = pct + '%';
      progressText.textContent = '查询中 ' + index + ' / ' + needEnrich.length;
      currentWordEl.textContent = '🔍 ' + w.word;

      VocabImporter.lookupWord(w.word).then(function(detail) {
        if (detail.partOfSpeech) {
          w.partOfSpeech = detail.partOfSpeech;
        }
        if (detail.phonetic && !w.phonetic) {
          w.phonetic = detail.phonetic;
        }
        if (detail.example) {
          w.example = detail.example;
        }
        enriched++;
        setTimeout(processNext, 120);
      }).catch(function() {
        failed++;
        setTimeout(processNext, 120);
      });
    }

    processNext();
  }

  return {
    renderMyVocab: renderMyVocab,
    renderCustomList: renderCustomList,
    getGroupWordsForStudy: getGroupWordsForStudy,
    getCustomWordsForStudy: getCustomWordsForStudy,
    showGroupDetail: showGroupDetail,
    enrichGroupWords: enrichGroupWords
  };
})();
