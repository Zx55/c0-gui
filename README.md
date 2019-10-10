# C0-Compiler

A c language compiler with GUI based on TypeScript, Electron, React and antd.

## Run in Docker container

### Start container

```sh
docker pull lazymio/compilers-env

# wait for downloading the image ...

docker run -it lazymio/compilers-env /bin/sh
```

### Install dependencies

```sh
# use cnpm and yarn
npm i -g cnpm --registry=https://registry.npm.taobao.org
cnpm i -g yarn

# clone repository
cd /home
git clone --depth=1 https://github.com/Zx55/c0-compiler.git

# install dependencies
# apt install libxss1

cd c0-compile
cnpm install
```

### Run GUI

```sh
yarn build

# wait for building app ...

yarn start
# emmm... it doesn't work in container's command line because of no display
# you have to connect docker to local display
```

### Run CLI

```sh
yarn cli <cFile> [...compileOptions]
```

see [compile options](./src/c0/README.md) for detail.
