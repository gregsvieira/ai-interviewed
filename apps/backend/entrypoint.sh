#!/bin/sh

echo "Waiting for PostgreSQL..."
for i in $(seq 1 30); do
    if pg_isready -h postgres -U interviewed -d intervieweddb > /dev/null 2>&1; then
        echo "PostgreSQL ready!"
        break
    fi
    sleep 2
done

echo "Starting NestJS application..."
exec node dist/src/main.js
