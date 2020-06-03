# HTML - Working setup guide

## Environment:
- NodeJS (ver. from 10.x)
  - Command to check version:
    ```
    $ node -v
    ``` 
  - Commands to update version:
  
    ```
    $ sudo npm cache clean -f
    $ sudo npm install -g n
    $ sudo n stable
    ```
- yarn (__`$ sudo npm install -g yarn`__)

## Mannual setup 
  1. Copy `development-example.com` to `development.json`
  2. Copy `production-example.com` to `production.json`
  3. Edit settings in the copied files if needed.
  4. Run `$ npm install` to install `node_modules`.

## Working Commands:

**Development**: `npm run start`

**Build development**: `npm run build`

**Build production**: `npm run build:prod`
