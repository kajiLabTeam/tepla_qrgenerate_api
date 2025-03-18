up:
	docker compose build && docker compose up -d && docker compose logs -f

login:
	docker exec -it tepra-server bash