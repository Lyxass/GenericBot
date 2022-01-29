import path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
import { Bot } from "./controller/Bot";
Bot.getInstance()