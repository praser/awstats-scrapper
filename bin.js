const path = require('path');
const scrapper = require('.');
const puppeteer = require('puppeteer');

const awstatsUrl = 'https://www.nltechno.com/awstats/awstats.pl?config=destailleur.fr&framename=mainrightx';

// Support for pkg
const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || (
  process.pkg ? path.join(
    path.dirname(process.execPath),
    'puppeteer',
    ...puppeteer
    .executablePath()
    .split(path.sep)
    .slice(6), // /snapshot/project/node_modules/puppeteer/.local-chromium
  )
  : puppeteer.executablePath()
);

scrapper(awstatsUrl, executablePath);