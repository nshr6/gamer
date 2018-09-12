const Discord = require('discord.js');
const client = new Discord.Client();
const dateFormat = require('dateformat');//npm i dateformat
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const moment = require('moment');
const request = require('request');
const fs = require('fs');
const getYoutubeID = require('get-youtube-id');
const jimp = require('jimp');
const Canvas = require('canvas');
const fetchVideoInfo = require('youtube-info');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const prefix = '%';
const PREFIX = '%';
const channels = {};
client.on('ready', () => {
    client.user.setActivity(`Galaxy Server`, {type:'WATCHING'})
  console.log(`Logged in as ${client.user.tag}!`);
});
	 client.on('message',   eyad =>{
    
    var  args = eyad.content.split(" ").slice(2).join(" ")
    var men = eyad.mentions.users.first()|| client.users.get(eyad.content.split(' ')[1])
    var  mas = eyad.author
                              if(eyad.content == 'pes') {
                              if(eyad.channel.type === "dm"){
if(!args) return  eyad.channel.send(":black_medium_square: **قم بوضع رسالة الصراحة **");
if(!men) return  eyad.channel.send(":black_medium_square:**قم بوضع ايدي المراد مصارحتة , ربما يكون الشخص غير موجود في سيرفرات مشتركة بينك وبينة لذلك لن يستطيع البوت الأرسال** ");
                      var currentTime = new Date(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
     var eyadandr3d = new Discord.RichEmbed()
     .setAuthor(eyad.author.username , eyad.author.avatarURL)
     .setThumbnail(men.avatarURL)
     .setDescription(`**:black_medium_square:  هل انت موافق لآرسال هذه الصراحة  ؟  \nمحتوي الرسالة : ${args}**`)
     .setTimestamp() 
     .setFooter(`- By , message.author.name .`)
     eyad.channel.send(eyadandr3d).then(message => {
 message.react('✅').then(r=>{
 message.react('❌').then(r=>{            
    var kk = (reaction, user) => reaction.emoji.name === '✅' && user.id === eyad.author.id;    
    var nn = (reaction, user) => reaction.emoji.name === '❌' && user.id === eyad.author.id;
    var kkk = message.createReactionCollector(kk, { time: 60000 });
    var nnn = message.createReactionCollector(nn, { time: 60000 });
kkk.on("collect", r => {
          const embed = new Discord.RichEmbed()
               .setThumbnail("https://cdn.discordapp.com/attachments/429056808561278979/450412294078332948/download.jpg")   
               .setColor("RANDOM")
               .addField('**• السلام عليكم ** ', `<@${men.id}>` , true)
                    .addField('**• لقد قام شخص ما بمصارحتك **' ,       ` __${args}__ ` , true)
                    .addField('**• تاريخ المصارحة**' , Day + "-" + Month + "-" + Year , true)
          client.users.get(men.id).sendEmbed(embed)
          eyad.reply(`لقد تم ارسال الصراحه للشخص \n <@${men.id}>`)
message.delete()
          eyad.delete();
})
nnn.on("collect", r => {
message.delete()
eyad.reply("`تم الغاء الصراحة`")
eyad.delete();
})
})
}) 
})
}}
});
client.on('voiceStateUpdate',async function(oldmember, member) {
if(member.user.bot) return;
if(member.voiceChannel === undefined && channels[member.id]) {
console.log(member.guild.members.filter(m => m.voiceChannelID === channels[member.id].channel).size)
if(member.guild.members.filter(m => m.voiceChannelID === channels[member.id].channel).size < 1) {
member.guild.channels.get(channels[member.id].channel).delete();
channels[member.id].channel = undefined;
}
}
if(oldmember.voiceChannel !== undefined || member.voiceChannel !== undefined) {
if(member.voiceChannelID === '475753696509296640') {
member.guild.createChannel(member.displayName, "voice", [{
id: member.id,
allow: ['CONNECT'],
}, {
id: member.guild.id,
deny: ['CONNECT']
}]).then((channel)=> {
    const parent = member.guild.channels.get('475753696509296640').parentID
    channel.setParent(parent);
    if(!channels[member.id]) channels[member.id] = {
        channel: channel.id,
    }
        setInterval(() => {
      if(!channel) return;
      if(channel.members.size === 0) {
        channel.delete();
      }
    }, 4000);
member.user.send(`Hey __**<@${member.user.id}>**__ I've created a channel for you!
------------------------------------------------------------
Use \`\`${prefix}unlock [@user | all]\`\` to unlock for a specify or for all.
Use \`\`${prefix}lock [@user | all]\`\` to lock & kick for a specify or for all in your voice channel.
Use \`\`${prefix}rename [new name]\`\` to rename your voice channel name.
**اذا لم يتواجد احد بالروم سوف يتم حذفها بعد 3 ثوانى**
------------------------------------------------------------
`)
member.setVoiceChannel(channel.id);
})
} else return undefined;
}
});
 
client.on(`message`, async message => {
let args = message.content.trim().split(" ").slice(1); //substring(prefix.length) before split(" ") if you had a prefix.
let user = message.mentions.users.first();
if(message.content.startsWith(`%unlock`)) {
if(channels[message.author.id] !== undefined) {
if(user) {
if(message.guild.channels.get(channels[message.author.id].channel).permissionsFor(user.id).has(`CONNECT`)) return message.channel.send(`**The user already can connect to your voice channel**\n to lock & kick user use \`\`!lock\`\` `);
message.guild.channels.get(channels[message.author.id].channel).overwritePermissions(user.id, {
CONNECT: true
}).then(message.channel.send(`**${user.username}** can connect to your room now!`))
}
else if(args.includes("all")) {
message.guild.channels.get(channels[message.author.id].channel).overwritePermissions(message.guild.id, {
CONNECT: true
}).then(message.channel.send("**Everyone** can connect to your room now!"));
} else return message.channel.send(`**Usage: ${prefix}unlock [all | @user]**`)
}
}
if(message.content.startsWith(`%lock`)) {
if(channels[message.author.id] !== undefined) {
if(user) {
if(!message.guild.channels.get(channels[message.author.id].channel).permissionsFor(user.id).has(`CONNECT`)) return message.channel.send(`**The user already cannot connect to your voice channel**`);
try {
if(message.guild.members.get(user.id).voiceChannelID === channels[message.author.id].channel) {
message.guild.members.get(user.id).setVoiceChannel('455855919394193431'); // المكان الي راح ينحطوله بعد ما يصير لهم lock
}  
} catch (error) {
console.log(error)
}
message.guild.channels.get(channels[message.author.id].channel).overwritePermissions(user.id, {
CONNECT: false
}).then(message.channel.send(`:x: **${user.username}** cannot connect to your room now!`))
}
else if(args.includes("all")) {
message.guild.channels.get(channels[message.author.id].channel).overwritePermissions(message.guild.id, {
CONNECT: false
}).then(message.channel.send(":x: **Everyone** cannot connect to your room now!"));
} else return message.channel.send(`**Usage: ${prefix}lock [all | @user]**`)
}  
}
if(message.content.startsWith(`%rename`)) {
if(channels[message.author.id] !== undefined) {
if(args.length <= 0) return message.channel.send(`:scroll: **Hmmm the name please*`);
if(message.content.length > 7+15) return message.channel.send(`:x: It appears that's the max letters allowed is **15**.`)
const oldName = await message.guild.channels.get(channels[message.author.id].channel).name
message.channel.send(`:pencil2: Renamed **\`\`${oldName}\`\`** to **\`\`${args.join(" ").toString()}\`\`** alright?`)
message.guild.channels.get(channels[message.author.id].channel).setName(args.join(" ").toString());
}
 }
});
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
client.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.get("474666092703514624");
    if (!channel) {
        console.log("!the channel id it's not correct");
        return;
    }
    if (member.id == client.user.id) {
        return;
    }
    console.log('-');
    var guild;
    while (!guild)
        guild = client.guilds.get("470896018603376640");
    guild.fetchInvites().then((data) => {
        data.forEach((Invite, key, map) => {
            var Inv = Invite.code;
            if (dat[Inv])
                if (dat[Inv] < Invite.uses) {
                    setTimeout(function() {
 channel.send(`**invited by** ${Invite.inviter} `) ;
                    },1500);
 }
            dat[Inv] = Invite.uses;
       
       });
    });
});
client.on('message', message => {
     if(message.content === 'nickall') {
         message.guild.members.forEach(t=> {
          let name = client.users.get(t.id).username;
          t.setNickname(`🅶🅻🆇 | ${name}`)
  })
 }
});
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('475966147624173568')){
        message.delete()
    return message.reply(`** ممنوع يابابا **`)
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
const bannedwords = [
  "#credit",
  "#profile",
  "#rep",
  "#top",
  "%level",
  "%تقديم",
  "-play",
  "-stop",
  "-p",
  "-s",
  "!invites",
  "!top",
  "G.play",
  "G.stop",
  "G.skip",
  "-skip",
  "#daily",
  "#user",
  "#id"

]
client.on('message', message => {
  var Muted = message.guild.roles.find("name", "muted");
  var warn = message.guild.roles.find("name", "warn");
  if(bannedwords.some(word => message.content.includes(word))) {
  if(message.channel.id !== '455847216968368139') return;
  if (message.author.bot) return;
  if(message.member.roles.has(warn)) return;
  if(!message.member.roles.has(warn.id)) {
  message.member.addRole(warn)
  message.reply("**`تم اعطائك تحذير لاستخدام اوامر البوت فى الشات العام` 😠**")
  }
  if(message.member.roles.has(warn.id)) {
      message.member.addRole(Muted)
      message.member.removeRole(warn)
      message.reply("**`تم اعطائك ميوت كتابى تواصل مع احد اعضاء الادارة لازالتة` 🤐**")
  }
  }
  })
const invites = {};
const wait = require('util').promisify(setTimeout);
client.on('ready', () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
client.on("message", baron =>{
  if(baron.content.startsWith(prefix + 'invitedby')) {
    if(!baron.member.hasPermission("MANAGE_CHANNELS")) return baron.channel.send("**[Ops] Need `Manage_channels` Permission To Use This**")
    baron.guild.createChannel("invited-by", "text")
  }
})
client.on("guildMemberAdd", member => {
const invitedchannel = member.guild.channels.find("name", "invited-by")
      if(!invitedchannel) return;
      if(invitedchannel) {
member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    member.guild.fetchInvites().then(invs => {
        let personalInvites = invs.filter(i => i.inviter.id === inviter.id);
        let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0)
     invitedchannel.send(`<@${member.user.id}> **joined**; Invited by **${inviter.username}** [**${inviteCount}** invites]`);
  })
        })
    }
})
client.on("message", message => {
    let channel = message.guild.channels.find("name", "التقديمات")
    if(message.content.startsWith(prefix + "تقديم"))
    message.channel.send( message.member + ', **:timer:**').then( (m) =>{
      m.edit( message.member + ', **اسمك الحقيقى بالكامل ✍**' )
      m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m1) => {
          m1 = m1.first();
          var name = m1.content;
          m1.delete();
          m.edit(message.member + ', **:timer:**').then( (m) =>{
              m.edit( message.member + ', **عندك كام سنة 🎓**' )
              setTimeout(() => {
                m.delete()
              }, 10000);
              m.channel.awaitMessages( m2 => m2.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m2) => {
                  m2 = m2.first();
                  var age = m2.content;
                  m2.delete()
                  message.channel.send( message.member + ', **:timer:**').then( (m) =>{
                    m.edit( message.member + ', **هل ستتفاعل فى الرومات الصوتيه و الكتابية ؟ 🎙**' )
                    setTimeout(() => {
                      m.delete()
                    }, 10000);
                    m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m3) => {
                        m3 = m3.first();
                        var ask = m3.content;
                        m3.delete();
                        message.channel.send( message.member + ', **:timer:**').then( (m) =>{
                          m.edit( message.member + ', **هل ستحترم القوانين ؟ 📑**' )
                          setTimeout(() => {
                            m.delete()
                          }, 10000);
                          m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m4) => {
                              m4 = m4.first();
                              var ask2 = m4.content;
                              m4.delete();
                              message.channel.send( message.member + ', **:timer:**').then( (m) =>{
                                m.edit( message.member + ', **لماذا يجب علينا ان نقبلك ؟ اعطنا سبباً وجيهاً 🤔**' )
                                m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m5) => {
                                    m5 = m5.first();
                                    var ask3 = m5.content;
                                    m5.delete();
              m.edit(message.member + ', **جارى جمع البيانات**').then( (mtime)=>{
                setTimeout(() => {
                  let embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('**`تقديم على ادارة`** [__**Galaxy Games**__]')
                .addField('**`الاسم`**', `${name}` , true)
                .addField('**`العمر`**', `${age}` , true)
                .addField('**`هل سيتفاعل ؟`**',`${ask}`)
                .addField('**`هل سيحترم القوانين ؟`**',`${ask2}`)
                .addField('**`لماذا يجب علينا قبوله ؟`**',`${ask3}`)
                .setFooter(message.author.username,'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')  
                channel.send(embed)
                }, 2500);
                setTimeout(() => {
                  mtime.delete()
                }, 3000);
                
          })
        })
        })
      })
    })
  })
})
})
      })
  })
})
})
client.on('message',async message => {
  let mention = message.mentions.members.first();
  let role = message.content.split(" ").slice(2).join(" ");
  let mySupport = message.guild.roles.find('name',role);
  let acRoom = client.channels.get('484465622814687232');
  if(message.content.startsWith(prefix + "yes")) {
    if(message.guild.id !== '434446086053036054') return;
    if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return;
    if(!mention) return message.reply('منشن شخص');
    if(!role) return message.reply('ادخل اسم رتبة');
    if(!mySupport) return message.reply('هذه الرتبة غير موجودة');
    if(mention.roles.has(mySupport)) return message.reply('هذا الشخص معه الرتبة مسبقا');

    mention.addRole(mySupport).then(() => {
      acRoom.send(`**[ ${mySupport} ] واعطائك رتبة ${mention} تم بنجاح قبولك**`);
    });
  }
});
client.on('message',async message => {
  let mention = message.mentions.members.first();
  let acRoom = client.channels.get('484465695153848330');
  if(message.content.startsWith(prefix + "no")) {
  if(message.guild.id !== '434446086053036054') return;
  if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return;
  if(!mention) return message.reply("منشن شخص");

  acRoom.send(`**${mention} تم رفضك للاسف**`)
  }
});
client.on("guildMemberAdd", m => {
    if (datediff(parseDate(moment(m.user.createdTimestamp).format('l')), parseDate(moment().format('l'))) < 8) {
        m.ban();
    };
});
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
};

function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
};
client.login(process.env.BOT_TOKEN);
