FROM node:22.2.0

WORKDIR /app

COPY . .
COPY package.json pnpm-lock.yaml ./

RUN git submodule init && git submodule update --recursive

RUN apt-get update && apt-get install -y \
  git \
  curl \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN /root/.cargo/bin/cargo --version


RUN /bin/bash -c "source $HOME/.cargo/env && cd sr5900p && make install"

RUN pnpm install --frozen-lockfile

CMD ["pnpm", "start"]
