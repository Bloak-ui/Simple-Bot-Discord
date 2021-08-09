const { Client, MessageEmbed } = require('discord.js');

const { token, prefix } = require('./config.json');
const client = new Client({
    disableMentions: 'everyone',
    partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER']
});

client.on('ready', () => console.log(`Le bot ${client.user.username} est connecté sur ${client.guilds.cache.size} serveur(s) !`));

client.on('message', message => {

    if(message.author.bot
        || !message.guild
        || !message.content.startsWith(prefix)) return;

    const [command, ...args] = message.content.slice(prefix.length).split(/\s+/g);

    if(command === "help") {
        message.channel.send(new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Tien ! Je crois que j'ai une commande pour **toi ;)**: **< ${prefix}say >**`)
        .setTimestamp()
        .setFooter(`Commande executé sur ${message.guild.name}`, message.guild.iconURL({ dynamic: true })))
    }

    if(command === "say") {
        if(!args[0]) return message.reply("Vous devez mettre un message à la suite !");
        if(message.deletable) message.delete()
        message.channel.send(args.join(' '));
    }

});

client.login(token);