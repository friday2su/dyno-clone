module.exports = {
    data: {
        name: 'softban',
        description: 'Softban a member (ban and unban to delete messages)',
        category: 'moderation',
        usage: '?softban @user [reason]',
        permissions: ['BanMembers']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('You do not have permission to softban members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to softban!');
        }

        if (!member.bannable) {
            return message.reply('I cannot softban this member! They may have higher permissions than me.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            await member.ban({ reason });
            await message.guild.members.unban(member.id, 'Softban: unbanned immediately');
            await message.reply(`Successfully softbanned ${member.user.tag} for: ${reason}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to softban this member!');
        }
    }
};
