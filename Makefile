run:
	npx tsc day$(day).ts
	node day$(day).js
	rm *.js
	rm inputs/*.js
	rm utils/*.js