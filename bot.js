const Discord = require('discord.js')
const ytdl = require("ytdl-core");
const { Client, Util } = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const moment = require('moment');
const fs = require('fs');
const jimp = require('jimp');
const dateFormat = require('dateformat');//npm i dateformat
const channels = {};
const client = new Discord.Client();
 
/*
البكجآت
npm install discord.js
npm install ytdl-core
npm install get-youtube-id
npm install youtube-info
npm install simple-youtube-api
npm install queue
*/
 
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`in ${client.guilds.size} servers `)
    console.log(`[Codes] ${client.users.size}`)
    client.user.setStatus("online")
});
client.on('ready', () => {
     client.user.setActivity("Welcome To The Hell ! ",{type: 'WATCHING'});
 
});
const prefix = "%"
client.on('ready',async () => {
setInterval(function(){
var currentTime = new Date(),
hours = currentTime.getHours() + 2,
ReBeeL = currentTime.getMinutes(),
ReBeeeL = currentTime.getSeconds(),
Codes = currentTime.getFullYear(),
CodeS = currentTime.getMonth() +1,
CoDeS = currentTime.getDate()
if (ReBeeL < 10) {
ReBeeL = "0" + ReBeeL;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
client.channels.find('id', '476703905808646144').setName(`Time - ${hours} : ${ReBeeL} : ${ReBeeeL} ${suffix}`)
client.channels.find('id', '476703947512610826').setName(`Date : ${Codes} - ${CodeS} - ${CoDeS}`)
}, 1000);
});
client.on("ready", () => {
    setInterval(function(){
        client.guilds.get("434446086053036054").roles.find("name", "⇁『Special』‏‏༄  ❥").edit({
            color : "RANDOM"
        });
    }, 30000)
});
client.on('message', message => {
  var id = message.author.id
  if (message.content.startsWith( prefix + "sug")) {
  if (!message.channel.guild) return;
  let args = message.content.split(" ").slice(1).join(' ');
  if(!args) return message.reply('من فضلك اكتب اقتراحك بعد الامر')
  let embed = new Discord.RichEmbed()
.setColor('RANDOM')
.addField('**`المقترح`**', `<@${id}>` , true)
.addField('**`الاقتراح`**', `${args}` , true)
.setFooter('Suggested By '+message.author.username, message.author.avatarURL)
message.guild.channels.find('name', 'suggestions').send(embed);
 
  }
  });
const yourID = "434845976050794516"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "%role"
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["⇁『ACTIVE 』‏‏༄  ❥", "Fortnite", "Crossfire", "League of Leagends", "Black Squad", "Minecraft", "Roblox", "Creative Destruction"];
const reactions = ["💭", "🇫", "🔫", "⚔", "🔪", "👾", "🥊", "🎆"];
const botToken = "NDgwNzM4NTIzNjk2MjAxNzI5.Dl9PIA.48CAMtPWvyvZawa9M-KqwtvVLlY"; /*You'll have to set this yourself; read more
                     here https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token*/
 
//Load up the bot...
//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";
 
//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
    return messages;
}
 
 
client.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                }
            });
        }
    }
})
client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
       
        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
       
        if (msg.author.id == client.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
       
            if (user.id != client.user.id){
                var roleObj = msg.guild.roles.find('name', role);
                var memberObj = msg.guild.members.get(user.id);
               
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }  
});
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
client.on('guildMemberRemove', (u) => {
    u.guild.fetchAuditLogs().then( s => {
        var ss = s.entries.first();
        if (ss.action == "MEMBER_BAN_ADD") {
        if (!data[ss.executor.id]) {
            data[ss.executor.id] = {
            time : 1
          };
      } else {
          data[ss.executor.id].time+=1;
      }
data[ss.executor.id].time = 0;
u.guild.members.get(ss.executor.id).ban('Griefing');
                data[ss.executor.id].time = 0;
        setTimeout(function(){
            if (data[ss.executor.id].time <= 3) {
                data[ss.executor.id].time = 0;
            }
        },60000);
    }
    });
    fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
        if (err) console.log(err.message);
    });
});
         
 let channelc = {};
  client.on('channelCreate', async (channel) => {
  const rebellog = client.channels.find("name", "logs"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelcreate = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
   if(!channelc[channelcreate.id]) {
    channelc[channelcreate.id] = {
    created : 0
     };
 }
 channelc[channelcreate.id].created += 1;
 if(channelc[channelcreate.id].created >= Onumber ) {
    Oguild.members.get(channelcreate.id).kick();
rebellog.send(`ﾠ           ﾠﾠ  ﾠ                           :shield: **| NOUR BOT SECURITY SYSTEM ALERT |** :shield:
:spy: **| SOMEONE TRIED TO GRIEF THE SERVER, BUT I PROTECTED THE SERVER AND BANNED HIM! |** :spy:
   ﾠﾠ  ﾠ   :mag: **| THE MEMBER WAS <@!${channelcreate.id}>, THIS MEMBER CREATED 3 CHANNELS | :mag_right: **`);
channel.guild.owner.send(`:mag: **| Hey buddy, I just protected ${channel.guild.name} from someone tried to grief it, the member name was: <@!${channelcreate.id}>**`);
}
  setTimeout(() => {
 channelc[channelcreate.id].created = 0;
  },Otime);
  });
 
let channelr = {};
  client.on('channelDelete', async (channel) => {
  const rebellog = client.channels.find("name", "logs"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelremover = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
   if(!channelr[channelremover.id]) {
    channelr[channelremover.id] = {
    deleted : 0
     };
 }
 channelr[channelremover.id].deleted += 1;
 if(channelr[channelremover.id].deleted >= Onumber ) {
  Oguild.members.get(channelremover.id).kick();
rebellog.send(`ﾠ           ﾠﾠ  ﾠ                           :shield: **| NOUR BOT SECURITY SYSTEM ALERT |** :shield:
:spy: **| SOMEONE TRIED TO GRIEF THE SERVER, BUT I PROTECTED THE SERVER AND BANNED HIM! |** :spy:
   ﾠﾠ   :mag: **| THE MEMBER WAS <@!${channelremover.id}>, THIS MEMBER DELETED 3 CHANNELS | :mag_right: **`);
channel.guild.owner.send(`:mag: **| Hey buddy, I just protected ${channel.guild.name} from someone tried to grief it, the member name was: <@!${channelremover.id}>**`);
}
  setTimeout(() => {
 channelr[channelremover.id].deleted = 0;
  },Otime);
  });
 
  client.on('roleDelete', (u) => {
    u.guild.fetchAuditLogs().then( s => {
        var ss = s.entries.first();
        if (ss.action == "ROLE_DELETE") {
        if (!data[ss.executor.id]) {
            data[ss.executor.id] = {
            time : 1
          };
      } else {
          data[ss.executor.id].time+=1;
      }
data[ss.executor.id].time = 0;
u.guild.members.get(ss.executor.id).ban('Griefing');
                data[ss.executor.id].time = 0;
        setTimeout(function(){
            if (data[ss.executor.id].time <= 3) {
                data[ss.executor.id].time = 0;
            }
        },60000);
    }
    });
    fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
        if (err) console.log(err.message);
    });
});
 
