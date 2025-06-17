const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'whois',
        description: 'Get information about a user',
        category: 'misc',
        usage: '?whois [@user]'
    },
    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const user = member.user;

        const embed = new EmbedBuilder()
            .setTitle(`User Info - ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'Discriminator', value: `#${user.discriminator}`, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Bot', value: user.bot ? 'Yes' : 'No', inline: true },
                { name: 'Created At', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:D>`, inline: true },
                { name: 'Joined Server', value: member.joinedAt ? `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:D>` : 'Unknown', inline: true },
                { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', '), inline: false }
            )
            .setColor('#00AAFF');

        await message.reply({ embeds: [embed] });
    }
};
