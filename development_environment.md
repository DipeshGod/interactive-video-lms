### 1. Make sure you have docker and docker-compose installed

<br/>

### 2. Run 'docker-compose up' to start the application. Wait until both client and server starts. Client service starts faster than server, so for app to run properly we might need to wait until both client and server service start. Open 'localhost:3000' in the browser.

<br/>

#### NOTE FOR WINDOWS USER :
Docker volumes doesnt work properly on windows 10 environment. Features like hot reload during development will not work. Fix: If you are using windows, use Windows Subsystem for Linux (WSL) along with docker-desktop.Make sure you have wsl featured enabled in docker-desktop settings. Clone project inside WSL distribution (ubuntu).