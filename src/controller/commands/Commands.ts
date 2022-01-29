import { Help } from "./Help"
import { Stop } from "./Stop"
import { Join } from "./Join"

export const stringToCommand : {[name:string]:any} = {
    "help": Help.run,
    "stop": Stop.run,
    "join": Join.run,
}

