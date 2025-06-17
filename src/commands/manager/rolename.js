module.exports = {
    data: {
        name: 'rolename',
        description: 'Change the name of a role',
        category: 'manager',
        usage: '?rolename <role> <new_name>',
        permissions: ['ManageRoles']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('You do not have permission to change role names!');
        }

        const roleName = args[0];
        const newName = args.slice(1).join(' ');

        if (!roleName || !newName) {
            return message.reply('Usage: ?rolename <role> <new_name>');
        }

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());
        if (!role) {
            return message.reply('Role not found.');
        }

        try {
            await role.setName(newName);
            await message.reply(`Changed role name from ${roleName} to ${newName}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to change role name.');
        }
    }
};
