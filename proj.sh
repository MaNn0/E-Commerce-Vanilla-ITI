#!/bin/bash

echo "Starting json-server..."
cd ~/E-Commerce-Vanilla-ITI/public/db || exit
npx json-server dummyData.json &

echo "Starting backend server..."
cd ~/E-Commerce-Vanilla-ITI/backend || exit
node server.js &

echo "Starting frontend server..."
cd ~/E-Commerce-Vanilla-ITI || exit
npm run dev &

echo "All servers are running."
wait
