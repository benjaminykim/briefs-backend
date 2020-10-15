curl --header "Content-Type: application/json" \
	--request POST \
	--data '{"url":"url.com"}' \
	http://localhost:9090

curl --header "Content-Type: application/json" \
	--request GET \
	http://localhost:9090
