# C0-Compiler

A c language compiler with GUI based on TypeScript, Electron, React and antd.

## Run locally

**!Note!: Require node 10+**

```sh
# clone repo
git clone --depth=1 https://github.com/Zx55/c0-compiler.git

# install tools
npm i -g cnpm --registry=https://registry.npm.taobao.org
cnpm i -g yarn

# install deps
cd c0-compiler
cnpm install # or npm install

# run GUI
yarn build
yarn start

# run CLI
yarn cli <cFile> [...compileOptions]
```

see [compile options](./src/c0/README.md) for detail.

## Run in Docker (Recommend)

### Start VNC server

```sh
docker pull zx55/c0-env
docker run -p 6080:80 -v /dev/shm:/dev/shm zx55/c0-env
```

Browse http://127.0.0.1:6080/

### Run GUI

Open `startup.sh` on the Desktop and click execute

### Run CLI

```sh {.line-numbers}
cd ~/Desktop/c0-compiler
cnpm install
yarn cli
```
