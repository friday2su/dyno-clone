module.exports = {
    data: {
        name: 'kick',
        description: 'Kick a member from the server',
        category: 'moderation',
        usage: '?kick @user [reason]',
        permissions: ['KickMembers']
    },
    async execute(message, args, client) {
        // Check if the user has permission to kick members
        if (!message.member.permissions.has('KickMembers')) {
            return message.reply('You do not have permission to kick members!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to kick!');
        }

        // Check if the bot can kick the member
        if (!member.kickable) {
            return message.reply('I cannot kick this member! They may have higher permissions than me.');
        }

        // Get the reason
        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            await member.kick(reason);
            await message.reply(`Successfully kicked ${member.user.tag} for: ${reason}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to kick this member!');
        }
    }
};
