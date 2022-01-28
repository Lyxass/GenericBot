interface iAudioCommand{
    command:string,
    path: string,
    comment: string,
    triggerInt: number,
    useSpecialChar: boolean
}

interface iTextCommand{
    command:string,
    message: string,
    comment: string,
    triggerInt: number,
    useSpecialChar: boolean
}