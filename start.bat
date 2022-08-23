:START
if exist assets\db (
    npm install
    npm start
) else (
    mkdir assets\db
)
goto START