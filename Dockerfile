################################################################################
# builder                                                                      #
################################################################################

FROM node:10 as builder

WORKDIR /

# clone repo, install tools (cnpm) and deps
RUN git clone --depth=1 https://github.com/Zx55/c0-compiler.git && \
    npm i -g cnpm --registry=https://registry.npm.taobao.org && \
    cd /c0-compiler && \
    cnpm install && yarn build

################################################################################
# merge                                                                        #
################################################################################

FROM dorowu/ubuntu-desktop-lxde-vnc:bionic-lxqt

LABEL \
    version="0.0.0" \
    author="zx55" \
    email="czr.cn.525@gmail.com" \
    repo="https://github.com/Zx55/c0-compiler.git" \
    description="A c language compiler with GUI based on TypeScript, Electron, React and antd."

WORKDIR /

# install git and nodejs
RUN sed -i "s/tw.archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g" etc/apt/sources.list && \
    sed -i "s/security.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g" etc/apt/sources.list && \
    apt update && \
    apt install -y gnupg2 && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt install -y nodejs && \
    npm i -g cnpm --registry=https://registry.npm.taobao.org && \
    cnpm i -g electron@6.0.7
    # cnpm i -g ts-node

WORKDIR /root/Desktop/

COPY startup.sh .

# clone repo and install dependencies
RUN chmod 777 startup.sh && \
    mkdir c0-compiler

WORKDIR /root/Desktop/c0-compiler

COPY --from=builder /c0-compiler/dist /root/Desktop/c0-compiler/dist
COPY package.json .

EXPOSE 80

ENTRYPOINT [ "/startup.sh" ]
