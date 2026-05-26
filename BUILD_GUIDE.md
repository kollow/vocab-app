# 单词小达人 - APK 编译指南

## 方法一：Android Studio 编译（推荐）

### 前置条件
- 安装 [Android Studio](https://developer.android.com/studio)（最新版）
- 安装 JDK 17+

### 编译步骤

1. 打开 Android Studio
2. 选择 **File → Open**
3. 打开 `android` 文件夹（本项目内的 android 目录）
4. 等待 Gradle 同步完成（首次可能需要几分钟下载依赖）
5. 点击 **Build → Build Bundle(s) / APK(s) → Build APK(s)**
6. 编译完成后，APK 文件位于：
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```
7. 将 APK 传输到安卓手机安装即可

### 生成签名APK（用于发布）

1. 点击 **Build → Generate Signed Bundle / APK...**
2. 选择 **APK** → **Next**
3. 创建新的 keystore 或选择已有的
4. 选择 **release** 构建类型
5. 点击 **Create** 生成

---

## 方法二：命令行编译

```bash
cd android
./gradlew assembleDebug
# APK 位于 app/build/outputs/apk/debug/app-debug.apk
```

---

## 方法三：在线工具（无需安装任何软件）

如果不想安装 Android Studio，可以使用以下在线工具将 PWA 转为 APK：

### PWABuilder（微软提供，免费）
1. 将本应用部署到一个 HTTPS URL（如 GitHub Pages）
2. 访问 [https://www.pwabuilder.com/](https://www.pwabuilder.com/)
3. 输入你的 PWA URL
4. 点击 **Build My PWA** → 选择 **Android**
5. 下载生成的 APK

### PWA2APK
1. 访问 [https://pwa2apk.com/](https://pwa2apk.com/)
2. 输入 PWA URL
3. 一键生成 APK

---

## 方法四：直接在手机上使用（最快）

**无需 APK，直接用浏览器打开！**

1. 将 `index.html` 及所有文件传输到手机
2. 用 Chrome 浏览器打开 `index.html`
3. 点击浏览器菜单 → **"添加到主屏幕"**
4. 桌面会出现"单词小达人"图标，点击即用
5. 体验与原生 App 几乎一致

---

## 项目结构

```
vocab-app/
├── index.html              # 主页面（PWA入口）
├── manifest.json           # PWA配置
├── sw.js                   # Service Worker（离线缓存）
├── css/style.css           # 样式（卡通风格）
├── js/
│   ├── app.js              # 主控制器（路由/页面切换）
│   ├── vocab.js            # 内置词库（译林版3-6年级）
│   ├── storage.js          # IndexedDB封装
│   ├── study.js            # 背诵逻辑（卡片/选择/拼写）
│   ├── review.js           # 艾宾浩斯复习算法
│   ├── tts.js              # Web Speech API发音
│   └── wordlist.js         # 词库管理（自定义词库CRUD）
├── icons/                  # 应用图标
├── android/                # Android项目（用于编译APK）
│   ├── build.gradle
│   ├── settings.gradle
│   ├── gradle/
│   └── app/
│       ├── build.gradle
│       └── src/main/
│           ├── AndroidManifest.xml
│           ├── java/com/vocabapp/mini/MainActivity.java
│           ├── assets/www/    # PWA文件副本
│           └── res/values/    # Android资源
└── BUILD_GUIDE.md           # 本文件
```
