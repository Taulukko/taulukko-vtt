const { app, BrowserWindow } = require('electron');
//https://github.com/winstonjs/winston
const winston = require('winston');
//https://www.npmjs.com/package/winston-daily-rotate-file
const DailyRotateFile = require('winston-daily-rotate-file');
 
  var transport = new winston.transports.DailyRotateFile({
    filename: 'combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });


transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
  });


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [ 
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'info.log', level: 'info' }),
    //  new winston.transports.File({ filename: 'combined.log' }),
      transport
    ],
  });

  
 logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));

logger.info("Taulukko VTT 3.0 Starting ...."); 
   

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768
  });

  //TODO: Detect when server is on, and change the laodURL (for now need start server manually with cd frontend | npm run start)
  //load page
  //win.loadFile('index.html');
  //final page
  win.loadURL("http://localhost:4200/");
  win.maximize();
  win.fullScreen=true;
  
  logger.info("Taulukko VTT 3.0 Started ...."); 
};

app.whenReady().then(() => {
  createWindow();
});