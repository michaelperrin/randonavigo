FROM php:7.1-fpm
MAINTAINER Michaël Perrin <contact@michaelperrin.fr>

# Install recommended extensions for Symfony
RUN apt-get update && apt-get install -y \
        libicu-dev \
    && docker-php-ext-install \
        intl \
        opcache \
    && docker-php-ext-enable \
        intl \
        opcache

# MongoDB extension for PHP 7
# The libssl-dev is necessary to avoid an error while mongodb extension install
RUN apt-get update && apt-get install -y libssl-dev
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Install GD
RUN apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng12-dev \
    && docker-php-ext-install gd \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/

# Fix permissions
RUN usermod -u 1000 www-data
