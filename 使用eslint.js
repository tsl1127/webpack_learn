行业里优秀的eslint规范实践
Airbnb: eslint-config-airbnb、 eslint-config-airbnb-base 

腾讯：eslint-config-alloy   、eslint-config-ivweb

不重复造轮子，基于eslint:recommend配置并改进

eslint如何落地
和CI/CD集成
和webpack集成

方案一：webpack和CI/CD集成
本地开发阶段增加precommit 钩子

安装husky
npm i husky -D 
增加npm script 通过lint-staged增量检测修改的文件


方案二：webpack和ESlint集成
使用eslint-loader，构建时检测js规范