client.on('roleCreate', (u) => {
    u.guild.fetchAuditLogs().then( s => {
        var ss = s.entries.first();
        if (ss.action == "ROLE_CREATE") {
        if (!data[ss.executor.id]) {
            data[ss.executor.id] = {
            time : 1
          };
      } else {
          data[ss.executor.id].time+=1;
      }
data[ss.executor.id].time = 0;
u.guild.members.get(ss.executor.id).ban('Griefing');
                data[ss.executor.id].time = 0;
        setTimeout(function(){
            if (data[ss.executor.id].time <= 3) {
                data[ss.executor.id].time = 0;
            }
        },60000);
    }
    });
    fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
        if (err) console.log(err.message);
    });
});
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
 
client.on("message", message => {
    if (message.author.bot) return; // ignore bots
 
    // if the user is not on db add the user and change his values to 0
    if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
        userInfo.xp = 0
        message.reply("Congratulations, you level up")
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd === "level") {
        let userInfo = db[message.author.id];
        let member = message.mentions.members.first();
        let embed = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Level", userInfo.level)
        .addField("XP", userInfo.xp+"/100");
        if(!member) return message.channel.sendEmbed(embed)
        let memberInfo = db[member.id]
        let embed2 = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Level", memberInfo.level)
        .addField("XP", memberInfo.xp+"/100")
        message.channel.sendEmbed(embed2)
    }
    fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
})
client.login(process.env.BOT_TOKEN);
