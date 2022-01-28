export interface iCommand {
    command: string,
    comment: string,
    triggerInt: number,
    useSpecialChar: boolean
    displayInHelp: boolean
}

export interface iAudioCommand extends iCommand {
    path: string,

}

export interface iTextCommand extends iCommand {
    message: string,
}