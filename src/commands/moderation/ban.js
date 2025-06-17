module.exports = {
    data: {
        name: 'ban',
        description: 'Ban a member from the server',
        category: 'moderation',
        usage: '?ban @user [days] [reason]',
        permissions: ['BanMembers']
    },
    async execute(message, args, client) {
        // Check if the user has permission to ban members
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('You do not have permission to ban members!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to ban!');
        }

        // Check if the bot can ban the member
        if (!member.bannable) {
            return message.reply('I cannot ban this member! They may have higher permissions than me.');
        }

        // Get the ban duration (in days) and reason
        const days = !isNaN(args[1]) ? parseInt(args[1]) : 0;
        const reason = args.slice(days ? 2 : 1).join(' ') || 'No reason provided';

        try {
            await member.ban({
                deleteMessageDays: days,
                reason: reason
            });
            await message.reply(`Successfully banned ${member.user.tag} for: ${reason}${days ? ` (Messages from last ${days} days deleted)` : ''}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to ban this member!');
        }
    }
};
