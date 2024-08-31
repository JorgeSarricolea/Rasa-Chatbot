Run Rasa server in Docker:

1. Run the next command:
´´´bash
docker run -it -v $(pwd):/app rasa/rasa:latest-full init
´´´

2. Run Rasa Bot server:
´´´bash
docker run -it -v $(pwd):/app -p 5005:5005 rasa/rasa:latest-full run
´´´
