module.exports = {
    data: {
        name: 'timeout',
        description: 'Timeout (mute) a member for a specified duration',
        category: 'moderation',
        usage: '?timeout @user [duration] [reason]',
        aliases: ['mute'],
        permissions: ['ModerateMembers']
    },
    async execute(message, args, client) {
        // Check if the user has permission to moderate members
        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply('You do not have permission to timeout members!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a member to timeout!');
        }

        // Check if the bot can timeout the member
        if (!member.moderatable) {
            return message.reply('I cannot timeout this member! They may have higher permissions than me.');
        }

        // Parse duration (default: 5 minutes)
        let duration = 5 * 60 * 1000; // 5 minutes in milliseconds
        if (args[1]) {
            const time = parseInt(args[1]);
            const unit = args[1].match(/[a-z]/i)?.[0]?.toLowerCase();
            
            if (!isNaN(time) && unit) {
                switch(unit) {
                    case 's': duration = time * 1000; break;
                    case 'm': duration = time * 60 * 1000; break;
                    case 'h': duration = time * 60 * 60 * 1000; break;
                    case 'd': duration = time * 24 * 60 * 60 * 1000; break;
                    default: return message.reply('Invalid duration format! Use s/m/h/d (e.g., 10m for 10 minutes)');
                }
            } else {
                return message.reply('Invalid duration format! Use s/m/h/d (e.g., 10m for 10 minutes)');
            }
        }

        // Get the reason
        const reason = args.slice(2).join(' ') || 'No reason provided';

        try {
            await member.timeout(duration, reason);
            
            // Convert duration to human-readable format
            const durationText = duration >= 86400000 ? `${duration / 86400000}d` :
                               duration >= 3600000 ? `${duration / 3600000}h` :
                               duration >= 60000 ? `${duration / 60000}m` :
                               `${duration / 1000}s`;

            await message.reply(
                `Successfully timed out ${member.user.tag} for ${durationText}\nReason: ${reason}`
            );
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to timeout this member!');
        }
    }
};
