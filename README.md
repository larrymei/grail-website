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
- `styles.css`：页面样式及移动端布局。
- `app.js`、`city-map.js`：新闻、导航和城市地图交互。
- `assets/`：页面使用的 Logo、背景、产品配图、地图和备用插图。
- `content/news/`：页面使用的新闻封面，保留原有相对路径。
- `data/news.js`、`data/city-effects.js`：网页读取的生成数据。

## 同步更新

在关联此仓库的本地项目中修改并检查网页，然后提交、推送到 `main`。启用 GitHub Pages 后，每次推送会自动触发网站更新。

`.gitignore` 按发布文件清单管理同步范围。原始表格、研究稿、编辑材料、生成脚本和维护说明保存在本地；本地项目的操作说明见 `content/LOCAL_WORKSPACE.md`。新增网页资源时，需要同步更新 `.gitignore` 中的清单，并保持页面引用路径一致。
