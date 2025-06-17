module.exports = {
    data: {
        name: 'inviteinfo',
        description: 'Get information about an invite link',
        category: 'misc',
        usage: '?inviteinfo <invite_code>'
    },
    async execute(message, args, client) {
        if (!args[0]) {
            return message.reply('Please provide an invite code!');
        }

        try {
            const invite = await client.fetchInvite(args[0]);
            await message.reply(
                `Invite Info:\nGuild: ${invite.guild.name}\nChannel: ${invite.channel.name}\nInviter: ${invite.inviter ? invite.inviter.tag : 'Unknown'}\nUses: ${invite.uses || 'Unknown'}`
            );
        } catch (error) {
            console.error(error);
            message.reply('Invalid invite code or unable to fetch invite info.');
        }
    }
};
