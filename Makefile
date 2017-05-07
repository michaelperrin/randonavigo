COMPOSE=docker-compose
APP=$(COMPOSE) exec php
COMPOSER=$(APP) composer

help:           ## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install:        ## Setup the project using Docker and docker-compose
install_dev: build install_php_deps

start:          ## Start Docker containers
	docker-compose up -d

build:          ## Build Docker containers
	docker-compose build

stop:           ## Stop Docker containers
	docker-compose stop

install_php_deps:
	$(COMPOSER) install
