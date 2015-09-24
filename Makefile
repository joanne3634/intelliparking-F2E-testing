all: development
dev:
	@DEBUG=koala-puree*,eskygo* UV_THREADPOOL_SIZE=100 NODE_ENV=development ./node_modules/.bin/gulp server
test:
	@DEBUG=koala-puree*,eskygo:intelliparking* NODE_ENV=test ./node_modules/.bin/mocha --harmony test
demo:
	@DEBUG=koala-puree* NODE_ENV=test ./node_modules/.bin/mocha --harmony test/DemoTest.js
doc:
	@./node_modules/.bin/gulp api-doc
.PHONY: test
