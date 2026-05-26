/**
 * 译林版小学英语 3-6年级上下册 内置词库
 * 按年级+学期(上册/下册)+单元组织
 * 8册书，60+单元，500+单词
 */
var VOCAB_DATA = [
  // ========== 三年级上册 (3A) ==========
  { grade: 3, semester: '上册', units: [
    { unit: 1, title: 'Hello!', words: [
      { word: 'hello', phonetic: '/həˈləʊ/', partOfSpeech: 'int.', meaning: '你好', example: 'Hello, how are you?' },
      { word: 'hi', phonetic: '/haɪ/', partOfSpeech: 'int.', meaning: '嗨；你好', example: 'Hi, my name is Tom.' },
      { word: 'good morning', phonetic: '/gʊd ˈmɔːnɪŋ/', partOfSpeech: '', meaning: '早上好', example: 'Good morning, class!' },
      { word: 'Miss', phonetic: '/mɪs/', partOfSpeech: 'n.', meaning: '小姐', example: 'Hello, Miss Li.' },
      { word: 'good afternoon', phonetic: '/gʊd ˌɑːftəˈnuːn/', partOfSpeech: '', meaning: '下午好', example: 'Good afternoon, class.' },
      { word: 'class', phonetic: '/klɑːs/', partOfSpeech: 'n.', meaning: '同学们；班级', example: 'Good morning, class!' },
      { word: 'I', phonetic: '/aɪ/', partOfSpeech: 'pron.', meaning: '我', example: 'I am Liu Tao.' },
      { word: "I'm", phonetic: '/aɪm/', partOfSpeech: '', meaning: '我是', example: "I'm Liu Tao." },
      { word: 'cat', phonetic: '/kæt/', partOfSpeech: 'n.', meaning: '猫', example: 'It is a cat.' }
    ]},
    { unit: 2, title: "I'm Liu Tao", words: [
      { word: 'are', phonetic: '/ɑː/', partOfSpeech: 'v.', meaning: '是', example: 'Are you Wang Bing?' },
      { word: 'you', phonetic: '/juː/', partOfSpeech: 'pron.', meaning: '你；你们', example: 'Are you Liu Tao?' },
      { word: 'yes', phonetic: '/jes/', partOfSpeech: 'adv.', meaning: '是的', example: 'Yes, I am.' },
      { word: 'am', phonetic: '/æm/', partOfSpeech: 'v.', meaning: '是', example: 'I am Mike.' },
      { word: 'no', phonetic: '/nəʊ/', partOfSpeech: 'adv.', meaning: '不；不是', example: 'No, I am not.' },
      { word: 'not', phonetic: '/nɒt/', partOfSpeech: 'adv.', meaning: '不', example: 'I am not Liu Tao.' },
      { word: 'goodbye', phonetic: '/gʊdˈbaɪ/', partOfSpeech: 'int.', meaning: '再见', example: 'Goodbye, class!' },
      { word: 'what', phonetic: '/wɒt/', partOfSpeech: 'pron.', meaning: '什么', example: 'What is your name?' },
      { word: 'is', phonetic: '/ɪz/', partOfSpeech: 'v.', meaning: '是', example: 'What is this?' },
      { word: "what's", phonetic: '/wɒts/', partOfSpeech: '', meaning: '什么是', example: "What's your name?" },
      { word: 'your', phonetic: '/jɔː/', partOfSpeech: 'pron.', meaning: '你的', example: 'What is your name?' },
      { word: 'name', phonetic: '/neɪm/', partOfSpeech: 'n.', meaning: '名字', example: 'My name is Yang Ling.' },
      { word: 'my', phonetic: '/maɪ/', partOfSpeech: 'pron.', meaning: '我的', example: 'My name is Mike.' },
      { word: 'boy', phonetic: '/bɔɪ/', partOfSpeech: 'n.', meaning: '男孩', example: 'He is a boy.' },
      { word: 'girl', phonetic: '/ɡɜːl/', partOfSpeech: 'n.', meaning: '女孩', example: 'She is a girl.' },
      { word: 'Mr', phonetic: '/ˈmɪstə/', partOfSpeech: 'n.', meaning: '先生', example: 'Hello, Mr Green.' }
    ]},
    { unit: 3, title: 'My friends', words: [
      { word: 'friend', phonetic: '/frend/', partOfSpeech: 'n.', meaning: '朋友', example: 'She is my friend.' },
      { word: 'she', phonetic: '/ʃiː/', partOfSpeech: 'pron.', meaning: '她', example: "She's Yang Ling." },
      { word: "she's", phonetic: '/ʃiːz/', partOfSpeech: '', meaning: '她是', example: "She's my friend." },
      { word: 'he', phonetic: '/hiː/', partOfSpeech: 'pron.', meaning: '他', example: "He's Liu Tao." },
      { word: "he's", phonetic: '/hiːz/', partOfSpeech: '', meaning: '他是', example: "He's my friend." },
      { word: 'this', phonetic: '/ðɪs/', partOfSpeech: 'pron.', meaning: '这个', example: 'This is my friend.' },
      { word: 'sister', phonetic: '/ˈsɪstə/', partOfSpeech: 'n.', meaning: '姐妹', example: 'This is my sister.' },
      { word: 'but', phonetic: '/bʌt/', partOfSpeech: 'conj.', meaning: '但是', example: "She's my sister, but she's not my friend." },
      { word: 'sorry', phonetic: '/ˈsɒri/', partOfSpeech: 'adj.', meaning: '对不起', example: "Sorry, I don't know." },
      { word: "you're", phonetic: '/jʊə/', partOfSpeech: '', meaning: '你是', example: "You're my friend." },
      { word: 'we', phonetic: '/wiː/', partOfSpeech: 'pron.', meaning: '我们', example: 'We are friends.' },
      { word: 'right', phonetic: '/raɪt/', partOfSpeech: 'adj.', meaning: '对的；正确的', example: 'You are right.' }
    ]},
    { unit: 4, title: 'My family', words: [
      { word: 'family', phonetic: '/ˈfæməli/', partOfSpeech: 'n.', meaning: '家庭', example: 'This is my family.' },
      { word: 'father', phonetic: '/ˈfɑːðə/', partOfSpeech: 'n.', meaning: '父亲', example: 'This is my father.' },
      { word: 'mother', phonetic: '/ˈmʌðə/', partOfSpeech: 'n.', meaning: '母亲', example: 'This is my mother.' },
      { word: 'brother', phonetic: '/ˈbrʌðə/', partOfSpeech: 'n.', meaning: '兄弟', example: 'This is my brother.' },
      { word: 'me', phonetic: '/miː/', partOfSpeech: 'pron.', meaning: '我', example: 'Look at me!' },
      { word: 'grandpa', phonetic: '/ˈɡrænpɑː/', partOfSpeech: 'n.', meaning: '祖父；外公', example: 'This is my grandpa.' },
      { word: 'grandma', phonetic: '/ˈɡrænmɑː/', partOfSpeech: 'n.', meaning: '祖母；外婆', example: 'This is my grandma.' },
      { word: 'good evening', phonetic: '/gʊd ˈiːvnɪŋ/', partOfSpeech: '', meaning: '晚上好', example: 'Good evening, Mr Green.' },
      { word: 'it', phonetic: '/ɪt/', partOfSpeech: 'pron.', meaning: '它', example: "It's a cat." },
      { word: "it's", phonetic: '/ɪts/', partOfSpeech: '', meaning: '它是', example: "It's nice." },
      { word: 'good', phonetic: '/ɡʊd/', partOfSpeech: 'adj.', meaning: '好的', example: 'Good evening!' },
      { word: 'thank you', phonetic: '/θæŋk juː/', partOfSpeech: '', meaning: '谢谢', example: 'Thank you!' }
    ]},
    { unit: 5, title: 'Look at me!', words: [
      { word: 'look at', phonetic: '/lʊk æt/', partOfSpeech: '', meaning: '看；看着', example: 'Look at my T-shirt.' },
      { word: 'T-shirt', phonetic: '/ˈtiːʃɜːt/', partOfSpeech: 'n.', meaning: 'T恤衫', example: 'Look at my T-shirt.' },
      { word: 'nice', phonetic: '/naɪs/', partOfSpeech: 'adj.', meaning: '好看的；好的', example: "It's nice!" },
      { word: 'skirt', phonetic: '/skɜːt/', partOfSpeech: 'n.', meaning: '裙子', example: 'Look at my skirt.' },
      { word: 'how nice', phonetic: '/haʊ naɪs/', partOfSpeech: '', meaning: '真好看', example: 'How nice!' },
      { word: 'cap', phonetic: '/kæp/', partOfSpeech: 'n.', meaning: '便帽', example: 'Look at my cap.' },
      { word: 'great', phonetic: '/ɡreɪt/', partOfSpeech: 'adj.', meaning: '好极了；伟大的', example: "It's great!" },
      { word: 'jacket', phonetic: '/ˈdʒækɪt/', partOfSpeech: 'n.', meaning: '夹克衫', example: 'Look at my jacket.' },
      { word: 'new', phonetic: '/njuː/', partOfSpeech: 'adj.', meaning: '新的', example: "It's new!" },
      { word: 'red', phonetic: '/red/', partOfSpeech: 'adj.', meaning: '红色的', example: 'My cap is red.' }
    ]},
    { unit: 6, title: 'Colours', words: [
      { word: 'colour', phonetic: '/ˈkʌlə/', partOfSpeech: 'n.', meaning: '颜色', example: 'What colour is it?' },
      { word: 'orange', phonetic: '/ˈɒrɪndʒ/', partOfSpeech: 'adj.', meaning: '橙色的', example: 'It is orange.' },
      { word: 'now', phonetic: '/naʊ/', partOfSpeech: 'adv.', meaning: '现在', example: 'What colour is it now?' },
      { word: 'green', phonetic: '/ɡriːn/', partOfSpeech: 'adj.', meaning: '绿色的', example: 'It is green.' },
      { word: 'yellow', phonetic: '/ˈjeləʊ/', partOfSpeech: 'adj.', meaning: '黄色的', example: 'It is yellow.' },
      { word: 'black', phonetic: '/blæk/', partOfSpeech: 'adj.', meaning: '黑色的', example: 'It is black.' },
      { word: 'blue', phonetic: '/bluː/', partOfSpeech: 'adj.', meaning: '蓝色的', example: 'It is blue.' },
      { word: 'brown', phonetic: '/braʊn/', partOfSpeech: 'adj.', meaning: '棕色的', example: 'It is brown.' },
      { word: 'white', phonetic: '/waɪt/', partOfSpeech: 'adj.', meaning: '白色的', example: 'It is white.' },
      { word: 'egg', phonetic: '/eɡ/', partOfSpeech: 'n.', meaning: '鸡蛋', example: 'Would you like an egg?' },
      { word: 'or', phonetic: '/ɔː/', partOfSpeech: 'conj.', meaning: '或者', example: 'An orange egg or a yellow egg?' }
    ]},
    { unit: 7, title: 'Would you like a pie?', words: [
      { word: 'pie', phonetic: '/paɪ/', partOfSpeech: 'n.', meaning: '馅饼', example: 'Would you like a pie?' },
      { word: 'cake', phonetic: '/keɪk/', partOfSpeech: 'n.', meaning: '蛋糕', example: 'Would you like a cake?' },
      { word: 'ice cream', phonetic: '/aɪs kriːm/', partOfSpeech: 'n.', meaning: '冰淇淋', example: 'Would you like an ice cream?' },
      { word: 'sweet', phonetic: '/swiːt/', partOfSpeech: 'n.', meaning: '糖果', example: 'Would you like a sweet?' },
      { word: 'hot dog', phonetic: '/hɒt dɒɡ/', partOfSpeech: 'n.', meaning: '热狗', example: 'Would you like a hot dog?' },
      { word: 'look', phonetic: '/lʊk/', partOfSpeech: 'v.', meaning: '看', example: 'Look! A hot dog!' }
    ]},
    { unit: 8, title: 'Happy New Year!', words: [
      { word: 'happy', phonetic: '/ˈhæpi/', partOfSpeech: 'adj.', meaning: '快乐的', example: 'Happy New Year!' },
      { word: 'New Year', phonetic: '/njuː jɪə/', partOfSpeech: 'n.', meaning: '新年', example: 'Happy New Year!' },
      { word: 'uncle', phonetic: '/ˈʌŋkl/', partOfSpeech: 'n.', meaning: '叔伯舅', example: 'This is my uncle.' },
      { word: 'this is for you', phonetic: '', partOfSpeech: '', meaning: '这是给你的', example: 'This is for you!' },
      { word: 'for', phonetic: '/fɔː/', partOfSpeech: 'prep.', meaning: '给；为', example: 'This is for you.' }
    ]}
  ]},

  // ========== 三年级下册 (3B) ==========
  { grade: 3, semester: '下册', units: [
    { unit: 1, title: 'In class', words: [
      { word: 'in class', phonetic: '/ɪn klɑːs/', partOfSpeech: '', meaning: '在上课', example: "We're in class." },
      { word: 'stand up', phonetic: '/stænd ʌp/', partOfSpeech: '', meaning: '起立', example: 'Stand up, please.' },
      { word: 'sit down', phonetic: '/sɪt daʊn/', partOfSpeech: '', meaning: '坐下', example: 'Sit down, please.' },
      { word: 'please', phonetic: '/pliːz/', partOfSpeech: 'adv.', meaning: '请', example: 'Open the door, please.' },
      { word: 'open', phonetic: '/ˈəʊpən/', partOfSpeech: 'v.', meaning: '打开', example: 'Open the door.' },
      { word: 'the', phonetic: '/ðə/', partOfSpeech: 'art.', meaning: '这；那', example: 'Open the window.' },
      { word: 'door', phonetic: '/dɔː/', partOfSpeech: 'n.', meaning: '门', example: 'Close the door.' },
      { word: 'come in', phonetic: '/kʌm ɪn/', partOfSpeech: '', meaning: '进来', example: 'Come in, please.' },
      { word: 'close', phonetic: '/kləʊz/', partOfSpeech: 'v.', meaning: '关上', example: 'Close the window.' },
      { word: 'window', phonetic: '/ˈwɪndəʊ/', partOfSpeech: 'n.', meaning: '窗户', example: 'Open the window.' },
      { word: 'blackboard', phonetic: '/ˈblækbɔːd/', partOfSpeech: 'n.', meaning: '黑板', example: 'Look at the blackboard.' },
      { word: 'book', phonetic: '/bʊk/', partOfSpeech: 'n.', meaning: '书', example: 'Open your book.' },
      { word: 'rubber', phonetic: '/ˈrʌbə/', partOfSpeech: 'n.', meaning: '橡皮', example: 'This is my rubber.' },
      { word: 'listen to', phonetic: '/ˈlɪsn tuː/', partOfSpeech: '', meaning: '听', example: 'Listen to me.' },
      { word: 'parrot', phonetic: '/ˈpærət/', partOfSpeech: 'n.', meaning: '鹦鹉', example: "Don't listen to the parrot." }
    ]},
    { unit: 2, title: 'In the library', words: [
      { word: 'library', phonetic: '/ˈlaɪbrəri/', partOfSpeech: 'n.', meaning: '图书馆', example: "I'm in the library." },
      { word: 'shout', phonetic: '/ʃaʊt/', partOfSpeech: 'v.', meaning: '喊叫', example: "Don't shout." },
      { word: 'run', phonetic: '/rʌn/', partOfSpeech: 'v.', meaning: '跑', example: "Don't run." },
      { word: 'eat', phonetic: '/iːt/', partOfSpeech: 'v.', meaning: '吃', example: "Don't eat here." },
      { word: 'here', phonetic: '/hɪə/', partOfSpeech: 'adv.', meaning: '这里', example: "Don't eat here." },
      { word: 'talk', phonetic: '/tɔːk/', partOfSpeech: 'v.', meaning: '说话', example: "Don't talk." },
      { word: 'sleep', phonetic: '/sliːp/', partOfSpeech: 'v.', meaning: '睡觉', example: "Don't sleep." },
      { word: 'drink', phonetic: '/drɪŋk/', partOfSpeech: 'v.', meaning: '喝', example: "Don't drink here." },
      { word: 'milk', phonetic: '/mɪlk/', partOfSpeech: 'n.', meaning: '牛奶', example: 'I want some milk.' },
      { word: 'English', phonetic: '/ˈɪŋɡlɪʃ/', partOfSpeech: 'n.', meaning: '英语', example: 'I like English.' }
    ]},
    { unit: 3, title: 'Is this your pencil?', words: [
      { word: 'pencil', phonetic: '/ˈpensl/', partOfSpeech: 'n.', meaning: '铅笔', example: 'Is this your pencil?' },
      { word: 'schoolbag', phonetic: '/ˈskuːlbæɡ/', partOfSpeech: 'n.', meaning: '书包', example: 'Is that your schoolbag?' },
      { word: 'pen', phonetic: '/pen/', partOfSpeech: 'n.', meaning: '钢笔', example: 'This is my pen.' },
      { word: 'crayon', phonetic: '/ˈkreɪən/', partOfSpeech: 'n.', meaning: '蜡笔', example: 'Is this your crayon?' },
      { word: 'ruler', phonetic: '/ˈruːlə/', partOfSpeech: 'n.', meaning: '尺子', example: 'This is a ruler.' },
      { word: 'pencil case', phonetic: '/ˈpensl keɪs/', partOfSpeech: 'n.', meaning: '铅笔盒', example: 'Where is my pencil case?' },
      { word: 'lunch box', phonetic: '/lʌntʃ bɒks/', partOfSpeech: 'n.', meaning: '午餐盒', example: 'This is my lunch box.' },
      { word: 'where', phonetic: '/weə/', partOfSpeech: 'adv.', meaning: '在哪里', example: 'Where is my pen?' },
      { word: 'over there', phonetic: '/ˈəʊvə ðeə/', partOfSpeech: '', meaning: '在那里', example: "It's over there." }
    ]},
    { unit: 4, title: "Where's the bird?", words: [
      { word: 'bird', phonetic: '/bɜːd/', partOfSpeech: 'n.', meaning: '鸟', example: "Where's the bird?" },
      { word: 'beautiful', phonetic: '/ˈbjuːtɪfl/', partOfSpeech: 'adj.', meaning: '漂亮的', example: 'How beautiful!' },
      { word: 'under', phonetic: '/ˈʌndə/', partOfSpeech: 'prep.', meaning: '在…下面', example: "It's under the desk." },
      { word: 'desk', phonetic: '/desk/', partOfSpeech: 'n.', meaning: '课桌', example: "It's on the desk." },
      { word: 'behind', phonetic: '/bɪˈhaɪnd/', partOfSpeech: 'prep.', meaning: '在…后面', example: "It's behind the door." },
      { word: 'on', phonetic: '/ɒn/', partOfSpeech: 'prep.', meaning: '在…上面', example: "It's on the chair." },
      { word: 'chair', phonetic: '/tʃeə/', partOfSpeech: 'n.', meaning: '椅子', example: "It's on the chair." },
      { word: 'tree', phonetic: '/triː/', partOfSpeech: 'n.', meaning: '树', example: "It's in the tree." },
      { word: 'guess', phonetic: '/ɡes/', partOfSpeech: 'v.', meaning: '猜', example: 'Guess!' },
      { word: 'one', phonetic: '/wʌn/', partOfSpeech: 'num.', meaning: '一', example: 'One, two, three!' },
      { word: 'two', phonetic: '/tuː/', partOfSpeech: 'num.', meaning: '二', example: 'I have two birds.' },
      { word: 'three', phonetic: '/θriː/', partOfSpeech: 'num.', meaning: '三', example: 'Three birds!' },
      { word: 'wow', phonetic: '/waʊ/', partOfSpeech: 'int.', meaning: '哇', example: 'Wow, how beautiful!' }
    ]},
    { unit: 5, title: 'How old are you?', words: [
      { word: 'lovely', phonetic: '/ˈlʌvli/', partOfSpeech: 'adj.', meaning: '可爱的', example: 'How lovely!' },
      { word: 'nine', phonetic: '/naɪn/', partOfSpeech: 'num.', meaning: '九', example: "I'm nine." },
      { word: 'eight', phonetic: '/eɪt/', partOfSpeech: 'num.', meaning: '八', example: "I'm eight." },
      { word: 'four', phonetic: '/fɔː/', partOfSpeech: 'num.', meaning: '四', example: 'Four cats.' },
      { word: 'five', phonetic: '/faɪv/', partOfSpeech: 'num.', meaning: '五', example: 'I have five pens.' },
      { word: 'six', phonetic: '/sɪks/', partOfSpeech: 'num.', meaning: '六', example: "I'm six." },
      { word: 'seven', phonetic: '/ˈsevn/', partOfSpeech: 'num.', meaning: '七', example: "I'm seven." },
      { word: 'ten', phonetic: '/ten/', partOfSpeech: 'num.', meaning: '十', example: "I'm ten." },
      { word: 'want', phonetic: '/wɒnt/', partOfSpeech: 'v.', meaning: '想要', example: 'I want a cake.' }
    ]},
    { unit: 6, title: 'What time is it?', words: [
      { word: 'what time', phonetic: '/wɒt taɪm/', partOfSpeech: '', meaning: '几点了', example: 'What time is it?' },
      { word: 'wake up', phonetic: '/weɪk ʌp/', partOfSpeech: '', meaning: '醒来', example: 'Wake up, Taotao!' },
      { word: 'mum', phonetic: '/mʌm/', partOfSpeech: 'n.', meaning: '妈妈', example: 'Mum, what time is it?' },
      { word: "o'clock", phonetic: "/ə'klɒk/", partOfSpeech: 'adv.', meaning: '…点钟', example: "It's seven o'clock." },
      { word: 'breakfast', phonetic: '/ˈbrekfəst/', partOfSpeech: 'n.', meaning: '早餐', example: "It's time for breakfast." },
      { word: 'hurry up', phonetic: '/ˈhʌri ʌp/', partOfSpeech: '', meaning: '快点', example: 'Hurry up!' },
      { word: 'dinner', phonetic: '/ˈdɪnə/', partOfSpeech: 'n.', meaning: '晚餐', example: "It's time for dinner." },
      { word: 'bed', phonetic: '/bed/', partOfSpeech: 'n.', meaning: '床', example: "It's time for bed." },
      { word: 'lunch', phonetic: '/lʌntʃ/', partOfSpeech: 'n.', meaning: '午餐', example: "It's time for lunch." },
      { word: 'eleven', phonetic: '/ɪˈlevən/', partOfSpeech: 'num.', meaning: '十一', example: "It's eleven o'clock." },
      { word: 'twelve', phonetic: '/twelv/', partOfSpeech: 'num.', meaning: '十二', example: "It's twelve o'clock." },
      { word: 'bag', phonetic: '/bæɡ/', partOfSpeech: 'n.', meaning: '包', example: 'Where is my bag?' }
    ]},
    { unit: 7, title: 'On the farm', words: [
      { word: 'farm', phonetic: '/fɑːm/', partOfSpeech: 'n.', meaning: '农场', example: "Let's go to the farm." },
      { word: 'welcome', phonetic: '/ˈwelkəm/', partOfSpeech: 'v.', meaning: '欢迎', example: 'Welcome to my farm.' },
      { word: 'they', phonetic: '/ðeɪ/', partOfSpeech: 'pron.', meaning: '他们', example: 'What are these? They are pigs.' },
      { word: 'pig', phonetic: '/pɪɡ/', partOfSpeech: 'n.', meaning: '猪', example: 'These are pigs.' },
      { word: 'those', phonetic: '/ðəʊz/', partOfSpeech: 'pron.', meaning: '那些', example: 'What are those?' },
      { word: 'cow', phonetic: '/kaʊ/', partOfSpeech: 'n.', meaning: '奶牛', example: 'Those are cows.' },
      { word: 'apple', phonetic: '/ˈæpl/', partOfSpeech: 'n.', meaning: '苹果', example: 'These are apples.' },
      { word: 'pear', phonetic: '/peə/', partOfSpeech: 'n.', meaning: '梨', example: 'Those are pears.' },
      { word: 'chicken', phonetic: '/ˈtʃɪkɪn/', partOfSpeech: 'n.', meaning: '鸡', example: 'These are chickens.' },
      { word: 'duck', phonetic: '/dʌk/', partOfSpeech: 'n.', meaning: '鸭子', example: 'Those are ducks.' },
      { word: 'orange', phonetic: '/ˈɒrɪndʒ/', partOfSpeech: 'n.', meaning: '橙子', example: 'These are oranges.' },
      { word: 'picture', phonetic: '/ˈpɪktʃə/', partOfSpeech: 'n.', meaning: '图画', example: 'It is a picture.' },
      { word: 'who', phonetic: '/huː/', partOfSpeech: 'pron.', meaning: '谁', example: 'Who is he?' }
    ]},
    { unit: 8, title: "We're twins!", words: [
      { word: 'twin', phonetic: '/twɪn/', partOfSpeech: 'n.', meaning: '双胞胎', example: "We're twins!" },
      { word: 'aunt', phonetic: '/ɑːnt/', partOfSpeech: 'n.', meaning: '姑姨婶舅母', example: 'This is my aunt.' },
      { word: 'man', phonetic: '/mæn/', partOfSpeech: 'n.', meaning: '男人', example: 'Who is that man?' },
      { word: 'woman', phonetic: '/ˈwʊmən/', partOfSpeech: 'n.', meaning: '女人', example: 'Who is that woman?' },
      { word: 'baby', phonetic: '/ˈbeɪbi/', partOfSpeech: 'n.', meaning: '婴儿', example: 'The baby is lovely.' },
      { word: 'cousin', phonetic: '/ˈkʌzn/', partOfSpeech: 'n.', meaning: '堂表兄弟姐妹', example: 'This is my cousin.' }
    ]}
  ]},

  // ========== 四年级上册 (4A) ==========
  { grade: 4, semester: '上册', units: [
    { unit: 1, title: 'I like dogs', words: [
      { word: 'like', phonetic: '/laɪk/', partOfSpeech: 'v.', meaning: '喜欢', example: 'I like dogs.' },
      { word: 'dog', phonetic: '/dɒɡ/', partOfSpeech: 'n.', meaning: '狗', example: 'Do you like dogs?' },
      { word: 'animal', phonetic: '/ˈænɪml/', partOfSpeech: 'n.', meaning: '动物', example: 'I like animals.' },
      { word: 'cat', phonetic: '/kæt/', partOfSpeech: 'n.', meaning: '猫', example: 'I like cats.' },
      { word: 'cute', phonetic: '/kjuːt/', partOfSpeech: 'adj.', meaning: '可爱的', example: 'They are cute.' },
      { word: 'panda', phonetic: '/ˈpændə/', partOfSpeech: 'n.', meaning: '熊猫', example: 'I like pandas.' },
      { word: 'fat', phonetic: '/fæt/', partOfSpeech: 'adj.', meaning: '胖的', example: 'This panda is fat.' },
      { word: 'elephant', phonetic: '/ˈelɪfənt/', partOfSpeech: 'n.', meaning: '大象', example: 'Do you like elephants?' },
      { word: 'horse', phonetic: '/hɔːs/', partOfSpeech: 'n.', meaning: '马', example: 'I like horses.' },
      { word: 'lion', phonetic: '/ˈlaɪən/', partOfSpeech: 'n.', meaning: '狮子', example: 'Look at the lion.' },
      { word: 'monkey', phonetic: '/ˈmʌŋki/', partOfSpeech: 'n.', meaning: '猴子', example: 'I like monkeys.' },
      { word: 'tiger', phonetic: '/ˈtaɪɡə/', partOfSpeech: 'n.', meaning: '老虎', example: 'Do you like tigers?' },
      { word: 'have', phonetic: '/hæv/', partOfSpeech: 'v.', meaning: '有', example: 'I have a dog.' }
    ]},
    { unit: 2, title: "Let's make a fruit salad", words: [
      { word: 'make', phonetic: '/meɪk/', partOfSpeech: 'v.', meaning: '制作', example: "Let's make a fruit salad." },
      { word: 'fruit', phonetic: '/fruːt/', partOfSpeech: 'n.', meaning: '水果', example: 'I like fruit.' },
      { word: 'salad', phonetic: '/ˈsæləd/', partOfSpeech: 'n.', meaning: '沙拉', example: 'A fruit salad!' },
      { word: 'pineapple', phonetic: '/ˈpaɪnæpl/', partOfSpeech: 'n.', meaning: '菠萝', example: 'Do you have a pineapple?' },
      { word: 'mango', phonetic: '/ˈmæŋɡəʊ/', partOfSpeech: 'n.', meaning: '芒果', example: 'I have a mango.' },
      { word: 'any', phonetic: '/ˈeni/', partOfSpeech: 'pron.', meaning: '一些（疑问/否定）', example: 'Do you have any bananas?' },
      { word: 'banana', phonetic: '/bəˈnɑːnə/', partOfSpeech: 'n.', meaning: '香蕉', example: 'I have some bananas.' },
      { word: 'some', phonetic: '/sʌm/', partOfSpeech: 'pron.', meaning: '一些（肯定）', example: 'I have some grapes.' },
      { word: 'grape', phonetic: '/ɡreɪp/', partOfSpeech: 'n.', meaning: '葡萄', example: 'I like grapes.' },
      { word: 'thanks', phonetic: '/θæŋks/', partOfSpeech: 'int.', meaning: '谢谢', example: 'No, thanks.' },
      { word: 'our', phonetic: '/aʊə/', partOfSpeech: 'pron.', meaning: '我们的', example: 'Look at our fruit salad!' },
      { word: 'cool', phonetic: '/kuːl/', partOfSpeech: 'adj.', meaning: '酷的', example: 'How cool!' }
    ]},
    { unit: 3, title: 'How many?', words: [
      { word: 'thirteen', phonetic: '/ˌθɜːˈtiːn/', partOfSpeech: 'num.', meaning: '十三', example: 'I have thirteen stickers.' },
      { word: 'sticker', phonetic: '/ˈstɪkə/', partOfSpeech: 'n.', meaning: '贴纸', example: 'Look at my stickers.' },
      { word: 'can', phonetic: '/kæn/', partOfSpeech: 'v.', meaning: '可以；能', example: 'Can I have a look?' },
      { word: 'have a look', phonetic: '/hæv ə lʊk/', partOfSpeech: '', meaning: '看一看', example: 'Can I have a look?' },
      { word: 'very', phonetic: '/ˈveri/', partOfSpeech: 'adv.', meaning: '非常', example: 'They are very beautiful.' },
      { word: 'fourteen', phonetic: '/ˌfɔːˈtiːn/', partOfSpeech: 'num.', meaning: '十四', example: 'I have fourteen cars.' },
      { word: 'fifteen', phonetic: '/ˌfɪfˈtiːn/', partOfSpeech: 'num.', meaning: '十五', example: 'I have fifteen rulers.' },
      { word: 'sixteen', phonetic: '/ˌsɪkˈstiːn/', partOfSpeech: 'num.', meaning: '十六', example: 'Sixteen stickers!' },
      { word: 'seventeen', phonetic: '/ˌsevnˈtiːn/', partOfSpeech: 'num.', meaning: '十七', example: 'I have seventeen.' },
      { word: 'eighteen', phonetic: '/ˌeɪˈtiːn/', partOfSpeech: 'num.', meaning: '十八', example: 'Eighteen robots!' },
      { word: 'nineteen', phonetic: '/ˌnaɪnˈtiːn/', partOfSpeech: 'num.', meaning: '十九', example: 'I have nineteen.' },
      { word: 'play', phonetic: '/pleɪ/', partOfSpeech: 'v.', meaning: '玩', example: 'Can you play table tennis?' },
      { word: 'many', phonetic: '/ˈmeni/', partOfSpeech: 'adj.', meaning: '许多', example: 'How many?' },
      { word: 'box', phonetic: '/bɒks/', partOfSpeech: 'n.', meaning: '盒子', example: 'I have a box.' },
      { word: 'table tennis', phonetic: '/ˈteɪbl ˈtenɪs/', partOfSpeech: 'n.', meaning: '乒乓球', example: 'I can play table tennis.' }
    ]},
    { unit: 4, title: 'I can play basketball', words: [
      { word: 'basketball', phonetic: '/ˈbɑːskɪtbɔːl/', partOfSpeech: 'n.', meaning: '篮球', example: 'I can play basketball.' },
      { word: 'football', phonetic: '/ˈfʊtbɔːl/', partOfSpeech: 'n.', meaning: '足球', example: 'Can you play football?' },
      { word: 'jump', phonetic: '/dʒʌmp/', partOfSpeech: 'v.', meaning: '跳', example: 'I can jump.' },
      { word: 'skate', phonetic: '/skeɪt/', partOfSpeech: 'v.', meaning: '滑冰', example: 'I can skate.' },
      { word: 'swim', phonetic: '/swɪm/', partOfSpeech: 'v.', meaning: '游泳', example: 'Can you swim?' },
      { word: 'well', phonetic: '/wel/', partOfSpeech: 'adv.', meaning: '好', example: 'I can swim well.' },
      { word: "can't", phonetic: '/kɑːnt/', partOfSpeech: '', meaning: '不能', example: "I can't play basketball." },
      { word: 'have a try', phonetic: '/hæv ə traɪ/', partOfSpeech: '', meaning: '试一试', example: 'Have a try!' },
      { word: 'yeah', phonetic: '/jeə/', partOfSpeech: 'int.', meaning: '是的', example: 'Yeah! I can do it!' },
      { word: 'fish', phonetic: '/fɪʃ/', partOfSpeech: 'n.', meaning: '鱼', example: 'I can see a fish.' }
    ]},
    { unit: 5, title: 'Our new home', words: [
      { word: 'home', phonetic: '/həʊm/', partOfSpeech: 'n.', meaning: '家', example: 'Welcome to our new home.' },
      { word: 'bedroom', phonetic: '/ˈbedruːm/', partOfSpeech: 'n.', meaning: '卧室', example: 'This is my bedroom.' },
      { word: 'living room', phonetic: '/ˈlɪvɪŋ ruːm/', partOfSpeech: 'n.', meaning: '客厅', example: 'We have a living room.' },
      { word: 'sofa', phonetic: '/ˈsəʊfə/', partOfSpeech: 'n.', meaning: '沙发', example: 'The sofa is in the living room.' },
      { word: 'come', phonetic: '/kʌm/', partOfSpeech: 'v.', meaning: '来', example: 'Come and look!' },
      { word: 'kitchen', phonetic: '/ˈkɪtʃɪn/', partOfSpeech: 'n.', meaning: '厨房', example: 'This is the kitchen.' },
      { word: 'table', phonetic: '/ˈteɪbl/', partOfSpeech: 'n.', meaning: '桌子', example: 'The table is in the kitchen.' },
      { word: 'fridge', phonetic: '/frɪdʒ/', partOfSpeech: 'n.', meaning: '冰箱', example: 'The fridge is in the kitchen.' },
      { word: 'clock', phonetic: '/klɒk/', partOfSpeech: 'n.', meaning: '钟', example: 'Where is the clock?' },
      { word: 'bathroom', phonetic: '/ˈbɑːθruːm/', partOfSpeech: 'n.', meaning: '卫生间', example: 'Where is the bathroom?' },
      { word: 'hungry', phonetic: '/ˈhʌŋɡri/', partOfSpeech: 'adj.', meaning: '饥饿的', example: "I'm hungry." },
      { word: 'where', phonetic: '/weə/', partOfSpeech: 'adv.', meaning: '在哪里', example: 'Where is my bag?' }
    ]},
    { unit: 6, title: 'At the snack bar', words: [
      { word: 'snack bar', phonetic: '/snæk bɑː/', partOfSpeech: 'n.', meaning: '快餐店', example: "Let's go to the snack bar." },
      { word: 'hamburger', phonetic: '/ˈhæmbɜːɡə/', partOfSpeech: 'n.', meaning: '汉堡包', example: 'I would like a hamburger.' },
      { word: 'noodle', phonetic: '/ˈnuːdl/', partOfSpeech: 'n.', meaning: '面条', example: 'A glass of milk and some noodles, please.' },
      { word: 'dad', phonetic: '/dæd/', partOfSpeech: 'n.', meaning: '爸爸', example: 'Dad, I am hungry.' },
      { word: 'sandwich', phonetic: '/ˈsænwɪtʃ/', partOfSpeech: 'n.', meaning: '三明治', example: 'A sandwich, please.' },
      { word: 'coffee', phonetic: '/ˈkɒfi/', partOfSpeech: 'n.', meaning: '咖啡', example: 'A cup of coffee, please.' },
      { word: 'tea', phonetic: '/tiː/', partOfSpeech: 'n.', meaning: '茶', example: 'A cup of tea, please.' },
      { word: 'milk', phonetic: '/mɪlk/', partOfSpeech: 'n.', meaning: '牛奶', example: 'A glass of milk, please.' },
      { word: 'juice', phonetic: '/dʒuːs/', partOfSpeech: 'n.', meaning: '果汁', example: 'Some juice, please.' },
      { word: 'rice', phonetic: '/raɪs/', partOfSpeech: 'n.', meaning: '米饭', example: 'A bowl of rice, please.' },
      { word: 'big', phonetic: '/bɪɡ/', partOfSpeech: 'adj.', meaning: '大的', example: 'What a big cake!' }
    ]},
    { unit: 7, title: 'How much?', words: [
      { word: 'how much', phonetic: '/haʊ mʌtʃ/', partOfSpeech: '', meaning: '多少钱', example: 'How much is it?' },
      { word: 'shoe', phonetic: '/ʃuː/', partOfSpeech: 'n.', meaning: '鞋子', example: 'Look at my shoes.' },
      { word: 'yuan', phonetic: '/juːˈɑːn/', partOfSpeech: 'n.', meaning: '元', example: "It's five yuan." },
      { word: 'sock', phonetic: '/sɒk/', partOfSpeech: 'n.', meaning: '袜子', example: 'These socks are nice.' },
      { word: 'umbrella', phonetic: '/ʌmˈbrelə/', partOfSpeech: 'n.', meaning: '雨伞', example: 'This umbrella is cool.' },
      { word: 'twenty', phonetic: '/ˈtwenti/', partOfSpeech: 'num.', meaning: '二十', example: "It's twenty yuan." },
      { word: 'forty', phonetic: '/ˈfɔːti/', partOfSpeech: 'num.', meaning: '四十', example: "They are forty yuan." },
      { word: 'her', phonetic: '/hɜː/', partOfSpeech: 'pron.', meaning: '她的', example: 'Her tail is long.' },
      { word: 'tail', phonetic: '/teɪl/', partOfSpeech: 'n.', meaning: '尾巴', example: 'The tail is long.' },
      { word: 'long', phonetic: '/lɒŋ/', partOfSpeech: 'adj.', meaning: '长的', example: 'Her tail is long.' },
      { word: 'only', phonetic: '/ˈəʊnli/', partOfSpeech: 'adv.', meaning: '只有', example: "It's only five yuan." }
    ]},
    { unit: 8, title: 'Dolls', words: [
      { word: 'doll', phonetic: '/dɒl/', partOfSpeech: 'n.', meaning: '洋娃娃', example: 'Look at our doll.' },
      { word: 'hair', phonetic: '/heə/', partOfSpeech: 'n.', meaning: '头发', example: 'Her hair is long.' },
      { word: 'his', phonetic: '/hɪz/', partOfSpeech: 'pron.', meaning: '他的', example: 'His nose is big.' },
      { word: 'king', phonetic: '/kɪŋ/', partOfSpeech: 'n.', meaning: '国王', example: 'The king is tall.' },
      { word: 'nose', phonetic: '/nəʊz/', partOfSpeech: 'n.', meaning: '鼻子', example: 'His nose is big.' },
      { word: 'mouth', phonetic: '/maʊθ/', partOfSpeech: 'n.', meaning: '嘴巴', example: 'Her mouth is small.' },
      { word: 'small', phonetic: '/smɔːl/', partOfSpeech: 'adj.', meaning: '小的', example: 'Her mouth is small.' },
      { word: 'eye', phonetic: '/aɪ/', partOfSpeech: 'n.', meaning: '眼睛', example: 'Her eyes are big.' },
      { word: 'ear', phonetic: '/ɪə/', partOfSpeech: 'n.', meaning: '耳朵', example: 'His ears are big.' },
      { word: 'thin', phonetic: '/θɪn/', partOfSpeech: 'adj.', meaning: '瘦的', example: 'He is thin.' },
      { word: 'short', phonetic: '/ʃɔːt/', partOfSpeech: 'adj.', meaning: '矮的；短的', example: 'He is short.' },
      { word: 'snowman', phonetic: '/ˈsnəʊmæn/', partOfSpeech: 'n.', meaning: '雪人', example: 'Look at the snowman.' },
      { word: 'robot', phonetic: '/ˈrəʊbɒt/', partOfSpeech: 'n.', meaning: '机器人', example: 'The robot is cool.' }
    ]}
  ]},

  // ========== 四年级下册 (4B) ==========
  { grade: 4, semester: '下册', units: [
    { unit: 1, title: 'Our School Subjects', words: [
      { word: 'school', phonetic: '/skuːl/', partOfSpeech: 'n.', meaning: '学校', example: 'Welcome back to school.' },
      { word: 'subject', phonetic: '/ˈsʌbdʒɪkt/', partOfSpeech: 'n.', meaning: '课程；学科', example: 'What subjects do you like?' },
      { word: 'timetable', phonetic: '/ˈtaɪmteɪbl/', partOfSpeech: 'n.', meaning: '课程表', example: 'Look at our timetable.' },
      { word: 'Chinese', phonetic: '/ˌtʃaɪˈniːz/', partOfSpeech: 'n.', meaning: '语文', example: 'I like Chinese.' },
      { word: 'Maths', phonetic: '/mæθs/', partOfSpeech: 'n.', meaning: '数学', example: 'I like Maths.' },
      { word: 'Art', phonetic: '/ɑːt/', partOfSpeech: 'n.', meaning: '美术', example: 'I like Art.' },
      { word: 'PE', phonetic: '/ˌpiːˈiː/', partOfSpeech: 'n.', meaning: '体育', example: 'I like PE.' },
      { word: 'Music', phonetic: '/ˈmjuːzɪk/', partOfSpeech: 'n.', meaning: '音乐', example: 'I like Music.' },
      { word: 'Science', phonetic: '/ˈsaɪəns/', partOfSpeech: 'n.', meaning: '科学', example: 'We have Science.' },
      { word: 'fun', phonetic: '/fʌn/', partOfSpeech: 'n.', meaning: '乐趣', example: 'It is fun!' },
      { word: 'playground', phonetic: '/ˈpleɪɡraʊnd/', partOfSpeech: 'n.', meaning: '操场', example: "Let's go to the playground." },
      { word: 'lesson', phonetic: '/ˈlesn/', partOfSpeech: 'n.', meaning: '课', example: 'What lessons do we have?' },
      { word: 'Monday', phonetic: '/ˈmʌndeɪ/', partOfSpeech: 'n.', meaning: '星期一', example: 'It is Monday.' },
      { word: 'afternoon', phonetic: '/ˌɑːftəˈnuːn/', partOfSpeech: 'n.', meaning: '下午', example: 'Good afternoon.' }
    ]},
    { unit: 2, title: 'After School', words: [
      { word: 'after school', phonetic: '/ˈɑːftə skuːl/', partOfSpeech: '', meaning: '放学后', example: 'What do you do after school?' },
      { word: 'go', phonetic: '/ɡəʊ/', partOfSpeech: 'v.', meaning: '去', example: "Let's go and play." },
      { word: 'Wednesday', phonetic: '/ˈwenzdeɪ/', partOfSpeech: 'n.', meaning: '星期三', example: 'I have a match on Wednesday.' },
      { word: 'match', phonetic: '/mætʃ/', partOfSpeech: 'n.', meaning: '比赛', example: 'I have a football match.' },
      { word: 'today', phonetic: '/təˈdeɪ/', partOfSpeech: 'n.', meaning: '今天', example: 'What day is it today?' },
      { word: 'Saturday', phonetic: '/ˈsætədeɪ/', partOfSpeech: 'n.', meaning: '星期六', example: 'I play on Saturday.' },
      { word: 'Sunday', phonetic: '/ˈsʌndeɪ/', partOfSpeech: 'n.', meaning: '星期日', example: 'I play on Sunday.' },
      { word: 'Tuesday', phonetic: '/ˈtjuːzdeɪ/', partOfSpeech: 'n.', meaning: '星期二', example: 'I have a lesson on Tuesday.' },
      { word: 'Thursday', phonetic: '/ˈθɜːzdeɪ/', partOfSpeech: 'n.', meaning: '星期四', example: 'What about Thursday?' },
      { word: 'Friday', phonetic: '/ˈfraɪdeɪ/', partOfSpeech: 'n.', meaning: '星期五', example: 'I play on Friday.' },
      { word: 'get up', phonetic: '/ɡet ʌp/', partOfSpeech: '', meaning: '起床', example: 'I get up at seven.' },
      { word: 'when', phonetic: '/wen/', partOfSpeech: 'adv.', meaning: '什么时候', example: 'When do you get up?' },
      { word: 'every', phonetic: '/ˈevri/', partOfSpeech: 'adj.', meaning: '每个', example: 'I get up every day at seven.' },
      { word: 'day', phonetic: '/deɪ/', partOfSpeech: 'n.', meaning: '天；日', example: 'What day is it today?' }
    ]},
    { unit: 3, title: 'My Day', words: [
      { word: 'usually', phonetic: '/ˈjuːʒuəli/', partOfSpeech: 'adv.', meaning: '通常', example: 'I usually get up at seven.' },
      { word: 'go to school', phonetic: '/ɡəʊ tuː skuːl/', partOfSpeech: '', meaning: '上学', example: 'I go to school at seven thirty.' },
      { word: 'have lunch', phonetic: '/hæv lʌntʃ/', partOfSpeech: '', meaning: '吃午饭', example: 'I have lunch at twelve.' },
      { word: 'play football', phonetic: '/pleɪ ˈfʊtbɔːl/', partOfSpeech: '', meaning: '踢足球', example: 'I play football after school.' },
      { word: 'go home', phonetic: '/ɡəʊ həʊm/', partOfSpeech: '', meaning: '回家', example: 'I go home at four thirty.' },
      { word: 'homework', phonetic: '/ˈhəʊmwɜːk/', partOfSpeech: 'n.', meaning: '家庭作业', example: 'I do my homework.' },
      { word: 'have dinner', phonetic: '/hæv ˈdɪnə/', partOfSpeech: '', meaning: '吃晚饭', example: 'I have dinner at six.' },
      { word: 'watch TV', phonetic: '/wɒtʃ tiː viː/', partOfSpeech: '', meaning: '看电视', example: 'I watch TV in the evening.' },
      { word: 'go to bed', phonetic: '/ɡəʊ tuː bed/', partOfSpeech: '', meaning: '睡觉', example: 'I go to bed at nine.' },
      { word: 'in the evening', phonetic: '/ɪn ðə ˈiːvnɪŋ/', partOfSpeech: '', meaning: '在晚上', example: 'I watch TV in the evening.' },
      { word: 'at night', phonetic: '/ət naɪt/', partOfSpeech: '', meaning: '在夜里', example: 'I sleep at night.' }
    ]},
    { unit: 4, title: 'Drawing in the Park', words: [
      { word: 'drawing', phonetic: '/ˈdrɔːɪŋ/', partOfSpeech: 'n.', meaning: '画画', example: 'I like drawing.' },
      { word: 'park', phonetic: '/pɑːk/', partOfSpeech: 'n.', meaning: '公园', example: "Let's draw in the park." },
      { word: 'draw', phonetic: '/drɔː/', partOfSpeech: 'v.', meaning: '画', example: 'I can draw a flower.' },
      { word: 'flower', phonetic: '/ˈflaʊə/', partOfSpeech: 'n.', meaning: '花', example: 'Look at the flowers.' },
      { word: 'them', phonetic: '/ðəm/', partOfSpeech: 'pron.', meaning: '他们', example: 'I can draw them.' },
      { word: 'easy', phonetic: '/ˈiːzi/', partOfSpeech: 'adj.', meaning: '容易的', example: "It's easy." },
      { word: 'boat', phonetic: '/bəʊt/', partOfSpeech: 'n.', meaning: '小船', example: 'Can you draw a boat?' },
      { word: 'river', phonetic: '/ˈrɪvə/', partOfSpeech: 'n.', meaning: '河', example: 'Look at the river.' },
      { word: 'difficult', phonetic: '/ˈdɪfɪkəlt/', partOfSpeech: 'adj.', meaning: '困难的', example: "It's difficult." },
      { word: 'try', phonetic: '/traɪ/', partOfSpeech: 'v.', meaning: '试', example: 'Have a try!' },
      { word: 'hill', phonetic: '/hɪl/', partOfSpeech: 'n.', meaning: '小山', example: 'I can see a hill.' },
      { word: 'lake', phonetic: '/leɪk/', partOfSpeech: 'n.', meaning: '湖', example: 'I can see a lake.' },
      { word: 'again', phonetic: '/əˈɡen/', partOfSpeech: 'adv.', meaning: '再次', example: 'Draw it again.' }
    ]},
    { unit: 5, title: 'Seasons', words: [
      { word: 'season', phonetic: '/ˈsiːzn/', partOfSpeech: 'n.', meaning: '季节', example: 'I like seasons.' },
      { word: 'spring', phonetic: '/sprɪŋ/', partOfSpeech: 'n.', meaning: '春天', example: 'I like spring.' },
      { word: 'warm', phonetic: '/wɔːm/', partOfSpeech: 'adj.', meaning: '温暖的', example: 'It is warm in spring.' },
      { word: 'fly', phonetic: '/flaɪ/', partOfSpeech: 'v.', meaning: '放（风筝）', example: 'We fly kites in spring.' },
      { word: 'kite', phonetic: '/kaɪt/', partOfSpeech: 'n.', meaning: '风筝', example: 'We fly kites.' },
      { word: 'go boating', phonetic: '/ɡəʊ ˈbəʊtɪŋ/', partOfSpeech: '', meaning: '去划船', example: 'We go boating in spring.' },
      { word: 'summer', phonetic: '/ˈsʌmə/', partOfSpeech: 'n.', meaning: '夏天', example: 'I like summer.' },
      { word: 'hot', phonetic: '/hɒt/', partOfSpeech: 'adj.', meaning: '热的', example: 'It is hot in summer.' },
      { word: 'go swimming', phonetic: '/ɡəʊ ˈswɪmɪŋ/', partOfSpeech: '', meaning: '去游泳', example: 'We go swimming in summer.' },
      { word: 'autumn', phonetic: '/ˈɔːtəm/', partOfSpeech: 'n.', meaning: '秋天', example: 'I like autumn.' },
      { word: 'cool', phonetic: '/kuːl/', partOfSpeech: 'adj.', meaning: '凉爽的', example: 'It is cool in autumn.' },
      { word: 'picnic', phonetic: '/ˈpɪknɪk/', partOfSpeech: 'n.', meaning: '野餐', example: 'We have picnics in autumn.' },
      { word: 'go climbing', phonetic: '/ɡəʊ ˈklaɪmɪŋ/', partOfSpeech: '', meaning: '去爬山', example: 'We go climbing in autumn.' },
      { word: 'winter', phonetic: '/ˈwɪntə/', partOfSpeech: 'n.', meaning: '冬天', example: 'I like winter.' },
      { word: 'cold', phonetic: '/kəʊld/', partOfSpeech: 'adj.', meaning: '冷的', example: 'It is cold in winter.' },
      { word: 'go skating', phonetic: '/ɡəʊ ˈskeɪtɪŋ/', partOfSpeech: '', meaning: '去滑冰', example: 'We go skating in winter.' },
      { word: 'fine', phonetic: '/faɪn/', partOfSpeech: 'adj.', meaning: '晴朗的', example: 'It is a fine day.' },
      { word: 'whose', phonetic: '/huːz/', partOfSpeech: 'pron.', meaning: '谁的', example: 'Whose coat is this?' }
    ]},
    { unit: 6, title: "Whose Dress Is This?", words: [
      { word: 'dress', phonetic: '/dres/', partOfSpeech: 'n.', meaning: '连衣裙', example: "Whose dress is this?" },
      { word: 'too', phonetic: '/tuː/', partOfSpeech: 'adv.', meaning: '太', example: "It's too short." },
      { word: 'trousers', phonetic: '/ˈtraʊzəz/', partOfSpeech: 'n.', meaning: '裤子', example: 'Try these trousers on.' },
      { word: 'party', phonetic: '/ˈpɑːti/', partOfSpeech: 'n.', meaning: '聚会', example: "Let's go to the party." },
      { word: 'glove', phonetic: '/ɡlʌv/', partOfSpeech: 'n.', meaning: '手套', example: 'Whose gloves are these?' },
      { word: 'so', phonetic: '/səʊ/', partOfSpeech: 'adv.', meaning: '如此', example: "They're so beautiful." },
      { word: 'coat', phonetic: '/kəʊt/', partOfSpeech: 'n.', meaning: '外套', example: 'Whose coat is this?' },
      { word: 'shirt', phonetic: '/ʃɜːt/', partOfSpeech: 'n.', meaning: '衬衫', example: 'This shirt is too big.' },
      { word: 'sweater', phonetic: '/ˈswetə/', partOfSpeech: 'n.', meaning: '毛衣', example: 'This sweater is nice.' },
      { word: 'jeans', phonetic: '/dʒiːnz/', partOfSpeech: 'n.', meaning: '牛仔裤', example: 'Try these jeans on.' },
      { word: 'shorts', phonetic: '/ʃɔːts/', partOfSpeech: 'n.', meaning: '短裤', example: 'These shorts are cool.' },
      { word: 'wrong', phonetic: '/rɒŋ/', partOfSpeech: 'adj.', meaning: '错的', example: "What's wrong?" },
      { word: 'move', phonetic: '/muːv/', partOfSpeech: 'v.', meaning: '移动', example: "I can't move." }
    ]}
  ]},

  // ========== 五年级上册 (5A) ==========
  { grade: 5, semester: '上册', units: [
    { unit: 1, title: 'Goldilocks and the three bears', words: [
      { word: 'bear', phonetic: '/beə/', partOfSpeech: 'n.', meaning: '熊', example: 'There are three bears.' },
      { word: 'forest', phonetic: '/ˈfɒrɪst/', partOfSpeech: 'n.', meaning: '森林', example: 'She is in the forest.' },
      { word: 'there', phonetic: '/ðeə/', partOfSpeech: '', meaning: '（与be连用）有', example: 'There is a house.' },
      { word: 'house', phonetic: '/haʊs/', partOfSpeech: 'n.', meaning: '房子', example: 'There is a house in the forest.' },
      { word: 'soup', phonetic: '/suːp/', partOfSpeech: 'n.', meaning: '汤', example: 'This soup is just right.' },
      { word: 'just right', phonetic: '/dʒʌst raɪt/', partOfSpeech: '', meaning: '正合适', example: 'This soup is just right.' },
      { word: 'room', phonetic: '/ruːm/', partOfSpeech: 'n.', meaning: '房间', example: 'There are three rooms.' },
      { word: 'hard', phonetic: '/hɑːd/', partOfSpeech: 'adj.', meaning: '硬的', example: 'This bed is hard.' },
      { word: 'soft', phonetic: '/sɒft/', partOfSpeech: 'adj.', meaning: '柔软的', example: 'This bed is soft.' },
      { word: 'afraid', phonetic: '/əˈfreɪd/', partOfSpeech: 'adj.', meaning: '害怕的', example: 'She is afraid.' },
      { word: 'in front of', phonetic: '/ɪn frʌnt əv/', partOfSpeech: '', meaning: '在…前面', example: 'There is a tree in front of the house.' },
      { word: 'her', phonetic: '/hə/', partOfSpeech: 'pron.', meaning: '她', example: 'Help her!' },
      { word: 'help', phonetic: '/help/', partOfSpeech: 'n.', meaning: '救命', example: 'Help!' },
      { word: 'beside', phonetic: '/bɪˈsaɪd/', partOfSpeech: 'prep.', meaning: '在…旁边', example: 'There is a chair beside the bed.' },
      { word: 'between', phonetic: '/bɪˈtwiːn/', partOfSpeech: 'prep.', meaning: '在…中间', example: 'There is a table between the chairs.' },
      { word: 'really', phonetic: '/ˈriːəli/', partOfSpeech: 'adv.', meaning: '真的', example: 'Really?' },
      { word: 'then', phonetic: '/ðen/', partOfSpeech: 'adv.', meaning: '然后', example: 'Then she is tired.' },
      { word: 'find', phonetic: '/faɪnd/', partOfSpeech: 'v.', meaning: '找到', example: 'She finds three beds.' },
      { word: 'their', phonetic: '/ðeə/', partOfSpeech: 'pron.', meaning: '他们的', example: 'This is their house.' }
    ]},
    { unit: 2, title: 'A new student', words: [
      { word: 'student', phonetic: '/ˈstjuːdnt/', partOfSpeech: 'n.', meaning: '学生', example: 'She is a new student.' },
      { word: 'show around', phonetic: '/ʃəʊ əˈraʊnd/', partOfSpeech: '', meaning: '带…参观', example: "Let me show you around." },
      { word: 'classroom', phonetic: '/ˈklɑːsruːm/', partOfSpeech: 'n.', meaning: '教室', example: 'There are 24 classrooms.' },
      { word: 'second', phonetic: '/ˈsekənd/', partOfSpeech: 'num.', meaning: '第二', example: "It's on the second floor." },
      { word: 'floor', phonetic: '/flɔː/', partOfSpeech: 'n.', meaning: '楼层', example: "It's on the first floor." },
      { word: 'computer', phonetic: '/kəmˈpjuːtə/', partOfSpeech: 'n.', meaning: '电脑', example: 'There are two computer rooms.' },
      { word: 'third', phonetic: '/θɜːd/', partOfSpeech: 'num.', meaning: '第三', example: "It's on the third floor." },
      { word: 'first', phonetic: '/fɜːst/', partOfSpeech: 'num.', meaning: '第一', example: "It's on the first floor." },
      { word: 'swing', phonetic: '/swɪŋ/', partOfSpeech: 'n.', meaning: '秋千', example: 'There are some swings.' },
      { word: 'push', phonetic: '/pʊʃ/', partOfSpeech: 'v.', meaning: '推', example: 'Push me!' },
      { word: 'heavy', phonetic: '/ˈhevi/', partOfSpeech: 'adj.', meaning: '重的', example: "You're too heavy." },
      { word: 'stop', phonetic: '/stɒp/', partOfSpeech: 'v.', meaning: '停止', example: 'Stop!' },
      { word: 'high', phonetic: '/haɪ/', partOfSpeech: 'adj.', meaning: '高的', example: 'The swing goes high.' },
      { word: 'great', phonetic: '/ɡreɪt/', partOfSpeech: 'adj.', meaning: '很大的', example: 'It is great!' }
    ]},
    { unit: 3, title: 'Our animal friends', words: [
      { word: 'body', phonetic: '/ˈbɒdi/', partOfSpeech: 'n.', meaning: '身体', example: 'It has a big body.' },
      { word: 'leg', phonetic: '/leɡ/', partOfSpeech: 'n.', meaning: '腿', example: 'It has four legs.' },
      { word: 'arm', phonetic: '/ɑːm/', partOfSpeech: 'n.', meaning: '手臂', example: 'It has two arms.' },
      { word: 'wing', phonetic: '/wɪŋ/', partOfSpeech: 'n.', meaning: '翅膀', example: 'It has two wings.' },
      { word: 'foot', phonetic: '/fʊt/', partOfSpeech: 'n.', meaning: '脚', example: 'It has big feet.' },
      { word: 'rabbit', phonetic: '/ˈræbɪt/', partOfSpeech: 'n.', meaning: '兔子', example: 'I have a rabbit.' },
      { word: 'give', phonetic: '/ɡɪv/', partOfSpeech: 'v.', meaning: '给', example: 'Give it a cake.' },
      { word: 'finger', phonetic: '/ˈfɪŋɡə/', partOfSpeech: 'n.', meaning: '手指', example: 'It has ten fingers.' }
    ]},
    { unit: 4, title: 'Hobbies', words: [
      { word: 'hobby', phonetic: '/ˈhɒbi/', partOfSpeech: 'n.', meaning: '爱好', example: 'What are your hobbies?' },
      { word: 'be good at', phonetic: '/biː ɡʊd æt/', partOfSpeech: '', meaning: '擅长', example: 'I am good at playing football.' },
      { word: 'also', phonetic: '/ˈɔːlsəʊ/', partOfSpeech: 'adv.', meaning: '也', example: 'I also like swimming.' },
      { word: 'read', phonetic: '/riːd/', partOfSpeech: 'v.', meaning: '阅读', example: 'I like reading stories.' },
      { word: 'story', phonetic: '/ˈstɔːri/', partOfSpeech: 'n.', meaning: '故事', example: 'I like reading stories.' },
      { word: 'a lot of', phonetic: '/ə lɒt əv/', partOfSpeech: '', meaning: '很多', example: 'I have a lot of books.' },
      { word: 'play the piano', phonetic: '/pleɪ ðə pɪˈænəʊ/', partOfSpeech: '', meaning: '弹钢琴', example: 'I like playing the piano.' },
      { word: 'dance', phonetic: '/dɑːns/', partOfSpeech: 'v.', meaning: '跳舞', example: 'I like dancing.' },
      { word: 'watch films', phonetic: '/wɒtʃ fɪlmz/', partOfSpeech: '', meaning: '看电影', example: 'I like watching films.' },
      { word: 'both', phonetic: '/bəʊθ/', partOfSpeech: 'pron.', meaning: '两个都', example: 'We both like swimming.' },
      { word: 'sing', phonetic: '/sɪŋ/', partOfSpeech: 'v.', meaning: '唱歌', example: 'I like singing.' },
      { word: 'group', phonetic: '/ɡruːp/', partOfSpeech: 'n.', meaning: '组', example: 'There is a singing group.' },
      { word: 'about', phonetic: '/əˈbaʊt/', partOfSpeech: 'prep.', meaning: '关于', example: 'Talk about your hobbies.' },
      { word: 'idea', phonetic: '/aɪˈdɪə/', partOfSpeech: 'n.', meaning: '主意', example: 'Good idea!' },
      { word: 'ice', phonetic: '/aɪs/', partOfSpeech: 'n.', meaning: '冰', example: 'There is ice on the lake.' },
      { word: 'hole', phonetic: '/həʊl/', partOfSpeech: 'n.', meaning: '洞', example: 'There is a hole in the ice.' },
      { word: 'look out', phonetic: '/lʊk aʊt/', partOfSpeech: '', meaning: '当心', example: 'Look out!' },
      { word: 'wet', phonetic: '/wet/', partOfSpeech: 'adj.', meaning: '湿的', example: "I'm wet." }
    ]},
    { unit: 5, title: 'What do they do?', words: [
      { word: 'teacher', phonetic: '/ˈtiːtʃə/', partOfSpeech: 'n.', meaning: '老师', example: 'She is a teacher.' },
      { word: 'teach', phonetic: '/tiːtʃ/', partOfSpeech: 'v.', meaning: '教', example: 'She teaches English.' },
      { word: 'writer', phonetic: '/ˈraɪtə/', partOfSpeech: 'n.', meaning: '作家', example: 'He is a writer.' },
      { word: 'write', phonetic: '/raɪt/', partOfSpeech: 'v.', meaning: '写', example: 'He writes stories.' },
      { word: 'work', phonetic: '/wɜːk/', partOfSpeech: 'v.', meaning: '工作', example: 'She works at home.' },
      { word: 'at home', phonetic: '/ət həʊm/', partOfSpeech: '', meaning: '在家', example: 'She works at home.' },
      { word: 'doctor', phonetic: '/ˈdɒktə/', partOfSpeech: 'n.', meaning: '医生', example: 'He is a doctor.' },
      { word: 'nurse', phonetic: '/nɜːs/', partOfSpeech: 'n.', meaning: '护士', example: 'She is a nurse.' },
      { word: 'factory', phonetic: '/ˈfæktəri/', partOfSpeech: 'n.', meaning: '工厂', example: 'He works in a factory.' },
      { word: 'worker', phonetic: '/ˈwɜːkə/', partOfSpeech: 'n.', meaning: '工人', example: 'She is a factory worker.' },
      { word: 'cook', phonetic: '/kʊk/', partOfSpeech: 'n.', meaning: '厨师', example: 'He is a cook.' },
      { word: 'driver', phonetic: '/ˈdraɪvə/', partOfSpeech: 'n.', meaning: '司机', example: 'He is a driver.' },
      { word: 'farmer', phonetic: '/ˈfɑːmə/', partOfSpeech: 'n.', meaning: '农民', example: 'She is a farmer.' },
      { word: 'policeman', phonetic: '/pəˈliːsmən/', partOfSpeech: 'n.', meaning: '警察', example: 'He is a policeman.' }
    ]},
    { unit: 6, title: 'My e-friend', words: [
      { word: 'e-friend', phonetic: '/ˈiː frend/', partOfSpeech: 'n.', meaning: '网友', example: 'I have an e-friend.' },
      { word: 'send', phonetic: '/send/', partOfSpeech: 'v.', meaning: '发送', example: 'I send emails to him.' },
      { word: 'email', phonetic: '/ˈiːmeɪl/', partOfSpeech: 'n.', meaning: '电子邮件', example: 'I write an email.' },
      { word: 'live', phonetic: '/lɪv/', partOfSpeech: 'v.', meaning: '居住', example: 'He lives in the UK.' },
      { word: 'UK', phonetic: '/ˌjuːˈkeɪ/', partOfSpeech: 'n.', meaning: '英国', example: 'He lives in the UK.' },
      { word: 'study', phonetic: '/ˈstʌdi/', partOfSpeech: 'v.', meaning: '学习', example: 'He studies Chinese.' },
      { word: 'Australia', phonetic: '/ɒˈstreɪliə/', partOfSpeech: 'n.', meaning: '澳大利亚', example: 'She lives in Australia.' },
      { word: 'Canada', phonetic: '/ˈkænədə/', partOfSpeech: 'n.', meaning: '加拿大', example: 'He lives in Canada.' },
      { word: 'China', phonetic: '/ˈtʃaɪnə/', partOfSpeech: 'n.', meaning: '中国', example: 'I live in China.' },
      { word: 'US', phonetic: '/ˌjuːˈes/', partOfSpeech: 'n.', meaning: '美国', example: 'She lives in the US.' },
      { word: 'go fishing', phonetic: '/ɡəʊ ˈfɪʃɪŋ/', partOfSpeech: '', meaning: '去钓鱼', example: 'He likes going fishing.' },
      { word: 'tomorrow', phonetic: '/təˈmɒrəʊ/', partOfSpeech: 'n.', meaning: '明天', example: "Let's go fishing tomorrow." },
      { word: 'sit', phonetic: '/sɪt/', partOfSpeech: 'v.', meaning: '坐', example: 'Sit down, please.' },
      { word: 'wait', phonetic: '/weɪt/', partOfSpeech: 'v.', meaning: '等待', example: 'Wait a minute.' }
    ]},
    { unit: 7, title: 'At weekends', words: [
      { word: 'at weekends', phonetic: '/ət ˌwiːkˈendz/', partOfSpeech: '', meaning: '在周末', example: 'What do you do at weekends?' },
      { word: 'visit', phonetic: '/ˈvɪzɪt/', partOfSpeech: 'v.', meaning: '拜访', example: 'I visit my grandparents.' },
      { word: 'grandparent', phonetic: '/ˈɡrænpeərənt/', partOfSpeech: 'n.', meaning: '祖父母', example: 'I visit my grandparents.' },
      { word: 'often', phonetic: '/ˈɒfn/', partOfSpeech: 'adv.', meaning: '经常', example: 'I often visit them.' },
      { word: 'chat', phonetic: '/tʃæt/', partOfSpeech: 'v.', meaning: '聊天', example: 'We chat on the Internet.' },
      { word: 'Internet', phonetic: '/ˈɪntənet/', partOfSpeech: 'n.', meaning: '互联网', example: 'I chat on the Internet.' },
      { word: 'always', phonetic: '/ˈɔːlweɪz/', partOfSpeech: 'adv.', meaning: '总是', example: 'I always go swimming.' },
      { word: 'sometimes', phonetic: '/ˈsʌmtaɪmz/', partOfSpeech: 'adv.', meaning: '有时', example: 'Sometimes I go to the cinema.' },
      { word: 'go to the cinema', phonetic: '/ɡəʊ tuː ðə ˈsɪnəmə/', partOfSpeech: '', meaning: '去看电影', example: 'Sometimes I go to the cinema.' },
      { word: 'a lot', phonetic: '/ə lɒt/', partOfSpeech: '', meaning: '很多', example: 'I play football a lot.' },
      { word: 'come out', phonetic: '/kʌm aʊt/', partOfSpeech: '', meaning: '出来', example: 'The sun comes out.' },
      { word: 'get out', phonetic: '/ɡet aʊt/', partOfSpeech: '', meaning: '出来', example: 'Get out!' }
    ]},
    { unit: 8, title: 'At Christmas', words: [
      { word: 'Christmas', phonetic: '/ˈkrɪsməs/', partOfSpeech: 'n.', meaning: '圣诞节', example: 'Merry Christmas!' },
      { word: 'buy', phonetic: '/baɪ/', partOfSpeech: 'v.', meaning: '买', example: 'We buy presents.' },
      { word: 'present', phonetic: '/ˈpreznt/', partOfSpeech: 'n.', meaning: '礼物', example: 'We buy presents for our friends.' },
      { word: 'Christmas tree', phonetic: '/ˈkrɪsməs triː/', partOfSpeech: 'n.', meaning: '圣诞树', example: 'We put up a Christmas tree.' },
      { word: 'Father Christmas', phonetic: '/ˈfɑːðə ˈkrɪsməs/', partOfSpeech: 'n.', meaning: '圣诞老人', example: 'Father Christmas comes!' },
      { word: 'next', phonetic: '/nekst/', partOfSpeech: 'adv.', meaning: '接着', example: 'Next, we put pretty things on the tree.' },
      { word: 'put', phonetic: '/pʊt/', partOfSpeech: 'v.', meaning: '放', example: 'We put presents under the tree.' },
      { word: 'pretty', phonetic: '/ˈprɪti/', partOfSpeech: 'adj.', meaning: '漂亮的', example: 'The tree looks pretty.' },
      { word: 'thing', phonetic: '/θɪŋ/', partOfSpeech: 'n.', meaning: '物品', example: 'We put pretty things on the tree.' },
      { word: 'Christmas Eve', phonetic: '/ˈkrɪsməs iːv/', partOfSpeech: 'n.', meaning: '平安夜', example: 'It is Christmas Eve.' },
      { word: 'stocking', phonetic: '/ˈstɒkɪŋ/', partOfSpeech: 'n.', meaning: '长筒袜', example: 'We put a stocking on the bed.' },
      { word: 'wait for', phonetic: '/weɪt fɔː/', partOfSpeech: '', meaning: '等候', example: 'We wait for presents.' },
      { word: 'finally', phonetic: '/ˈfaɪnəli/', partOfSpeech: 'adv.', meaning: '最后', example: 'Finally, it is Christmas Day!' },
      { word: 'early', phonetic: '/ˈɜːli/', partOfSpeech: 'adv.', meaning: '早早地', example: 'We wake up early.' },
      { word: 'turkey', phonetic: '/ˈtɜːki/', partOfSpeech: 'n.', meaning: '火鸡', example: 'We eat a turkey.' },
      { word: 'pudding', phonetic: '/ˈpʊdɪŋ/', partOfSpeech: 'n.', meaning: '布丁', example: 'We have pudding too.' },
      { word: 'have a good time', phonetic: '/hæv ə ɡʊd taɪm/', partOfSpeech: '', meaning: '过得愉快', example: 'We have a good time!' },
      { word: 'card', phonetic: '/kɑːd/', partOfSpeech: 'n.', meaning: '卡片', example: 'We make Christmas cards.' },
      { word: 'children', phonetic: '/ˈtʃɪldrən/', partOfSpeech: 'n.', meaning: '孩子们', example: 'Children like Christmas.' },
      { word: 'message', phonetic: '/ˈmesɪdʒ/', partOfSpeech: 'n.', meaning: '信息', example: 'We write messages on cards.' },
      { word: 'Merry Christmas', phonetic: '/ˈmeri ˈkrɪsməs/', partOfSpeech: '', meaning: '圣诞快乐', example: 'Merry Christmas!' },
      { word: 'song', phonetic: '/sɒŋ/', partOfSpeech: 'n.', meaning: '歌曲', example: 'We sing Christmas songs.' },
      { word: 'him', phonetic: '/hɪm/', partOfSpeech: 'pron.', meaning: '他', example: 'We give presents to him.' },
      { word: 'us', phonetic: '/ʌs/', partOfSpeech: 'pron.', meaning: '我们', example: 'He gives presents to us.' },
      { word: 'letter', phonetic: '/ˈletə/', partOfSpeech: 'n.', meaning: '信', example: 'We write letters.' },
      { word: 'storybook', phonetic: '/ˈstɔːribʊk/', partOfSpeech: 'n.', meaning: '故事书', example: 'I like reading storybooks.' },
      { word: 'after', phonetic: '/ˈɑːftə/', partOfSpeech: 'prep.', meaning: '在…以后', example: 'After dinner, we watch TV.' }
    ]}
  ]},

  // ========== 五年级下册 (5B) ==========
  { grade: 5, semester: '下册', units: [
    { unit: 1, title: 'Cinderella', words: [
      { word: 'prince', phonetic: '/prɪns/', partOfSpeech: 'n.', meaning: '王子', example: 'The prince is handsome.' },
      { word: 'fairy', phonetic: '/ˈfeəri/', partOfSpeech: 'n.', meaning: '仙女', example: 'A fairy helps Cinderella.' },
      { word: 'why', phonetic: '/waɪ/', partOfSpeech: 'adv.', meaning: '为什么', example: 'Why are you sad?' },
      { word: 'because', phonetic: '/bɪˈkɒz/', partOfSpeech: 'conj.', meaning: '因为', example: 'Because I have no nice clothes.' },
      { word: 'clothes', phonetic: '/kləʊðz/', partOfSpeech: 'n.', meaning: '衣服', example: 'Put on your clothes.' },
      { word: 'let', phonetic: '/let/', partOfSpeech: 'v.', meaning: '让', example: 'Let me help you.' },
      { word: 'put on', phonetic: '/pʊt ɒn/', partOfSpeech: '', meaning: '穿上', example: 'Put on this dress.' },
      { word: 'before', phonetic: '/bɪˈfɔː/', partOfSpeech: 'prep.', meaning: '在…以前', example: 'Come back before 12 o\'clock.' },
      { word: 'have to', phonetic: '/hæv tuː/', partOfSpeech: '', meaning: '不得不', example: 'I have to go now.' },
      { word: 'try on', phonetic: '/traɪ ɒn/', partOfSpeech: '', meaning: '试穿', example: 'Try on this shoe.' },
      { word: 'fit', phonetic: '/fɪt/', partOfSpeech: 'v.', meaning: '合身', example: 'The shoe fits.' },
      { word: 'take off', phonetic: '/teɪk ɒf/', partOfSpeech: '', meaning: '脱下', example: 'Take off your coat.' },
      { word: 'mushroom', phonetic: '/ˈmʌʃruːm/', partOfSpeech: 'n.', meaning: '蘑菇', example: 'Don\'t eat the mushroom.' },
      { word: 'late', phonetic: '/leɪt/', partOfSpeech: 'adj.', meaning: '迟的', example: 'I am late!' },
      { word: 'pick', phonetic: '/pɪk/', partOfSpeech: 'v.', meaning: '摘', example: 'Pick some mushrooms.' },
      { word: 'understand', phonetic: '/ˌʌndəˈstænd/', partOfSpeech: 'v.', meaning: '明白', example: 'I understand.' },
      { word: 'leave behind', phonetic: '/liːv bɪˈhaɪnd/', partOfSpeech: '', meaning: '留下', example: 'She leaves a shoe behind.' }
    ]},
    { unit: 2, title: 'How do you come to school?', words: [
      { word: 'far from', phonetic: '/fɑː frɒm/', partOfSpeech: '', meaning: '离…远', example: 'I live far from school.' },
      { word: 'near', phonetic: '/nɪə/', partOfSpeech: 'prep.', meaning: '在…附近', example: 'I live near school.' },
      { word: 'next to', phonetic: '/nekst tuː/', partOfSpeech: '', meaning: '在…旁边', example: 'It is next to the park.' },
      { word: 'cinema', phonetic: '/ˈsɪnəmə/', partOfSpeech: 'n.', meaning: '电影院', example: 'I go to the cinema by bus.' },
      { word: 'hospital', phonetic: '/ˈhɒspɪtl/', partOfSpeech: 'n.', meaning: '医院', example: 'The hospital is on Moon Street.' },
      { word: 'shop', phonetic: '/ʃɒp/', partOfSpeech: 'n.', meaning: '商店', example: 'There is a shop near my home.' },
      { word: 'zoo', phonetic: '/zuː/', partOfSpeech: 'n.', meaning: '动物园', example: 'I go to the zoo by metro.' },
      { word: 'supermarket', phonetic: '/ˈsuːpəmɑːkɪt/', partOfSpeech: 'n.', meaning: '超市', example: 'I go to the supermarket on foot.' },
      { word: 'full', phonetic: '/fʊl/', partOfSpeech: 'adj.', meaning: '满的', example: 'The bus is full.' },
      { word: 'over', phonetic: '/ˈəʊvə/', partOfSpeech: 'adj.', meaning: '结束了', example: 'School is over.' }
    ]},
    { unit: 3, title: 'Asking the way', words: [
      { word: 'ask the way', phonetic: '/ɑːsk ðə weɪ/', partOfSpeech: '', meaning: '问路', example: 'Can I ask you the way?' },
      { word: 'get to', phonetic: '/ɡet tuː/', partOfSpeech: '', meaning: '到达', example: 'How do I get to the cinema?' },
      { word: 'take', phonetic: '/teɪk/', partOfSpeech: 'v.', meaning: '搭乘', example: 'Take the metro.' },
      { word: 'get on', phonetic: '/ɡet ɒn/', partOfSpeech: '', meaning: '上车', example: 'Get on the bus.' },
      { word: 'get off', phonetic: '/ɡet ɒf/', partOfSpeech: '', meaning: '下车', example: 'Get off at Park Station.' },
      { word: 'walk', phonetic: '/wɔːk/', partOfSpeech: 'v.', meaning: '步行', example: 'Walk along this street.' },
      { word: 'bookshop', phonetic: '/ˈbʊkʃɒp/', partOfSpeech: 'n.', meaning: '书店', example: 'There is a bookshop on this street.' },
      { word: 'sun', phonetic: '/sʌn/', partOfSpeech: 'n.', meaning: '太阳', example: 'The sun is shining.' },
      { word: 'along', phonetic: '/əˈlɒŋ/', partOfSpeech: 'prep.', meaning: '沿着', example: 'Go along this street.' },
      { word: 'turn right', phonetic: '/tɜːn raɪt/', partOfSpeech: '', meaning: '向右转', example: 'Turn right at the traffic lights.' },
      { word: 'turn left', phonetic: '/tɜːn left/', partOfSpeech: '', meaning: '向左转', example: 'Then turn left.' },
      { word: 'traffic light', phonetic: '/ˈtræfɪk laɪt/', partOfSpeech: 'n.', meaning: '交通灯', example: 'Turn right at the traffic lights.' }
    ]},
    { unit: 4, title: 'Seeing the doctor', words: [
      { word: 'see the doctor', phonetic: '/siː ðə ˈdɒktə/', partOfSpeech: '', meaning: '看医生', example: 'I want to see the doctor.' },
      { word: 'feel', phonetic: '/fiːl/', partOfSpeech: 'v.', meaning: '感觉', example: 'I feel ill.' },
      { word: 'check', phonetic: '/tʃek/', partOfSpeech: 'v.', meaning: '检查', example: 'Let me check.' },
      { word: 'should', phonetic: '/ʃʊd/', partOfSpeech: 'v.', meaning: '应该', example: 'You should have a rest.' },
      { word: 'have a rest', phonetic: '/hæv ə rest/', partOfSpeech: '', meaning: '休息', example: 'You should have a rest at home.' },
      { word: 'take medicine', phonetic: '/teɪk ˈmedsɪn/', partOfSpeech: '', meaning: '吃药', example: 'Take some medicine.' },
      { word: 'drink water', phonetic: '/drɪŋk ˈwɔːtə/', partOfSpeech: '', meaning: '喝水', example: 'Drink some warm water.' },
      { word: 'toothache', phonetic: '/ˈtuːθeɪk/', partOfSpeech: 'n.', meaning: '牙疼', example: 'I have a toothache.' },
      { word: 'dentist', phonetic: '/ˈdentɪst/', partOfSpeech: 'n.', meaning: '牙医', example: 'You should go to see the dentist.' },
      { word: 'anything', phonetic: '/ˈeniθɪŋ/', partOfSpeech: 'pron.', meaning: '任何东西', example: "Don't eat anything before bedtime." },
      { word: 'brush one\'s teeth', phonetic: '/brʌʃ wʌnz tiːθ/', partOfSpeech: '', meaning: '刷牙', example: 'You should brush your teeth.' },
      { word: 'bedtime', phonetic: '/ˈbedtaɪm/', partOfSpeech: 'n.', meaning: '就寝时间', example: 'It is bedtime.' },
      { word: 'giraffe', phonetic: '/dʒɪˈrɑːf/', partOfSpeech: 'n.', meaning: '长颈鹿', example: 'The giraffe has a long neck.' },
      { word: 'show', phonetic: '/ʃəʊ/', partOfSpeech: 'v.', meaning: '给…看', example: 'Show me your teeth.' },
      { word: 'point at', phonetic: '/pɔɪnt æt/', partOfSpeech: '', meaning: '指着', example: 'Point at the picture.' },
      { word: 'neck', phonetic: '/nek/', partOfSpeech: 'n.', meaning: '脖子', example: 'The giraffe has a long neck.' }
    ]},
    { unit: 5, title: 'Helping our parents', words: [
      { word: 'parent', phonetic: '/ˈpeərənt/', partOfSpeech: 'n.', meaning: '父母', example: 'I am helping my parents.' },
      { word: 'clean', phonetic: '/kliːn/', partOfSpeech: 'v.', meaning: '擦洗', example: 'I am cleaning the car.' },
      { word: 'cook', phonetic: '/kʊk/', partOfSpeech: 'v.', meaning: '烧煮', example: 'My mother is cooking dinner.' },
      { word: 'sweep the floor', phonetic: '/swiːp ðə flɔː/', partOfSpeech: '', meaning: '扫地', example: 'I am sweeping the floor.' },
      { word: 'busy', phonetic: '/ˈbɪzi/', partOfSpeech: 'adj.', meaning: '忙的', example: 'We are busy.' },
      { word: 'wash the dishes', phonetic: '/wɒʃ ðə ˈdɪʃɪz/', partOfSpeech: '', meaning: '洗碗', example: 'He is washing the dishes.' },
      { word: 'make the bed', phonetic: '/meɪk ðə bed/', partOfSpeech: '', meaning: '整理床铺', example: 'She is making the bed.' },
      { word: 'grow', phonetic: '/ɡrəʊ/', partOfSpeech: 'v.', meaning: '种植', example: 'My father is growing grapes.' },
      { word: 'garden', phonetic: '/ˈɡɑːdn/', partOfSpeech: 'n.', meaning: '花园', example: 'We have a big garden.' },
      { word: 'sweet', phonetic: '/swiːt/', partOfSpeech: 'adj.', meaning: '甜的', example: 'The grapes are sweet.' },
      { word: 'pest', phonetic: '/pest/', partOfSpeech: 'n.', meaning: '害虫', example: 'There are pests on the grapes.' },
      { word: 'ladybird', phonetic: '/ˈleɪdibɜːd/', partOfSpeech: 'n.', meaning: '瓢虫', example: 'Ladybirds are good insects.' },
      { word: 'go away', phonetic: '/ɡəʊ əˈweɪ/', partOfSpeech: '', meaning: '走开', example: 'Go away, pests!' }
    ]},
    { unit: 6, title: 'In the kitchen', words: [
      { word: 'smell', phonetic: '/smel/', partOfSpeech: 'v.', meaning: '闻起来', example: 'It smells nice.' },
      { word: 'meat', phonetic: '/miːt/', partOfSpeech: 'n.', meaning: '肉', example: 'There is some meat.' },
      { word: 'vegetable', phonetic: '/ˈvedʒtəbl/', partOfSpeech: 'n.', meaning: '蔬菜', example: 'I like vegetables.' },
      { word: 'tomato', phonetic: '/təˈmɑːtəʊ/', partOfSpeech: 'n.', meaning: '番茄', example: 'There are some tomatoes.' },
      { word: 'favourite', phonetic: '/ˈfeɪvərɪt/', partOfSpeech: 'adj.', meaning: '最喜欢的', example: 'My favourite food is meat.' },
      { word: 'potato', phonetic: '/pəˈteɪtəʊ/', partOfSpeech: 'n.', meaning: '土豆', example: 'There are some potatoes.' }
    ]},
    { unit: 7, title: 'Chinese festivals', words: [
      { word: 'festival', phonetic: '/ˈfestɪvl/', partOfSpeech: 'n.', meaning: '节日', example: 'I like Chinese festivals.' },
      { word: 'Spring Festival', phonetic: '/sprɪŋ ˈfestɪvl/', partOfSpeech: 'n.', meaning: '春节', example: 'Spring Festival is in January or February.' },
      { word: 'Dragon Boat Festival', phonetic: '/ˈdræɡən bəʊt ˈfestɪvl/', partOfSpeech: 'n.', meaning: '端午节', example: 'Dragon Boat Festival is in May or June.' },
      { word: 'Mid-Autumn Festival', phonetic: '/mɪd ˈɔːtəm ˈfestɪvl/', partOfSpeech: 'n.', meaning: '中秋节', example: 'Mid-Autumn Festival is in September or October.' },
      { word: 'Double Ninth Festival', phonetic: '/ˈdʌbl naɪnθ ˈfestɪvl/', partOfSpeech: 'n.', meaning: '重阳节', example: 'Double Ninth Festival is in October or November.' },
      { word: 'May', phonetic: '/meɪ/', partOfSpeech: 'n.', meaning: '五月', example: 'Dragon Boat Festival is in May.' },
      { word: 'June', phonetic: '/dʒuːn/', partOfSpeech: 'n.', meaning: '六月', example: 'It is in June.' },
      { word: 'September', phonetic: '/sepˈtembə/', partOfSpeech: 'n.', meaning: '九月', example: 'It is in September.' },
      { word: 'October', phonetic: '/ɒkˈtəʊbə/', partOfSpeech: 'n.', meaning: '十月', example: 'It is in October.' },
      { word: 'November', phonetic: '/nəʊˈvembə/', partOfSpeech: 'n.', meaning: '十一月', example: 'It is in November.' },
      { word: 'dragon boat race', phonetic: '/ˈdræɡən bəʊt reɪs/', partOfSpeech: 'n.', meaning: '赛龙舟', example: 'We watch dragon boat races.' },
      { word: 'place', phonetic: '/pleɪs/', partOfSpeech: 'n.', meaning: '地方', example: 'What place is it?' },
      { word: 'rice dumpling', phonetic: '/raɪs ˈdʌmplɪŋ/', partOfSpeech: 'n.', meaning: '粽子', example: 'We eat rice dumplings.' },
      { word: 'moon cake', phonetic: '/muːn keɪk/', partOfSpeech: 'n.', meaning: '月饼', example: 'We eat moon cakes.' },
      { word: 'get together', phonetic: '/ɡet təˈɡeðə/', partOfSpeech: '', meaning: '团聚', example: 'Families get together.' },
      { word: 'dumpling', phonetic: '/ˈdʌmplɪŋ/', partOfSpeech: 'n.', meaning: '饺子', example: 'We eat dumplings at Spring Festival.' }
    ]},
    { unit: 8, title: 'Birthdays', words: [
      { word: 'birthday', phonetic: '/ˈbɜːθdeɪ/', partOfSpeech: 'n.', meaning: '生日', example: 'When is your birthday?' },
      { word: 'eleventh', phonetic: '/ɪˈlevənθ/', partOfSpeech: 'num.', meaning: '第十一', example: "It's on the eleventh of May." },
      { word: 'eighth', phonetic: '/eɪtθ/', partOfSpeech: 'num.', meaning: '第八', example: "It's on the eighth of April." },
      { word: 'April', phonetic: '/ˈeɪprəl/', partOfSpeech: 'n.', meaning: '四月', example: 'My birthday is in April.' },
      { word: 'together', phonetic: '/təˈɡeðə/', partOfSpeech: 'adv.', meaning: '一起', example: 'We play together.' },
      { word: 'March', phonetic: '/mɑːtʃ/', partOfSpeech: 'n.', meaning: '三月', example: 'Her birthday is in March.' },
      { word: 'July', phonetic: '/dʒuˈlaɪ/', partOfSpeech: 'n.', meaning: '七月', example: "It's in July." },
      { word: 'August', phonetic: '/ˈɔːɡəst/', partOfSpeech: 'n.', meaning: '八月', example: "It's in August." },
      { word: 'December', phonetic: '/dɪˈsembə/', partOfSpeech: 'n.', meaning: '十二月', example: "It's in December." },
      { word: 'hero', phonetic: '/ˈhɪərəʊ/', partOfSpeech: 'n.', meaning: '英雄', example: 'He is a hero in the play.' },
      { word: 'play', phonetic: '/pleɪ/', partOfSpeech: 'n.', meaning: '戏剧', example: 'We see a play.' },
      { word: 'number', phonetic: '/ˈnʌmbə/', partOfSpeech: 'n.', meaning: '数字', example: 'What number is it?' },
      { word: 'password', phonetic: '/ˈpɑːswɜːd/', partOfSpeech: 'n.', meaning: '密码', example: 'What is the password?' },
      { word: 'answer', phonetic: '/ˈɑːnsə/', partOfSpeech: 'n.', meaning: '答案', example: 'This is the answer.' },
      { word: 'fourth', phonetic: '/fɔːθ/', partOfSpeech: 'num.', meaning: '第四', example: "It's on the fourth of June." },
      { word: 'start', phonetic: '/stɑːt/', partOfSpeech: 'v.', meaning: '开始', example: 'The play starts at two.' },
      { word: 'fight', phonetic: '/faɪt/', partOfSpeech: 'v.', meaning: '打架', example: "Don't fight." }
    ]}
  ]},

  // ========== 六年级上册 (6A) ==========
  { grade: 6, semester: '上册', units: [
    { unit: 1, title: "The king's new clothes", words: [
      { word: 'long long ago', phonetic: '/lɒŋ lɒŋ əˈɡəʊ/', partOfSpeech: '', meaning: '很久以前', example: 'Long long ago, there was a king.' },
      { word: 'magic', phonetic: '/ˈmædʒɪk/', partOfSpeech: 'adj.', meaning: '有魔力的', example: 'The magic clothes are beautiful.' },
      { word: 'clever', phonetic: '/ˈklevə/', partOfSpeech: 'adj.', meaning: '聪明的', example: 'Clever people can see them.' },
      { word: 'foolish', phonetic: '/ˈfuːlɪʃ/', partOfSpeech: 'adj.', meaning: '愚蠢的', example: 'Foolish people cannot see them.' },
      { word: 'through', phonetic: '/θruː/', partOfSpeech: 'prep.', meaning: '穿过', example: 'The king walked through the city.' },
      { word: 'laugh', phonetic: '/lɑːf/', partOfSpeech: 'v.', meaning: '笑', example: 'A little boy laughed.' },
      { word: 'wear', phonetic: '/weə/', partOfSpeech: 'v.', meaning: '穿', example: 'The king wears new clothes.' },
      { word: 'tell', phonetic: '/tel/', partOfSpeech: 'v.', meaning: '讲述', example: 'Tell me a story.' },
      { word: 'story', phonetic: '/ˈstɔːri/', partOfSpeech: 'n.', meaning: '故事', example: 'I like this story.' },
      { word: 'each', phonetic: '/iːtʃ/', partOfSpeech: 'pron.', meaning: '每个', example: 'Each student says a sentence.' },
      { word: 'say', phonetic: '/seɪ/', partOfSpeech: 'v.', meaning: '说', example: 'He says, "What beautiful clothes!"' },
      { word: 'sentence', phonetic: '/ˈsentəns/', partOfSpeech: 'n.', meaning: '句子', example: 'Say the next sentence.' },
      { word: 'quick', phonetic: '/kwɪk/', partOfSpeech: 'adj.', meaning: '迅速的', example: 'Be quick!' },
      { word: 'next', phonetic: '/nekst/', partOfSpeech: 'adj.', meaning: '下一个', example: 'It is my turn next.' },
      { word: 'little', phonetic: '/ˈlɪtl/', partOfSpeech: 'adj.', meaning: '小的', example: 'A little boy laughed.' },
      { word: 'turn', phonetic: '/tɜːn/', partOfSpeech: 'n.', meaning: '机会', example: 'It is my turn.' },
      { word: 'think', phonetic: '/θɪŋk/', partOfSpeech: 'v.', meaning: '想', example: 'I think the king is foolish.' },
      { word: 'hard', phonetic: '/hɑːd/', partOfSpeech: 'adv.', meaning: '努力地', example: 'He works hard.' },
      { word: 'child', phonetic: '/tʃaɪld/', partOfSpeech: 'n.', meaning: '孩子', example: 'The child laughed.' },
      { word: 'turn into', phonetic: '/tɜːn ˈɪntuː/', partOfSpeech: '', meaning: '变成', example: 'The boy turned into a bird.' }
    ]},
    { unit: 2, title: 'What a day!', words: [
      { word: 'sunny', phonetic: '/ˈsʌni/', partOfSpeech: 'adj.', meaning: '晴朗的', example: 'It was sunny in the morning.' },
      { word: 'show', phonetic: '/ʃəʊ/', partOfSpeech: 'n.', meaning: '展览', example: 'We saw an interesting show.' },
      { word: 'interesting', phonetic: '/ˈɪntrəstɪŋ/', partOfSpeech: 'adj.', meaning: '有趣的', example: 'It was interesting.' },
      { word: 'weather', phonetic: '/ˈweðə/', partOfSpeech: 'n.', meaning: '天气', example: 'The weather became windy.' },
      { word: 'become', phonetic: '/bɪˈkʌm/', partOfSpeech: 'v.', meaning: '变成', example: 'It became cloudy.' },
      { word: 'windy', phonetic: '/ˈwɪndi/', partOfSpeech: 'adj.', meaning: '有风的', example: 'It was windy.' },
      { word: 'cloudy', phonetic: '/ˈklaʊdi/', partOfSpeech: 'adj.', meaning: '多云的', example: 'It became cloudy.' },
      { word: 'sky', phonetic: '/skaɪ/', partOfSpeech: 'n.', meaning: '天空', example: 'There were clouds in the sky.' },
      { word: 'bring', phonetic: '/brɪŋ/', partOfSpeech: 'v.', meaning: '带来', example: 'I brought some honey.' },
      { word: 'honey', phonetic: '/ˈhʌni/', partOfSpeech: 'n.', meaning: '蜂蜜', example: 'We brought some honey.' },
      { word: 'drink', phonetic: '/drɪŋk/', partOfSpeech: 'n.', meaning: '饮料', example: 'We brought some drinks.' },
      { word: 'ant', phonetic: '/ænt/', partOfSpeech: 'n.', meaning: '蚂蚁', example: 'There were some ants.' },
      { word: 'bee', phonetic: '/biː/', partOfSpeech: 'n.', meaning: '蜜蜂', example: 'There were some bees.' },
      { word: 'cloud', phonetic: '/klaʊd/', partOfSpeech: 'n.', meaning: '云', example: 'There were black clouds.' },
      { word: 'rain', phonetic: '/reɪn/', partOfSpeech: 'v.', meaning: '下雨', example: 'It rained.' },
      { word: 'rainy', phonetic: '/ˈreɪni/', partOfSpeech: 'adj.', meaning: '多雨的', example: 'It was a rainy day.' },
      { word: 'meet', phonetic: '/miːt/', partOfSpeech: 'v.', meaning: '遇见', example: 'I met my friend in the park.' },
      { word: 'lose', phonetic: '/luːz/', partOfSpeech: 'v.', meaning: '丢失', example: 'I lost my kite.' },
      { word: 'know', phonetic: '/nəʊ/', partOfSpeech: 'v.', meaning: '知道', example: 'I know what happened.' },
      { word: 'climb up', phonetic: '/klaɪm ʌp/', partOfSpeech: '', meaning: '爬上', example: 'We climbed up the hill.' },
      { word: 'hold onto', phonetic: '/həʊld ˈɒntuː/', partOfSpeech: '', meaning: '抓紧', example: 'Hold onto the kite.' },
      { word: 'fly away', phonetic: '/flaɪ əˈweɪ/', partOfSpeech: '', meaning: '飞走', example: 'The kite flew away.' }
    ]},
    { unit: 3, title: 'Holiday fun', words: [
      { word: 'holiday', phonetic: '/ˈhɒlədeɪ/', partOfSpeech: 'n.', meaning: '假日', example: 'Where did you go for the holiday?' },
      { word: 'National Day', phonetic: '/ˈnæʃnəl deɪ/', partOfSpeech: 'n.', meaning: '国庆节', example: 'It was National Day.' },
      { word: 'call', phonetic: '/kɔːl/', partOfSpeech: 'v.', meaning: '打电话', example: 'I called you yesterday.' },
      { word: 'Bund', phonetic: '/bʌnd/', partOfSpeech: 'n.', meaning: '外滩', example: 'I went to the Bund.' },
      { word: 'Shanghai Museum', phonetic: '/ʃæŋˈhaɪ mjuːˈziːəm/', partOfSpeech: 'n.', meaning: '上海博物馆', example: 'I visited the Shanghai Museum.' },
      { word: 'star', phonetic: '/stɑː/', partOfSpeech: 'n.', meaning: '星星', example: 'We saw many stars.' },
      { word: 'Great Wall', phonetic: '/ɡreɪt wɔːl/', partOfSpeech: 'n.', meaning: '长城', example: 'I went to the Great Wall.' },
      { word: 'Palace Museum', phonetic: '/ˈpæləs mjuːˈziːəm/', partOfSpeech: 'n.', meaning: '故宫', example: 'We visited the Palace Museum.' },
      { word: 'Summer Palace', phonetic: '/ˈsʌmə ˈpæləs/', partOfSpeech: 'n.', meaning: '颐和园', example: 'We went to the Summer Palace.' },
      { word: 'excited', phonetic: '/ɪkˈsaɪtɪd/', partOfSpeech: 'adj.', meaning: '激动的', example: 'I was so excited.' },
      { word: 'paper', phonetic: '/ˈpeɪpə/', partOfSpeech: 'n.', meaning: '纸', example: 'We used paper to make clothes.' },
      { word: 'ask', phonetic: '/ɑːsk/', partOfSpeech: 'v.', meaning: '问', example: 'He asked me a question.' },
      { word: 'bottle', phonetic: '/ˈbɒtl/', partOfSpeech: 'n.', meaning: '瓶子', example: 'There was a bottle of water.' },
      { word: 'go well', phonetic: '/ɡəʊ wel/', partOfSpeech: '', meaning: '进展顺利', example: 'The fashion show went well.' },
      { word: 'at first', phonetic: '/ət fɜːst/', partOfSpeech: '', meaning: '开始', example: 'At first, it was sunny.' },
      { word: 'heavy rain', phonetic: '/ˈhevi reɪn/', partOfSpeech: 'n.', meaning: '大雨', example: 'There was heavy rain.' }
    ]},
    { unit: 4, title: 'Then and now', words: [
      { word: 'then', phonetic: '/ðen/', partOfSpeech: 'adv.', meaning: '那时', example: 'Then, we used a telephone.' },
      { word: 'ago', phonetic: '/əˈɡəʊ/', partOfSpeech: 'adv.', meaning: '…以前', example: 'Six years ago, I was a baby.' },
      { word: 'use', phonetic: '/juːz/', partOfSpeech: 'v.', meaning: '使用', example: 'We use mobile phones now.' },
      { word: 'telephone', phonetic: '/ˈtelɪfəʊn/', partOfSpeech: 'n.', meaning: '电话', example: 'We used a telephone at home.' },
      { word: 'office', phonetic: '/ˈɒfɪs/', partOfSpeech: 'n.', meaning: '办公室', example: 'He worked in an office.' },
      { word: 'mobile phone', phonetic: '/ˈməʊbaɪl fəʊn/', partOfSpeech: 'n.', meaning: '手机', example: 'Now we use mobile phones.' },
      { word: 'anywhere', phonetic: '/ˈeniweə/', partOfSpeech: 'adv.', meaning: '随处', example: 'We can call people anywhere.' },
      { word: 'radio', phonetic: '/ˈreɪdiəʊ/', partOfSpeech: 'n.', meaning: '收音机', example: 'We listened to the radio.' },
      { word: 'newspaper', phonetic: '/ˈnjuːzpeɪpə/', partOfSpeech: 'n.', meaning: '报纸', example: 'He read newspapers for news.' },
      { word: 'news', phonetic: '/njuːz/', partOfSpeech: 'n.', meaning: '新闻', example: 'We get news from the Internet.' },
      { word: 'watch', phonetic: '/wɒtʃ/', partOfSpeech: 'v.', meaning: '观看', example: 'We watch TV for news.' },
      { word: 'e-book', phonetic: '/iː bʊk/', partOfSpeech: 'n.', meaning: '电子书', example: 'We read e-books now.' },
      { word: 'make friends', phonetic: '/meɪk frendz/', partOfSpeech: '', meaning: '交朋友', example: 'We make friends on the Internet.' },
      { word: 'all over the world', phonetic: '/ɔːl ˈəʊvə ðə wɜːld/', partOfSpeech: '', meaning: '全世界', example: 'We have friends all over the world.' },
      { word: 'do shopping', phonetic: '/duː ˈʃɒpɪŋ/', partOfSpeech: '', meaning: '购物', example: 'We do shopping on the Internet.' },
      { word: 'TV', phonetic: '/tiː viː/', partOfSpeech: 'n.', meaning: '电视', example: 'We watch TV at home.' },
      { word: 'look out of', phonetic: '/lʊk aʊt əv/', partOfSpeech: '', meaning: '朝外看', example: "Don't look out of the window." },
      { word: 'go on', phonetic: '/ɡəʊ ɒn/', partOfSpeech: '', meaning: '继续', example: 'The show goes on.' },
      { word: 'still', phonetic: '/stɪl/', partOfSpeech: 'adv.', meaning: '仍然', example: 'He still works hard.' },
      { word: 'spell', phonetic: '/spel/', partOfSpeech: 'v.', meaning: '拼写', example: 'Can you spell this word?' },
      { word: 'yesterday', phonetic: '/ˈjestədeɪ/', partOfSpeech: 'n.', meaning: '昨天', example: 'I went there yesterday.' }
    ]},
    { unit: 5, title: 'Signs', words: [
      { word: 'sign', phonetic: '/saɪn/', partOfSpeech: 'n.', meaning: '标识', example: 'What does this sign mean?' },
      { word: 'shopping centre', phonetic: '/ˈʃɒpɪŋ ˈsentə/', partOfSpeech: 'n.', meaning: '购物中心', example: 'We are at a shopping centre.' },
      { word: 'careful', phonetic: '/ˈkeəfl/', partOfSpeech: 'adj.', meaning: '小心的', example: 'Be careful!' },
      { word: 'mean', phonetic: '/miːn/', partOfSpeech: 'v.', meaning: '意思是', example: 'What does it mean?' },
      { word: 'floor', phonetic: '/flɔː/', partOfSpeech: 'n.', meaning: '地面', example: 'Wet floor!' },
      { word: 'litter', phonetic: '/ˈlɪtə/', partOfSpeech: 'v.', meaning: '乱扔垃圾', example: "Don't litter." },
      { word: 'go in', phonetic: '/ɡəʊ ɪn/', partOfSpeech: '', meaning: '进入', example: "You can't go in." },
      { word: 'take into', phonetic: '/teɪk ˈɪntuː/', partOfSpeech: '', meaning: '带入', example: "You can't take food into the shop." },
      { word: 'restaurant', phonetic: '/ˈrestrɒnt/', partOfSpeech: 'n.', meaning: '餐厅', example: 'There is a restaurant.' },
      { word: 'someone', phonetic: '/ˈsʌmwʌn/', partOfSpeech: 'pron.', meaning: '某人', example: 'Someone is smoking.' },
      { word: 'smoke', phonetic: '/sməʊk/', partOfSpeech: 'v.', meaning: '吸烟', example: "Don't smoke here." },
      { word: 'smell', phonetic: '/smel/', partOfSpeech: 'v.', meaning: '闻到', example: 'I can smell smoke.' }
    ]},
    { unit: 6, title: 'Keep our city clean', words: [
      { word: 'keep', phonetic: '/kiːp/', partOfSpeech: 'v.', meaning: '保持', example: 'Keep our city clean.' },
      { word: 'clean', phonetic: '/kliːn/', partOfSpeech: 'adj.', meaning: '干净的', example: 'Our city is not clean.' },
      { word: 'make', phonetic: '/meɪk/', partOfSpeech: 'v.', meaning: '使…变得', example: 'Smoke makes the air dirty.' },
      { word: 'air', phonetic: '/eə/', partOfSpeech: 'n.', meaning: '空气', example: 'The air is dirty.' },
      { word: 'dirty', phonetic: '/ˈdɜːti/', partOfSpeech: 'adj.', meaning: '肮脏的', example: 'The air is dirty.' },
      { word: 'smoke', phonetic: '/sməʊk/', partOfSpeech: 'n.', meaning: '烟雾', example: 'Smoke from cars makes the air dirty.' },
      { word: 'rubbish', phonetic: '/ˈrʌbɪʃ/', partOfSpeech: 'n.', meaning: '垃圾', example: 'There is rubbish in the river.' },
      { word: 'messy', phonetic: '/ˈmesi/', partOfSpeech: 'adj.', meaning: '乱的', example: 'The streets are messy.' },
      { word: 'dead', phonetic: '/ded/', partOfSpeech: 'adj.', meaning: '死的', example: 'The fish are dead.' },
      { word: 'move away', phonetic: '/muːv əˈweɪ/', partOfSpeech: '', meaning: '搬走', example: 'We should move some factories away.' },
      { word: 'bin', phonetic: '/bɪn/', partOfSpeech: 'n.', meaning: '垃圾桶', example: 'Put rubbish in the bin.' },
      { word: 'plant', phonetic: '/plɑːnt/', partOfSpeech: 'v.', meaning: '种植', example: 'We can plant more trees.' },
      { word: 'more', phonetic: '/mɔː/', partOfSpeech: 'adj.', meaning: '更多的', example: 'We need more trees.' }
    ]},
    { unit: 7, title: 'Protect the Earth', words: [
      { word: 'protect', phonetic: '/prəˈtekt/', partOfSpeech: 'v.', meaning: '保护', example: 'We should protect the Earth.' },
      { word: 'Earth', phonetic: '/ɜːθ/', partOfSpeech: 'n.', meaning: '地球', example: 'The Earth is our home.' },
      { word: 'save', phonetic: '/seɪv/', partOfSpeech: 'v.', meaning: '节约', example: 'We should save water.' },
      { word: 'useful', phonetic: '/ˈjuːsfl/', partOfSpeech: 'adj.', meaning: '有用的', example: 'Water is useful.' },
      { word: 'waste', phonetic: '/weɪst/', partOfSpeech: 'v.', meaning: '浪费', example: "Don't waste water." },
      { word: 'reuse', phonetic: '/riːˈjuːz/', partOfSpeech: 'v.', meaning: '再利用', example: 'We can reuse water.' },
      { word: 'energy', phonetic: '/ˈenədʒi/', partOfSpeech: 'n.', meaning: '能源', example: 'We use a lot of energy.' },
      { word: 'most', phonetic: '/məʊst/', partOfSpeech: 'adj.', meaning: '大部分', example: 'Most energy comes from coal.' },
      { word: 'come from', phonetic: '/kʌm frɒm/', partOfSpeech: '', meaning: '来自', example: 'Energy comes from coal and oil.' },
      { word: 'coal', phonetic: '/kəʊl/', partOfSpeech: 'n.', meaning: '煤炭', example: 'Coal is a kind of energy.' }
    ]},
    { unit: 8, title: 'Chinese New Year', words: [
      { word: 'get', phonetic: '/ɡet/', partOfSpeech: 'v.', meaning: '收到', example: 'I got a red packet.' },
      { word: 'Hong Kong', phonetic: '/hɒŋ kɒŋ/', partOfSpeech: 'n.', meaning: '香港', example: "I'm going to Hong Kong." },
      { word: 'next week', phonetic: '/nekst wiːk/', partOfSpeech: '', meaning: '下周', example: 'Chinese New Year is next week.' },
      { word: 'food', phonetic: '/fuːd/', partOfSpeech: 'n.', meaning: '食物', example: 'We are going to buy some food.' },
      { word: 'tangyuan', phonetic: '/tæŋˈjuːæn/', partOfSpeech: 'n.', meaning: '汤圆', example: 'We are going to make tangyuan.' },
      { word: "Chinese New Year's Eve", phonetic: '', partOfSpeech: 'n.', meaning: '除夕', example: "It is Chinese New Year's Eve." },
      { word: "Chinese New Year's Day", phonetic: '', partOfSpeech: 'n.', meaning: '大年初一', example: "It is Chinese New Year's Day." },
      { word: 'red packet', phonetic: '/red ˈpækɪt/', partOfSpeech: 'n.', meaning: '红包', example: 'I got a red packet.' },
      { word: 'lion dance', phonetic: '/ˈlaɪən dɑːns/', partOfSpeech: 'n.', meaning: '舞狮', example: 'We are going to watch a lion dance.' },
      { word: 'fireworks', phonetic: '/ˈfaɪəwɜːks/', partOfSpeech: 'n.', meaning: '烟花', example: 'We are going to watch fireworks.' }
    ]}
  ]},

  // ========== 六年级下册 (6B) ==========
  { grade: 6, semester: '下册', units: [
    { unit: 1, title: 'The lion and the mouse', words: [
      { word: 'mouse', phonetic: '/maʊs/', partOfSpeech: 'n.', meaning: '老鼠', example: 'A mouse walked by.' },
      { word: 'large', phonetic: '/lɑːdʒ/', partOfSpeech: 'adj.', meaning: '大的', example: 'The lion was large and strong.' },
      { word: 'strong', phonetic: '/strɒŋ/', partOfSpeech: 'adj.', meaning: '强壮的', example: 'The lion was strong.' },
      { word: 'quietly', phonetic: '/ˈkwaɪətli/', partOfSpeech: 'adv.', meaning: '安静地', example: 'The mouse said quietly.' },
      { word: 'weak', phonetic: '/wiːk/', partOfSpeech: 'adj.', meaning: '弱小的', example: 'The mouse was weak.' },
      { word: 'loudly', phonetic: '/ˈlaʊdli/', partOfSpeech: 'adv.', meaning: '大声地', example: 'The lion laughed loudly.' },
      { word: 'happily', phonetic: '/ˈhæpɪli/', partOfSpeech: 'adv.', meaning: '开心地', example: 'They played happily.' },
      { word: 'soon', phonetic: '/suːn/', partOfSpeech: 'adv.', meaning: '不久', example: 'Soon, the lion was in a net.' },
      { word: 'sharp', phonetic: '/ʃɑːp/', partOfSpeech: 'adj.', meaning: '锋利的', example: 'The mouse has sharp teeth.' },
      { word: 'bite', phonetic: '/baɪt/', partOfSpeech: 'v.', meaning: '咬', example: 'The mouse bit the net.' },
      { word: 'net', phonetic: '/net/', partOfSpeech: 'n.', meaning: '网', example: 'The lion was in a net.' },
      { word: 'just then', phonetic: '/dʒʌst ðen/', partOfSpeech: '', meaning: '就在那时', example: 'Just then, the mouse came.' },
      { word: 'sadly', phonetic: '/ˈsædli/', partOfSpeech: 'adv.', meaning: '难过地', example: 'The lion said sadly.' },
      { word: 'let go', phonetic: '/let ɡəʊ/', partOfSpeech: '', meaning: '释放', example: 'The lion let the mouse go.' },
      { word: 'the next day', phonetic: '/ðə nekst deɪ/', partOfSpeech: '', meaning: '第二天', example: 'The next day, the lion was caught.' },
      { word: 'cheer', phonetic: '/tʃɪə/', partOfSpeech: 'v.', meaning: '欢呼', example: 'The animals cheered.' },
      { word: 'hit', phonetic: '/hɪt/', partOfSpeech: 'v.', meaning: '打', example: 'The ball hit the window.' },
      { word: 'deep', phonetic: '/diːp/', partOfSpeech: 'adj.', meaning: '深的', example: 'The hole is deep.' },
      { word: 'reach', phonetic: '/riːtʃ/', partOfSpeech: 'v.', meaning: '够得着', example: 'I cannot reach it.' }
    ]},
    { unit: 2, title: 'Good habits', words: [
      { word: 'habit', phonetic: '/ˈhæbɪt/', partOfSpeech: 'n.', meaning: '习惯', example: 'He has some good habits.' },
      { word: 'tidy', phonetic: '/ˈtaɪdi/', partOfSpeech: 'adj.', meaning: '整洁的', example: 'He keeps his room tidy.' },
      { word: 'finish', phonetic: '/ˈfɪnɪʃ/', partOfSpeech: 'v.', meaning: '完成', example: 'He finishes his homework before dinner.' },
      { word: 'fast', phonetic: '/fɑːst/', partOfSpeech: 'adv.', meaning: '快地', example: 'He runs fast.' },
      { word: 'bad', phonetic: '/bæd/', partOfSpeech: 'adj.', meaning: '坏的', example: 'That is a bad habit.' },
      { word: 'sleepy', phonetic: '/ˈsliːpi/', partOfSpeech: 'adj.', meaning: '困倦的', example: 'I feel sleepy in class.' },
      { word: 'last night', phonetic: '/lɑːst naɪt/', partOfSpeech: '', meaning: '昨晚', example: 'I went to bed late last night.' },
      { word: 'slowly', phonetic: '/ˈsləʊli/', partOfSpeech: 'adv.', meaning: '慢慢地', example: 'He walks slowly.' },
      { word: 'badly', phonetic: '/ˈbædli/', partOfSpeech: 'adv.', meaning: '糟糕地', example: 'He did his homework badly.' }
    ]},
    { unit: 3, title: 'A healthy diet', words: [
      { word: 'healthy', phonetic: '/ˈhelθi/', partOfSpeech: 'adj.', meaning: '健康的', example: 'We should eat healthy food.' },
      { word: 'diet', phonetic: '/ˈdaɪət/', partOfSpeech: 'n.', meaning: '饮食', example: 'A healthy diet is important.' },
      { word: 'a little', phonetic: '/ə ˈlɪtl/', partOfSpeech: '', meaning: '一点（不可数）', example: 'He eats a little rice.' },
      { word: 'a few', phonetic: '/ə fjuː/', partOfSpeech: '', meaning: '几个（可数）', example: 'He eats a few eggs.' },
      { word: 'cola', phonetic: '/ˈkəʊlə/', partOfSpeech: 'n.', meaning: '可乐', example: "Don't drink too much cola." },
      { word: 'need', phonetic: '/niːd/', partOfSpeech: 'v.', meaning: '需要', example: 'We need a lot of rice every day.' }
    ]},
    { unit: 4, title: 'Road safety', words: [
      { word: 'road', phonetic: '/rəʊd/', partOfSpeech: 'n.', meaning: '道路', example: 'Road safety is important.' },
      { word: 'safety', phonetic: '/ˈseɪfti/', partOfSpeech: 'n.', meaning: '安全', example: 'We should follow road safety rules.' },
      { word: 'safely', phonetic: '/ˈseɪfli/', partOfSpeech: 'adv.', meaning: '安全地', example: 'Cross the road safely.' },
      { word: 'cross', phonetic: '/krɒs/', partOfSpeech: 'v.', meaning: '穿过', example: 'How do you cross the road safely?' },
      { word: 'pavement', phonetic: '/ˈpeɪvmənt/', partOfSpeech: 'n.', meaning: '人行道', example: 'Walk on the pavement.' },
      { word: 'look out for', phonetic: '/lʊk aʊt fɔː/', partOfSpeech: '', meaning: '当心', example: 'Look out for cars.' },
      { word: 'traffic lights', phonetic: '/ˈtræfɪk laɪts/', partOfSpeech: 'n.', meaning: '交通灯', example: 'Wait for the traffic lights.' },
      { word: 'zebra crossing', phonetic: '/ˈziːbrə ˈkrɒsɪŋ/', partOfSpeech: 'n.', meaning: '斑马线', example: 'Cross at the zebra crossing.' },
      { word: 'rule', phonetic: '/ruːl/', partOfSpeech: 'n.', meaning: '规则', example: 'Follow the rules.' },
      { word: 'follow', phonetic: '/ˈfɒləʊ/', partOfSpeech: 'v.', meaning: '遵守', example: 'We must follow the rules.' }
    ]},
    { unit: 5, title: 'A party', words: [
      { word: 'party', phonetic: '/ˈpɑːti/', partOfSpeech: 'n.', meaning: '聚会', example: 'We are going to have a party.' },
      { word: 'balloon', phonetic: '/bəˈluːn/', partOfSpeech: 'n.', meaning: '气球', example: 'We are going to bring some balloons.' },
      { word: 'snack', phonetic: '/snæk/', partOfSpeech: 'n.', meaning: '零食', example: 'We are going to bring some snacks.' },
      { word: 'fruit', phonetic: '/fruːt/', partOfSpeech: 'n.', meaning: '水果', example: 'Bring some fruit to the party.' },
      { word: 'drink', phonetic: '/drɪŋk/', partOfSpeech: 'n.', meaning: '饮料', example: 'We are going to bring some drinks.' },
      { word: 'bring', phonetic: '/brɪŋ/', partOfSpeech: 'v.', meaning: '带来', example: 'What are you going to bring?' }
    ]},
    { unit: 6, title: 'An interesting country', words: [
      { word: 'country', phonetic: '/ˈkʌntri/', partOfSpeech: 'n.', meaning: '国家', example: 'Australia is an interesting country.' },
      { word: 'interesting', phonetic: '/ˈɪntrəstɪŋ/', partOfSpeech: 'adj.', meaning: '有趣的', example: 'It is an interesting country.' },
      { word: 'Australia', phonetic: '/ɒˈstreɪliə/', partOfSpeech: 'n.', meaning: '澳大利亚', example: 'I will go to Australia.' },
      { word: 'kangaroo', phonetic: '/ˌkæŋɡəˈruː/', partOfSpeech: 'n.', meaning: '袋鼠', example: 'Kangaroos live in Australia.' },
      { word: 'koala', phonetic: '/kəʊˈɑːlə/', partOfSpeech: 'n.', meaning: '考拉', example: 'Koalas are cute.' },
      { word: 'Sydney', phonetic: '/ˈsɪdni/', partOfSpeech: 'n.', meaning: '悉尼', example: 'Sydney is a big city.' },
      { word: 'find out', phonetic: '/faɪnd aʊt/', partOfSpeech: '', meaning: '发现', example: 'I want to find out about Australia.' },
      { word: 'magazine', phonetic: '/ˌmæɡəˈziːn/', partOfSpeech: 'n.', meaning: '杂志', example: 'I will read about it in magazines.' }
    ]},
    { unit: 7, title: 'Summer holiday plans', words: [
      { word: 'summer holiday', phonetic: '/ˈsʌmə ˈhɒlədeɪ/', partOfSpeech: 'n.', meaning: '暑假', example: 'What are your summer holiday plans?' },
      { word: 'travel', phonetic: '/ˈtrævl/', partOfSpeech: 'v.', meaning: '旅游', example: 'I will travel to Beijing.' },
      { word: 'plan', phonetic: '/plæn/', partOfSpeech: 'n.', meaning: '计划', example: 'What is your plan?' },
      { word: 'will', phonetic: '/wɪl/', partOfSpeech: 'v.', meaning: '将要', example: 'I will go to Shanghai.' },
      { word: 'Beijing', phonetic: '/beɪˈdʒɪŋ/', partOfSpeech: 'n.', meaning: '北京', example: 'I will go to Beijing.' },
      { word: 'Disneyland', phonetic: '/ˈdɪznilænd/', partOfSpeech: 'n.', meaning: '迪士尼乐园', example: "I'll visit Disneyland." },
      { word: 'Ocean Park', phonetic: '/ˈəʊʃn pɑːk/', partOfSpeech: 'n.', meaning: '海洋公园', example: "I'll go to Ocean Park." },
      { word: 'Taipei', phonetic: '/taɪˈpeɪ/', partOfSpeech: 'n.', meaning: '台北', example: "I'll go to Taipei." }
    ]},
    { unit: 8, title: 'Our dreams', words: [
      { word: 'dream', phonetic: '/driːm/', partOfSpeech: 'n.', meaning: '梦想', example: 'What is your dream?' },
      { word: 'future', phonetic: '/ˈfjuːtʃə/', partOfSpeech: 'n.', meaning: '将来', example: 'What do you want to be in the future?' },
      { word: 'astronaut', phonetic: '/ˈæstrənɔːt/', partOfSpeech: 'n.', meaning: '宇航员', example: 'I want to be an astronaut.' },
      { word: 'spaceship', phonetic: '/ˈspeɪsʃɪp/', partOfSpeech: 'n.', meaning: '宇宙飞船', example: 'A spaceship flies to the moon.' },
      { word: 'dancer', phonetic: '/ˈdɑːnsə/', partOfSpeech: 'n.', meaning: '舞蹈家', example: 'She wants to be a dancer.' },
      { word: 'pianist', phonetic: '/ˈpɪənɪst/', partOfSpeech: 'n.', meaning: '钢琴家', example: 'He wants to be a pianist.' },
      { word: 'football player', phonetic: '/ˈfʊtbɔːl ˈpleɪə/', partOfSpeech: 'n.', meaning: '足球运动员', example: 'I want to be a football player.' },
      { word: 'writer', phonetic: '/ˈraɪtə/', partOfSpeech: 'n.', meaning: '作家', example: 'I want to be a writer.' },
      { word: 'dentist', phonetic: '/ˈdentɪst/', partOfSpeech: 'n.', meaning: '牙医', example: 'He wants to be a dentist.' },
      { word: 'brave', phonetic: '/breɪv/', partOfSpeech: 'adj.', meaning: '勇敢的', example: 'Astronauts are brave.' },
      { word: 'artist', phonetic: '/ˈɑːtɪst/', partOfSpeech: 'n.', meaning: '艺术家', example: 'She wants to be an artist.' }
    ]}
  ]}
];

