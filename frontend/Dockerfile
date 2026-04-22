FROM python:3.12-slim

WORKDIR /app

COPY html/ ./html/

WORKDIR /app/html

EXPOSE 8080

CMD ["python3", "-m", "http.server", "8080"]
