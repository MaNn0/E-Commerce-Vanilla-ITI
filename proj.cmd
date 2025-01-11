@echo off
echo Starting json-server...
cd "E:\js proj\E-Commerce-Vanilla-ITI\public\db"
npx json-server dummyData.json

echo Starting backend server...
cd "E:\js proj\E-Commerce-Vanilla-ITI\backend"
node server.js


echo All servers are running.
pause
