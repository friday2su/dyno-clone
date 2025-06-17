const Warning = require('../../models/Warning');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'warnings',
        description: 'View warnings for a user',
        category: 'moderation',
        usage: '?warnings @user',
        permissions: ['ModerateMembers']
    },
    async execute(message, args, client) {
        // Check if the user has permission
        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply('You do not have permission to view warnings!');
        }

        // Check if a user was mentioned
        const member = message.mentions.members.first() || message.member;

        try {
            // Get warnings from database
            const warnings = await Warning.find({
                userId: member.id,
                guildId: message.guild.id
            }).sort({ timestamp: -1 }); // Sort by newest first

            if (warnings.length === 0) {
                return message.reply(`${member.user.tag} has no warnings.`);
            }

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle(`Warnings for ${member.user.tag}`)
                .setColor('#FF4444')
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter({ 
                    text: `Total Warnings: ${warnings.length}`,
                    iconURL: message.guild.iconURL()
                });

            // Add warning entries
            warnings.slice(0, 10).forEach((warn, index) => {
                const moderator = message.guild.members.cache.get(warn.moderatorId);
                embed.addFields({
                    name: `Warning #${index + 1}`,
                    value: `**Reason:** ${warn.reason}\n**Moderator:** ${moderator ? moderator.user.tag : 'Unknown'}\n**Date:** <t:${Math.floor(warn.timestamp / 1000)}:R>`
                });
            });

            if (warnings.length > 10) {
                embed.addFields({
                    name: 'Note',
                    value: `Showing 10/${warnings.length} warnings. Use ?warnings @user to see more.`
                });
            }

            await message.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to fetch warnings!');
        }
    }
};
