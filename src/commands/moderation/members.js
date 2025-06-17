module.exports = {
    data: {
        name: 'members',
        description: 'Display server member statistics',
        category: 'moderation',
        usage: '?members',
        permissions: ['ViewGuildInsights']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ViewGuildInsights')) {
            return message.reply('You do not have permission to view member statistics!');
        }

        try {
            const totalMembers = message.guild.memberCount;
            const onlineMembers = message.guild.members.cache.filter(m => m.presence?.status === 'online').size;
            const offlineMembers = totalMembers - onlineMembers;

            await message.reply(`Server Members:\nTotal: ${totalMembers}\nOnline: ${onlineMembers}\nOffline: ${offlineMembers}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to fetch member statistics!');
        }
    }
};
