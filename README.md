It's a generic bot for discord wich allow yout to answer to command by prepared text or by lauching song on the command owner audio channel



## Audio.json

This file list all the command and the music you want to play. It must be an array of array containing:
- The command (without the special character you use for your commands)
- The audio file name in the audio folder
- A integer to specify if you want to trigger the sound when the message :
    - 0 : start with the command
    - 1 : simply contain the command
    - 2 : end with the command   
- A boolean to use the special character or not (if you want to trigger whan a specific word is use in a sentance, put it to false)

Exemple of audio.json : 

```json
[
    ["myspecialcommand","file1.mp3",2,true],
    ["command2","file2.mp3",0,true],// Will trigger when someone use command2 with special character
    ["boomer","file3.mp3",1,false], // Will trigger when someone use boomer word without special character
]
```