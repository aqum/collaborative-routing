FROM elixir:1.3.4

ENV PHOENIX_VERSION 1.2.1

WORKDIR /app

# install the Phoenix Mix archive
RUN mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new-$PHOENIX_VERSION.ez

# Install hex
RUN mix local.hex --force
