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
        libmcrypt-dev \
        libpng12-dev \
    && docker-php-ext-install -j$(nproc) iconv mcrypt \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

# Fix permissions
RUN usermod -u 1000 www-data

# Necessary packages for Composer
RUN apt-get update \
    && apt-get install -y \
        git \
        unzip

# Composer
RUN php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# PHPUnit
RUN curl "https://phar.phpunit.de/phpunit.phar" -L -o "phpunit.phar"
RUN chmod +x phpunit.phar
RUN mv phpunit.phar /usr/local/bin/phpunit
