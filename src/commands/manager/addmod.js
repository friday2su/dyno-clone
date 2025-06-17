module.exports = {
    data: {
        name: 'addmod',
        description: 'Add a moderator role to a user',
        category: 'manager',
        usage: '?addmod @user',
        permissions: ['ManageRoles']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('You do not have permission to add moderator roles!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to add mod role.');
        }

        const modRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'moderator');
        if (!modRole) {
            return message.reply('Moderator role not found in this server.');
        }

        try {
            await member.roles.add(modRole);
            await message.reply(`Added moderator role to ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to add moderator role.');
        }
    }
};
