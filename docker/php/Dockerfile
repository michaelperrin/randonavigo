FROM composer:1.9 as composer
FROM php:7.4-fpm-alpine

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV APCU_VERSION 5.1.18

# Add Composer to PHP container
COPY --from=composer /usr/bin/composer /usr/local/bin/composer

RUN apk add --no-cache \
  ca-certificates \
  icu-libs \
  git \
  unzip \
  libzip && \
  apk add --no-cache --virtual .build-deps \
  $PHPIZE_DEPS \
  icu-dev

RUN apk add --no-cache libzip-dev
RUN docker-php-ext-install \
  intl \
  zip

RUN pecl install apcu-${APCU_VERSION} && \
  docker-php-ext-enable apcu && \
  docker-php-ext-enable opcache

# GD
RUN apk add --no-cache freetype libpng libjpeg-turbo freetype-dev libpng-dev libjpeg-turbo-dev && \
  docker-php-ext-configure gd --with-freetype --with-jpeg && \
  docker-php-ext-install -j$(nproc) gd && \
  apk del --no-cache freetype-dev libpng-dev libjpeg-turbo-dev

# MongoDB
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

ADD php.ini /usr/local/etc/php/php.ini