// ========== 兼容旧接口 + 新接口 ==========
// 将 VOCAB_DATA 扁平化为 BUILTIN_VOCAB（兼容旧代码中 startReviewSession 等处的直接引用）
var BUILTIN_VOCAB = [];
for (var i = 0; i < VOCAB_DATA.length; i++) {
  var book = VOCAB_DATA[i];
  for (var j = 0; j < book.units.length; j++) {
    var unit = book.units[j];
    for (var k = 0; k < unit.words.length; k++) {
      var w = unit.words[k];
      BUILTIN_VOCAB.push({
        word: w.word,
        phonetic: w.phonetic,
        partOfSpeech: w.partOfSpeech,
        meaning: w.meaning,
        example: w.example,
        grade: book.grade,
        semester: book.semester,
        unit: unit.unit
      });
    }
  }
}

/**
 * 获取所有年级-学期组合
 * @returns {Array<{grade: number, semester: string}>}
 */
function getAllGradeSemesters() {
  var result = [];
  for (var i = 0; i < VOCAB_DATA.length; i++) {
    result.push({ grade: VOCAB_DATA[i].grade, semester: VOCAB_DATA[i].semester });
  }
  return result;
}

/**
 * 获取所有年级（兼容旧接口）
 * @returns {number[]}
 */
