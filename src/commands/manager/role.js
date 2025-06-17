module.exports = {
    data: {
        name: 'role',
        description: 'Assign or remove a role from a user',
        category: 'manager',
        usage: '?role @user <role>',
        permissions: ['ManageRoles']
    },
    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('You do not have permission to manage roles!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user.');
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
            if (member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
                await message.reply(`Removed role ${role.name} from ${member.user.tag}`);
            } else {
                await member.roles.add(role);
                await message.reply(`Added role ${role.name} to ${member.user.tag}`);
            }
        } catch (error) {
            console.error(error);
            message.reply('Failed to manage role.');
        }
    }
};
