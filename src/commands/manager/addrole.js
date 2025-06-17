module.exports = {
    data: {
        name: 'addrole',
        description: 'Add a role to a user',
        category: 'manager',
        usage: '?addrole @user <role>',
        permissions: ['ManageRoles']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('You do not have permission to add roles!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to add a role.');
        }

        const roleName = args.slice(1).join(' ');
        if (!roleName) {
            return message.reply('Please specify a role name.');
        }

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());
        if (!role) {
            return message.reply('Role not found.');
        }

        try {
            await member.roles.add(role);
            await message.reply(`Added role ${role.name} to ${member.user.tag}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to add role.');
        }
    }
};
