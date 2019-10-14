FROM node:10

LABEL \
    version="0.0.0" \
    author="zx55" \
    email="czr.cn.525@gmail.com" \
    repo="https://github.com/Zx55/c0-compiler.git" \
    description="A c language compiler with GUI based on TypeScript, Electron, React and antd."

WORKDIR /

# clone repo, install tools (cnpm) and deps
RUN git clone --depth=1 https://github.com/Zx55/c0-compiler.git && \
    npm i -g cnpm --registry=https://registry.npm.taobao.org && \
    cd /c0-compiler && \
    cnpm install

WORKDIR /c0-compiler

# build app
RUN yarn build

CMD yarn start
