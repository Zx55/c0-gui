FROM node:10

WORKDIR /

# install tools (cnpm) and clone repo
RUN npm i -g cnpm --registry=--registry=https://registry.npm.taobao.org && \
    git clone --depth=1 https://github.com/Zx55/c0-compiler.git

WORKDIR /c0-compiler

# build app
RUN cnpm install && \
    yarn build

CMD yarn start
