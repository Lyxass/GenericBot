# Generic Bot for discord
A basic bot to play custom song (or memes)
The purpose of this Bot is to be modular. You will find some commands already implemented but this bot can be improved easily by adding some commands. 

## List of features
Currently, there are multiple features :
- You can configure the bot to play a sound when a specific command is executed
- You can configure the bot to respond a specific message when a specific command is executed
- You can manually make the bot join your audio channel with the !join command
- You can manually make the bot leave your audio channel with the !stop command
- You can display a help message by using the help !command

**The '!' is the default character for command but you can change it in the .env file.**
## Setup your audio commands

The audio.json file list all the commands and the music you want to play. It must be an array object containing:
- The command (without the special character you use for your commands)
- The audio file name (not the path) in the audio folder
- A commentary to display in the !help command
- A integer to specify if you want to trigger the sound when the message :
    - 0 : start with the command
    - 1 : simply contain the command
    - 2 : end with the command   
- A boolean to use the special character or not (if you want to trigger when a specific word is used in a sentence, put it to false)
- A boolean to specify if you want this command to be referenced by the help command (useful if you want to make some secret commands) 

**The file must be located at the same level as the src folder.**

Example of audio.json : 

```json
[
    {
        "command":"oofT",
        "path": "oofT.mp3",
        "comment": "oof from Roblox (trigger version)",
        "triggerInt": 2,
        "useSpecialChar": true,
        "displayInHelp": true
    },
    {
        "command":"oof",
        "path": "oof.mp3",
        "comment": "oof from Roblox (normal version)",
        "triggerInt": 2,
        "useSpecialChar": true,
        "displayInHelp": true
    }
]
```

## Setup your text commands

The test.json file list all the commands and the music you want to play. It must be an array object containing:
- The command (without the special character you use for your commands)
- The message you want to send
- A commentary to display in the !help command
- An integer to specify if you want to trigger the sound when the message :
    - 0 : start with the command
    - 1 : simply contain the command
    - 2 : end with the command   
- A boolean to use the special character or not (if you want to trigger when a specific word is used in a sentence, put it to false)
- A boolean to specify if you want this command to be referenced by the help command (useful if you want to make some secret commands) 

The file must be located at the same level as the src folder.

Example of audio.json : 

```json
[
    {
        "command":"hello",
        "message": "hello world !",
        "comment": "Say hello world",
        "triggerInt": 2,
        "useSpecialChar": true,
        "displayInHelp": true
    },
    {
        "command":"bye",
        "message": "Bye Bye!",
        "comment": "Say Bye Bye!",
        "triggerInt": 2,
        "useSpecialChar": true,
        "displayInHelp": true
    }
]
```

## Configure your environment 

In the repository, you will find a template of the .env file. To use it, rename it ".env".

**You must have an environment file to specify your discord token**

Here is a list of the option you have in the env file : 
- TOKEN: Your discord bot token. You must create an application on the [discord developer page](https://discord.com/developers/applications) and add a bot to this application. You can get your bot token in the bot section.
- BOT_NAME= The bot name. You can name it as you want.
- BOT_OWNER: The name of the bot owner. It will be displayed in the help command (and other commands in the future)
- ICON_PATH: The path of the icon you want to display. It's used in the help command.
- CHARACTER_FOR_COMMAND : By default, it's the '!' but you can change it if you already have a bot using this character.
- AUDIO_PATH: The path of your audio folder. By default, it is located at the same level as the src folder. **The path must be absolute**
- VOLUME : The volume of the audio player. Default value is 1. You can use float and integer (exemple of valid values : 0.2, 0.5, 1, 2)
## Need help?
If you find a bug or you need help configuring this bot, you can create an issue. If you are not familiar with GitHub, you can contact me on my email: lucasgazeau@lgazeau.fr Don't hesitate if you have any questions.