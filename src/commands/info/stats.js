const { EmbedBuilder } = require('discord.js');
const os = require('os');
const process = require('process');

module.exports = {
    data: {
        name: 'stats',
        description: 'Show bot and system statistics',
        category: 'misc',
        usage: '?stats'
    },
    async execute(message, args, client) {
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const embed = new EmbedBuilder()
            .setTitle('Bot Statistics')
            .addFields(
                { name: 'Guilds', value: client.guilds.cache.size.toString(), inline: true },
                { name: 'Users', value: client.users.cache.size.toString(), inline: true },
                { name: 'Memory Usage', value: `${memoryUsage.toFixed(2)} MB`, inline: true },
                { name: 'CPU Architecture', value: os.arch(), inline: true },
                { name: 'Platform', value: os.platform(), inline: true },
                { name: 'Node.js Version', value: process.version, inline: true }
            )
            .setColor('#0099ff')
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};
