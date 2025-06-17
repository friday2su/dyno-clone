const Warning = require('../../models/Warning');

module.exports = {
    data: {
        name: 'warn',
        description: 'Warn a member and store the warning in the database',
        category: 'moderation',
        usage: '?warn @user [reason]',
        permissions: ['ModerateMembers']
    },
    async execute(message, args, client) {
        // Check if the user has permission
        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply('You do not have permission to warn members!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to warn!');
        }

        // Get the reason
        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            // Create new warning
            const warning = new Warning({
                userId: member.id,
                guildId: message.guild.id,
                moderatorId: message.author.id,
                reason: reason
            });

            // Save to database
            await warning.save();

            // Get total warnings for this user
            const warningCount = await Warning.countDocuments({
                userId: member.id,
                guildId: message.guild.id
            });

            // Send confirmation
            await message.reply(
                `Successfully warned ${member.user.tag}\nReason: ${reason}\nThis user now has ${warningCount} warning${warningCount === 1 ? '' : 's'}.`
            );

            // DM the warned user
            try {
                await member.send(
                    `You have been warned in ${message.guild.name}\nReason: ${reason}\nThis is your warning #${warningCount}`
                );
            } catch (error) {
                message.channel.send("Could not DM the user about their warning.");
            }

        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to warn this member!');
        }
    }
};