function getAllGrades() {
  var grades = [];
  for (var i = 0; i < VOCAB_DATA.length; i++) {
    var g = VOCAB_DATA[i].grade;
    if (grades.indexOf(g) === -1) grades.push(g);
  }
  return grades;
}

/**
 * 获取指定年级的学期列表
 * @param {number} grade
 * @returns {string[]}
 */
function getSemestersByGrade(grade) {
  var result = [];
  for (var i = 0; i < VOCAB_DATA.length; i++) {
    if (VOCAB_DATA[i].grade === grade) {
      result.push(VOCAB_DATA[i].semester);
    }
  }
  return result;
}

/**
 * 获取指定年级的单元列表（兼容旧接口，默认取上册）
 * @param {number} grade
 * @returns {number[]}
 */
function getUnitsByGrade(grade) {
  return getUnitsByGradeSemester(grade, '上册');
}

/**
 * 获取指定年级+学期的单元列表
 * @param {number} grade
 * @param {string} semester
 * @returns {Array<{unit: number, title: string}>}
 */
function getUnitsByGradeSemester(grade, semester) {
  for (var i = 0; i < VOCAB_DATA.length; i++) {
    if (VOCAB_DATA[i].grade === grade && VOCAB_DATA[i].semester === semester) {
      var result = [];
      for (var j = 0; j < VOCAB_DATA[i].units.length; j++) {
        result.push({ unit: VOCAB_DATA[i].units[j].unit, title: VOCAB_DATA[i].units[j].title });
      }
      return result;
    }
  }
  return [];
}

