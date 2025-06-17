const { EmbedBuilder } = require('discord.js');
const os = require('os');
const process = require('process');

module.exports = {
    data: {
        name: 'info',
        description: 'Show information about the bot and system',
        category: 'misc',
        usage: '?info'
    },
    async execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('Bot Information')
            .addFields(
                { name: 'Bot Name', value: client.user.username, inline: true },
                { name: 'Bot ID', value: client.user.id, inline: true },
                { name: 'Node.js Version', value: process.version, inline: true },
                { name: 'Platform', value: os.platform(), inline: true },
                { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60)} minutes`, inline: true }
            )
            .setColor('#0099ff')
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};
