COMPOSE=docker-compose
APP=$(COMPOSE) exec -T php
COMPOSER=$(APP) composer

help:           ## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install:        ## Setup the project
install: build start install_php_deps install_front_deps compile_assets

start:          ## Start Docker containers
	docker-compose up -d --remove-orphans

build:          ## Build Docker containers
	docker-compose build

stop:           ## Stop Docker containers
	docker-compose stop

install_php_deps:
	$(COMPOSER) install

update_php_deps:
	$(COMPOSER) update

install_front_deps:
	$(COMPOSE) run --rm yarn install

update_front_deps:
	$(COMPOSE) run --rm yarn upgrade

compile_assets:
	$(COMPOSE) run --rm yarn encore production

compile_assets_dev:
	$(COMPOSE) run --rm yarn encore dev

tests:
	$(COMPOSE) exec php phpunit