/**
 * 获取指定年级+单元的单词（兼容旧接口，默认取上册）
 * @param {number} grade
 * @param {number} unit
 * @returns {Object[]}
 */
function getWordsByGradeUnit(grade, unit) {
  return getWordsByGradeSemesterUnit(grade, '上册', unit);
}

/**
 * 获取指定年级+学期+单元的单词
 * @param {number} grade
 * @param {string} semester
 * @param {number} unit
 * @returns {Object[]}
 */
function getWordsByGradeSemesterUnit(grade, semester, unit) {
  for (var i = 0; i < VOCAB_DATA.length; i++) {
    if (VOCAB_DATA[i].grade === grade && VOCAB_DATA[i].semester === semester) {
      for (var j = 0; j < VOCAB_DATA[i].units.length; j++) {
        if (VOCAB_DATA[i].units[j].unit === unit) {
          var words = VOCAB_DATA[i].units[j].words;
          var result = [];
          for (var k = 0; k < words.length; k++) {
            result.push({
              word: words[k].word,
              phonetic: words[k].phonetic,
              partOfSpeech: words[k].partOfSpeech,
              meaning: words[k].meaning,
              example: words[k].example,
              grade: grade,
              semester: semester,
              unit: unit
            });
          }
          return result;
        }
      }
    }
  }
  return [];
}

