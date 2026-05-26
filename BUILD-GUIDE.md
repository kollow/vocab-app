# 单词小达人 - APK 打包指南

本指南介绍如何在没有本地 Android 开发环境的情况下，通过 GitHub Actions 自动编译 APK。

## 方案概览

```
你的代码修改 → push 到 GitHub → GitHub Actions 自动编译 → 下载 APK
```

无需安装 Android Studio、JDK、SDK——全部在云端完成。

---

## 第一步：创建 GitHub 仓库

1. 打开 [github.com/new](https://github.com/new)
2. 仓库名称：`vocab-app`（或任意名称）
3. 选择 **Public**（免费）或 **Private**（需要 GitHub Pro 才能用 Actions）
4. 不勾选 "Initialize this repository with a README"
5. 点击 **Create repository**

---

## 第二步：推送代码到 GitHub

在项目根目录（`deliverables/software-company/vocab-app/`）执行：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: vocab app v2.2"

# 关联远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/vocab-app.git

# 推送
git push -u origin main
```

> 如果默认分支是 `master` 而不是 `main`，用 `git push -u origin master`

---

## 第三步：触发构建

推送代码后，GitHub Actions 会自动开始构建。你也可以手动触发：

1. 打开仓库页面 → 点击 **Actions** 标签
2. 选择左侧的 **Build APK** 工作流
3. 点击右侧的 **Run workflow** → **Run workflow**

---

## 第四步：下载 APK

构建完成后（约 3-5 分钟）：

1. 进入仓库的 **Actions** 页面
2. 点击最新的构建记录
3. 滚动到底部，找到 **Artifacts** 区域
4. 下载以下任一文件：
   - `vocab-app-debug-apk` — 调试版（推荐日常测试用）
   - `vocab-app-release-apk` — 发布版（未签名，如需签名需额外配置）

下载后解压 ZIP，得到 `app-debug.apk`，即可安装到手机。

---

## 后续修改后如何重新打包

每次修改代码后，只需：

```bash
git add .
git commit -m "更新内容描述"
git push
```

GitHub Actions 会自动重新编译 APK。

---

## 项目结构说明

```
vocab-app/
├── .github/workflows/build-apk.yml   # CI 配置（已创建）
├── android/                           # Android 项目
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── assets/www/           # PWA 静态资源
│   │   │   ├── java/com/vocabapp/mini/MainActivity.java
│   │   │   ├── res/mipmap-*/        # 应用图标（已生成）
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   ├── gradle/wrapper/               # Gradle Wrapper（已补全）
│   ├── gradlew / gradlew.bat         # 构建脚本（已创建）
│   └── build.gradle
├── css/style.css
├── js/app.js / importer.js / ...
├── index.html
├── manifest.json
└── sw.js
```

---

## 常见问题

### 1. 构建失败怎么办？
- 进入 Actions 页面 → 点击失败的构建 → 查看日志
- 常见问题：文件权限、依赖版本冲突

### 2. 如何给 APK 签名？
如需发布到应用商店，需要配置签名密钥。在 `android/app/build.gradle` 中添加签名配置：

```gradle
android {
    signingConfigs {
        release {
            storeFile file("my-release-key.jks")
            storePassword "密码"
            keyAlias "别名"
            keyPassword "密码"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

> 生产环境建议将密钥密码存入 GitHub Secrets，通过环境变量引用，不要硬编码。

### 3. 修改 Web 代码后需要同步到 android/assets/www/ 吗？

**需要。** `android/app/src/main/assets/www/` 是 APK 内置的资源目录，修改根目录的 `css/`、`js/`、`index.html` 等文件后，必须同步到 `assets/www/` 下，否则 APK 打包的是旧版本。

同步命令（在项目根目录执行）：

```bash
# Windows PowerShell
Copy-Item -Path "css/*","js/*","index.html","manifest.json","sw.js","icons/*" -Destination "android/app/src/main/assets/www/" -Recurse -Force

# 或者手动复制粘贴
```

---

## 技术栈

- **前端**：HTML5 + CSS + Vanilla JS（PWA）
- **Android 壳**：WebView + Gradle
- **CI/CD**：GitHub Actions + Ubuntu + JDK 17
- **构建工具**：Gradle 8.0
- **最低 Android 版本**：Android 7.0 (API 24)
- **目标 Android 版本**：Android 14 (API 34)
