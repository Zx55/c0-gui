# C0-Compiler

A c language compiler with GUI based on TypeScript, Electron, React and antd.

## Run locally

## Run from Docker container

### Pre-requisties

Install `X Server` for running GUI.

* For windows 10 user, you can see this article [Run GUI app in linux docker container on windows host](https://dev.to/darksmile92/run-gui-app-in-linux-docker-container-on-windows-host-4kde) and install `VcXsrv Windows X Server`

* For unix-like (like ubuntu)

    ```sh
    sudo apt install x11-server-utils
    xhost +
    ```

### Run c0

```sh
docker pull zx55/c0-env

# run GUI
docker run -it --rm -e DISPLAY=host.docker.internal:0.0 zx55/c0-env

# run CLI
docker run --rm zx55/c0-env yarn cli <cFile> [...compileOptions]
```

see [compile options](./src/c0/README.md) for detail.
