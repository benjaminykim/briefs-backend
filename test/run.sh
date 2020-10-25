#!/bin/sh
ret=$(curl --header "Content-Type: application/json"\
	--request POST\
	--data '{"url":"benkim.dev/blog"}'\
	http://localhost:9090);


stub=$(echo "$ret" |  jq -r '.stub');

echo "Stub: $stub";

curl --header "Content-Type: application/json" \
	--request GET \
	http://localhost:9090/$stub;
