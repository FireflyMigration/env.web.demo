# Deploy the App

### Step 1
In the FrontEnd directory run:
```
npm run build
```

### Step 2
Run the `Publish.bat`  file from your solution folder.

### Step 3
update the jwt token in your `web.config` with a long random string.  (you only need to do this once) 

You can find a string generator at: https://www.uuidgenerator.net/version4

### Step 4
In the IIS map your website to the `publish/web` 


