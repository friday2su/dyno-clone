module.exports = {
    data: {
        name: 'rolecolor',
        description: 'Change the color of a role',
        category: 'manager',
        usage: '?rolecolor <role> <color>',
        permissions: ['ManageRoles']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('You do not have permission to change role colors!');
        }

        const roleName = args[0];
        const color = args[1];

        if (!roleName || !color) {
            return message.reply('Usage: ?rolecolor <role> <color>');
        }

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());
        if (!role) {
            return message.reply('Role not found.');
        }

        try {
            await role.setColor(color);
            await message.reply(`Changed color of role ${role.name} to ${color}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to change role color. Make sure the color is valid.');
        }
    }
};
