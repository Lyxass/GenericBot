// const Help = require("./Help");
// const Stop = require("./Stop");
// const Join = require("./Join");

import { Help } from "./Help"
import { Stop } from "./Stop"
import { Join } from "./Join"

export const stringToCommand : {[name:string]:any} = {
    "help": Help.run,
    "stop": Stop.run,
    "join": Join.run,
}

