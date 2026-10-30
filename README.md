# GRAIL 项目网站

GRAIL（Green-light Research and Applications through Intelligent Learning）连接人工智能研究与交通信号优化。

本仓库保存网站发布文件。网站使用 HTML、CSS 和 JavaScript，无需安装依赖或构建。

## GitHub Pages

在仓库的 **Settings → Pages** 中设置：

- Source：`Deploy from a branch`
- Branch：`main`
- Folder：`/ (root)`

启用后的网站地址：https://larrymei.github.io/grail-website/

`.nojekyll` 使 GitHub Pages 直接发布静态文件。

## 文件结构

- `index.html`：页面结构与文案。
- `en/index.html`：英文页面，与中文页面共用样式、脚本与数据；右上角可切换语言。
- `data/en.js`：按稳定 ID 管理的英文城市名称和新闻文案。
- `sitemap.xml`：中英文首页的站点地图，新增页面或实质更新后同步维护。
- `styles.css`：页面样式及移动端布局。
- `app.js`、`city-map.js`：新闻、导航和城市地图交互。
- `assets/`：页面使用的 Logo、背景、产品配图、地图和备用插图。
- `content/news/`：页面使用的新闻封面，保留原有相对路径。
- `data/news.js`、`data/city-effects.js`：网页读取的生成数据。

## 同步更新

在关联此仓库的本地项目中修改并检查网页，然后提交、推送到 `main`。启用 GitHub Pages 后，每次推送会自动触发网站更新。

英文页面地址为 https://larrymei.github.io/grail-website/en/ 。更新正文时同步维护两个 HTML 文件；更新新闻时在 `data/en.js` 添加对应 ID 的译文。论文正式标题、新闻来源链接和城市数值共用原始内容。英文产品流程图保存在 `assets/products/*-en.svg`，新闻保留原报道配图及中文来源标识。

`.gitignore` 按发布文件清单管理同步范围。原始表格、研究稿、编辑材料、生成脚本和维护说明保存在本地；本地项目的操作说明见 `content/LOCAL_WORKSPACE.md`。新增网页资源时，需要同步更新 `.gitignore` 中的清单，并保持页面引用路径一致。

## 搜索发现

两种语言的页面均包含独立标题、描述、canonical、hreflang、Open Graph 元信息和 ResearchProject / WebSite / WebPage 结构化数据。核心介绍与论文直接包含在 HTML 内，不依赖 JavaScript 抓取。canonical 不包含追踪参数。

向 Bing Webmaster Tools 添加 `https://larrymei.github.io/grail-website/`，验证所有权后提交 `https://larrymei.github.io/grail-website/sitemap.xml`。站点可抓取与站点地图提交不等于已被索引或一定出现在 ChatGPT 搜索中。

标准爬虫规则只读取域名根目录 `https://larrymei.github.io/robots.txt`。不要把本项目子路径下的 `robots.txt` 当作有效规则。根域名由单独的 `larrymei.github.io` 仓库管理；OAI-SearchBot（搜索）与 GPTBot（训练）的规则彼此独立。

`indexnow-key.txt` 是公开的网站归属验证文件，用于通过 IndexNow 提交中英文页面更新通知（`keyLocation` 位于本项目路径下），不是账号密码或 GitHub 访问令牌。提交成功仅表示搜索引擎收到通知，不代表已收录。

根域名爬虫规则发布自 `larrymei/larrymei.github.io` 仓库的 `crawler-config` 分支。该分支只包含 `robots.txt`、`.nojekyll` 与 `404.html`，不含首页；旧个人主页保存在 `master` 分支。不要切回 `master` 作为发布来源，以免恢复旧主页。保留首页 `msvalidate.01` 标签以维持 Bing 所有权验证。
