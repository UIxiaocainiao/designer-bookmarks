# DesignNest

创意技能浏览器 —— 发现、管理和使用 AI 创意工具的统一入口。

**线上地址**: [designnest.ccwu.cc](https://designnest.ccwu.cc)

## 项目结构

```
.
├── frontend/               # React SPA 前端
│   ├── src/
│   │   ├── app/            # 页面组件 (App.tsx)
│   │   ├── components/ui/  # shadcn/ui 组件 (56+)
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── lib/            # 工具函数
│   │   └── styles/         # Tailwind + 主题样式
│   ├── public/             # 静态资源 + Cloudflare _headers
│   └── vite.config.ts
│
├── functions/api/          # Cloudflare Pages Functions (API 路由)
│   ├── _middleware.ts      # CORS 处理
│   ├── _data.ts            # 数据定义 + 查询函数
│   ├── _dashboard.ts       # 仪表盘聚合逻辑
│   └── *.ts                # 各 API 端点
│
├── backend/                # Cloudflare Worker (独立部署，备用)
│   ├── src/                # Worker 源码
│   └── wrangler.toml       # Worker 部署配置
│
├── database/               # 本地 PostgreSQL 开发环境
│   ├── docker-compose.yml
│   ├── schema.sql
│   └── seed.sql
│
├── ship.sh                 # 一键提交 + 部署脚本
├── package.json            # pnpm workspace 根配置
└── pnpm-workspace.yaml
```

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | React 18 + TypeScript + Vite 6 |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| API | Cloudflare Pages Functions |
| 部署 | Cloudflare Pages + Workers |
| 数据库 (本地) | PostgreSQL 16 (Docker) |
| 包管理 | pnpm (workspace monorepo) |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动前端开发服务器
pnpm run dev:frontend

# 启动后端开发服务器 (本地 Node.js)
pnpm run dev:backend

# 启动本地数据库
pnpm run db:up
```

## 部署

修改代码后，一条命令完成提交 + 推送 + 部署：

```bash
./ship.sh "你的提交信息"
```

或者分步操作：

```bash
git add -A
git commit -m "改动说明"
git push origin main
pnpm run deploy          # 构建前端 + 上传到 Cloudflare Pages
```

## API 端点

所有接口在 `https://designnest.ccwu.cc/api` 下：

| 端点 | 说明 |
|---|---|
| `/api` | 服务列表 |
| `/api/health` | 健康检查 |
| `/api/dashboard` | 仪表盘数据 |
| `/api/inventory` | 库存记录 |
| `/api/suppliers` | 供应商摘要 |
| `/api/customers` | 客户摘要 |

本地开发时，Vite 将 `/api` 请求代理到 `http://localhost:3001`。

## Git 子模块

项目包含以下设计资源子模块：

- `awesome-design-md/` — 品牌设计语言 Markdown 集合
- `design.md/` — design.md CLI 工具
- `MeiGen-AI-Design-MCP/` — AI 设计 MCP 服务器

克隆后需初始化子模块：

```bash
git submodule update --init --recursive
```
