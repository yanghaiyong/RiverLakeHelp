# RiverLake Help

基于 Spring Boot + Vue 3 + Capacitor 构建的跨平台应用。

## 技术栈

- **后端**: Spring Boot 3.2 + Java 17
- **前端**: Vue 3 + Vite
- **移动端**: Capacitor 6
- **通信**: REST API

## 项目结构

```
RiverLakeHelp/
├── backend/                 # Spring Boot 后端
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/riverlake/
│   │       │       ├── config/       # 配置类
│   │       │       ├── controller/   # 控制器
│   │       │       └── RiverLakeHelpApplication.java
│   │       └── resources/
│   │           └── application.yml
│   └── pom.xml
│
├── frontend/                # Vue 3 前端
│   ├── src/
│   │   ├── plugins/        # 插件配置
│   │   ├── App.vue         # 主组件
│   │   └── main.js        # 入口文件
│   ├── capacitor.config.json
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 快速开始

### 后端启动

```bash
cd backend
mvn spring-boot:run
```

后端将在 http://localhost:8080 启动

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

前端将在 http://localhost:5173 启动

### 构建移动应用

```bash
cd riverlake-help-frontend

# 安装依赖
npm install

# 构建 Web 资源
npm run capacitor:build
```

## Android 构建（Windows/Mac/Linux）

### 方式一：Android Studio

```bash
cd riverlake-help-frontend

# 添加 Android 平台
npx cap add android

# 同步 Web 资源
npx cap sync android

# 打开 Android Studio
npx cap open android
```

在 Android Studio 中：`Build → Build APK`

### 方式二：命令行构建

```bash
cd riverlake-help-frontend/android
./gradlew assembleDebug
```

APK 文件位于：`android/app/build/outputs/apk/debug/app-debug.apk`

## iOS 构建（仅限 Mac）

### 前提条件

- macOS 系统
- Xcode 已安装
- Apple Developer 账号（如需真机安装）

### 构建步骤

```bash
cd riverlake-help-frontend

# 安装依赖
npm install

# 安装 iOS 平台
npm install @capacitor/ios@^6.0.0
npx cap add ios

# 同步 Web 资源
npx cap sync ios

# 安装 CocoaPods 依赖
cd ios/App
pod install
```

### 模拟器运行

```bash
cd ios/App

# 启动模拟器
open -a Simulator

# 运行应用
xcodebuild -workspace App.xcworkspace -scheme App -destination 'platform=iOS Simulator,name=iPhone 15' -derivedDataPath ./build build

# 或者使用 Capacitor 运行
npx cap run ios
```

### 真机部署

1. 在 Xcode 中配置签名：
   - 点击项目 → Signing & Capabilities
   - 选择 Team
   - 勾选 "Automatically manage signing"

2. 连接真机设备，运行：
   ```bash
   xcodebuild -workspace App.xcworkspace -scheme App -destination 'generic/platform=iOS' -exportArchive -exportPath ./output build
   ```

## CI/CD 构建

本项目已配置 GitHub Actions，可自动构建 iOS 应用。

详见：`.github/workflows/ios.yml`

### 触发构建

- 推送代码到 master 分支自动触发
- 或在 GitHub Actions 页面手动触发

## 部署说明

本项目支持 3 种部署目标：

### 1. Web 网站部署（单体应用）

将前端构建到 Spring Boot 资源目录：

```bash
# 步骤1: 构建前端
cd frontend
npm install
npm run build

# 步骤2: 复制构建产物到 Spring Boot 静态资源目录
# Windows:
xcopy /E /I frontend\dist\* backend\src\main\resources\static\
# Linux/Mac:
cp -r frontend/dist/* backend/src/main/resources/static/

# 步骤3: 构建后端 JAR
cd backend
mvn clean package -DskipTests

# 步骤4: 运行
java -jar target/riverlake-help-backend-1.0.0.jar
# 访问 http://localhost:8080
```

### 2. Android 应用部署

```bash
cd frontend

# 安装依赖
npm install

# 构建 Web 资源
npm run build

# 添加 Android 平台
npx cap add android

# 复制 Web 资源到 Android 项目
npx cap sync

# 使用 Android Studio 打开并构建
npx cap open android
# 在 Android Studio 中: Build → Build APK
```

### 3. iOS 应用部署

```bash
cd frontend

# 安装依赖
npm install

# 构建 Web 资源
npm run build

# 添加 iOS 平台
npx cap add ios

# 复制 Web 资源到 iOS 项目
npx cap sync

# 使用 Xcode 打开并构建
npx cap open ios
# 在 Xcode 中: Product → Build
```

## API 端点

- `GET /api/hello` - 测试接口
- `POST /api/echo` - 回显接口

## 开发说明

1. 前端开发时，通过 Vite 代理访问后端 API
2. 生产环境 Web 部署：将前端 dist 复制到 backend/src/main/resources/static/
3. Capacitor 移动应用直接与后端 API 通信，需要确保 CORS 配置正确

## 许可证

MIT
