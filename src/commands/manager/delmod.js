module.exports = {
    data: {
        name: 'delmod',
        description: 'Remove the moderator role from a user',
        category: 'manager',
        usage: '?delmod @user',
        permissions: ['ManageRoles']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('You do not have permission to remove moderator roles!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to remove mod role.');
        }

        const modRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'moderator');
        if (!modRole) {
            return message.reply('Moderator role not found in this server.');
        }

        try {
            await member.roles.remove(modRole);
            await message.reply(`Removed moderator role from ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to remove moderator role.');
        }
    }
};
