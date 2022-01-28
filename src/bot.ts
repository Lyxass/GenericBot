const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
import { Bot } from "./controller/Bot";
Bot.getInstance()