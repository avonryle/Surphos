import { GuildMember, MessageEmbed, User } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command<[
    GuildMember | null | User
]>({
    name: 'avatar',
    description: 'gets the avatar of an user.',
    args: [
        {
            name: 'member',
            type: 'TARGET'
        }
    ],
    execute: async function(message, [ target ]) {
        const member = target instanceof GuildMember ? target : message.member

        const user = target instanceof GuildMember ? target.user : target ?? message.author

        const embeds = new Array<MessageEmbed>()

        embeds.push(
            new MessageEmbed()
            .setTitle(`Here's ${user.username}'s global avatar`)
            .setTimestamp()
            .setImage(
                user.displayAvatarURL({ dynamic: true })
            )
        )

        if (member && member.avatar) {
            embeds.push(
                new MessageEmbed()
                .setTitle(`Here's ${user.username}'s server avatar`)
                .setTimestamp()
                .setImage(
                    member.displayAvatarURL({ dynamic: true })
                )
            )
        }

        message.channel.send({
            embeds
        })
    }
})