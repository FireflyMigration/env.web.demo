## Deploying to a virtual folder
### Step 1, adjust build script
In the `frontend/package.config` file, change the build script from
```
"build": "ng build --prod && npm run copyFilesToMVC",
```
to:
```
"build": "ng build --prod --base-href /myfolder/ && npm run copyFilesToMVC",
```


### Step 2 adjust proxy config
In the `Proxy.conf.json` file, change the all targets from:
```
"target": "http://localhost:56557",
```
to
```
"target": "http://localhost/myfolder",
```

### Step 3 adjust WebDemo project
In the project properties, in the `Web` tag change the value of `Project Url` from:
```
http://localhost:56557/
```
to 
```
http://localhost:56557/myfolder/
```