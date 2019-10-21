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
    apt install -y git gnupg2 && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt install -y nodejs && \
    npm i -g cnpm --registry=https://registry.npm.taobao.org && \
    cnpm i -g yarn

WORKDIR /root/Desktop/

COPY startup.sh .

# clone repo and install dependencies
RUN chmod 777 startup.sh && \
    git clone --depth=1 https://github.com/Zx55/c0-compiler.git && \
    cd c0-compiler && \
    cnpm install && \
    yarn build

WORKDIR /root/Desktop/c0-compiler

EXPOSE 80

ENTRYPOINT [ "/startup.sh" ]