/**
 * 获取干扰项（选择题用）
 * @param {string} correctMeaning - 正确释义
 * @param {number} grade
 * @param {string} semester
 * @param {number} unit
 * @param {number} count
 * @returns {string[]}
 */
function getDistractors(correctMeaning, grade, semester, unit, count) {
  var allWords = getWordsByGradeSemesterUnit(grade, semester, unit);
  var pool = [];
  for (var i = 0; i < allWords.length; i++) {
    if (allWords[i].meaning !== correctMeaning) {
      pool.push(allWords[i].meaning);
    }
  }
  // 如果同单元干扰项不够，从同册其他单元补充
  if (pool.length < count) {
    var allUnits = getUnitsByGradeSemester(grade, semester);
    for (var u = 0; u < allUnits.length; u++) {
      if (allUnits[u].unit === unit) continue;
      var uWords = getWordsByGradeSemesterUnit(grade, semester, allUnits[u].unit);
      for (var w = 0; w < uWords.length; w++) {
        if (uWords[w].meaning !== correctMeaning && pool.indexOf(uWords[w].meaning) === -1) {
          pool.push(uWords[w].meaning);
        }
      }
    }
  }
  // 随机打乱
  for (var s = pool.length - 1; s > 0; s--) {
    var r = Math.floor(Math.random() * (s + 1));
    var temp = pool[s];
    pool[s] = pool[r];
    pool[r] = temp;
  }
  return pool.slice(0, count);
}
