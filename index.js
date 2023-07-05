import auth from './authentication.js';
import { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } from 'discord.js';
import moment from 'moment-timezone';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

console.log(`Aplicação: BOT-DISCORD-ANNOUNCEMENT\nDesenvolvedor: Lucas Fraporti\nDiscord: letuga.#0\nGithub: https://github.com/lucasfraporti`);
client.on('ready', async () => {
    console.log(`[${moment().tz(auth.timezone).format("DD/MM/YYYY")} - ${moment().tz(auth.timezone).format("HH:mm:ss")}] ${client.user.tag} configurado e pronto para uso!`);
    const readyEmbed = new EmbedBuilder({
        color: 0x1e1f22,
        title: ' Envie um(ns) comunicado(s)',
        author: {
            name: 'Comunicado - FiveM Bot',
            icon_url: client.user.displayAvatarURL({ dynamic: true }),
            url: 'https://discord.gg/3Jb9vaP5tn'
        },
        description: `\`\`\`Clique no botão para realizar o envio do seu comunicado\`\`\``,
        footer: {
            icon_url: 'https://cdn.discordapp.com/avatars/366389243796520980/c6053e358f12e7986a103b87ee29e9b3.png',
            text: 'Desenvolvido por letuga.#0',
        }
    });
    await client.channels.cache.get(auth.id_c_msg).send({
        embeds: [
            readyEmbed
        ],
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId('announcementButton').setLabel('Comunicar').setStyle(ButtonStyle.Primary),
            )
        ],
    });
});

client.on('interactionCreate', async (interaction) => {
    const comunicateAll = async () => {
        try {
            if (interaction.isButton()) {
                const myModal = new ModalBuilder({
                    customId: 'comunicate',
                    title: 'Comunique os(as) usuários(as)'
                });
                const channelID = new TextInputBuilder({
                    customId: 'channelID',
                    label: 'Informe o Discord ID do canal',
                    style: TextInputStyle.Short,
                    required: true,
                    placeholder: 'Discord ID do canal onde será enviado o comunicado',
                });
                const announcement = new TextInputBuilder({
                    customId: 'announcement',
                    label: 'Digite o comunicado',
                    style: TextInputStyle.Paragraph,
                    required: true
                });
                const channelIDInput = new ActionRowBuilder().addComponents(channelID);
                const announcementInput = new ActionRowBuilder().addComponents(announcement);
                myModal.addComponents(channelIDInput, announcementInput);
                await interaction.showModal(myModal);
            } else if (interaction.isModalSubmit()) {
                if (interaction.customId === 'comunicate') {
                    const channelIDResponse = interaction.fields.getTextInputValue('channelID');
                    const announcementResponse = interaction.fields.getTextInputValue('announcement');
                    const isChannelValid = async (x) => {
                        try {
                            const channel = await client.channels.fetch(x);
                            if (channel) {
                                const successUserEmbed = new EmbedBuilder({
                                    color: 0x1e1f22,
                                    title: ' Comunicado enviado com sucesso',
                                    fields: [
                                        {
                                            name: 'Enviado por',
                                            value: `<@${interaction.user.id}>`
                                        }
                                    ],
                                    footer: {
                                        icon_url: 'https://cdn.discordapp.com/avatars/366389243796520980/c6053e358f12e7986a103b87ee29e9b3.png',
                                        text: 'Desenvolvido por letuga.#0',
                                    }
                                });
                                await interaction.reply({ embeds: [successUserEmbed], ephemeral: true }).then(setTimeout(() => interaction.deleteReply(), 13500));
                                const successEmbed = new EmbedBuilder({
                                    color: 0x1e1f22,
                                    title: ' Novo comunicado!',
                                    fields: [
                                        { name: 'Enviado por', value: `<@${interaction.user.id}>`, inline: false },
                                        { name: 'Comunicado', value: `\`\`\`${announcementResponse}\`\`\``, inline: false }
                                    ],
                                    footer: {
                                        icon_url: 'https://cdn.discordapp.com/avatars/366389243796520980/c6053e358f12e7986a103b87ee29e9b3.png',
                                        text: 'Desenvolvido por letuga.#0',
                                    },
                                    timestamp: moment().tz(auth.timezone).format("MM/DD/YYYY HH:mm:ss")
                                });
                                await client.channels.cache.get(channelIDResponse).send({ embeds: [successEmbed] });
                                return true;
                            };
                        } catch {
                            const attentionEmbed = new EmbedBuilder({
                                color: 0x1e1f22,
                                description: `\`O Discord ID inserido está inválido!\``,
                                footer: {
                                    icon_url: 'https://cdn.discordapp.com/avatars/366389243796520980/c6053e358f12e7986a103b87ee29e9b3.png',
                                    text: 'Desenvolvido por letuga.#0',
                                }
                            });
                            await interaction.reply({ embeds: [attentionEmbed], ephemeral: true }).then(setTimeout(() => interaction.deleteReply(), 10000));
                        };
                        return false;
                    };
                    isChannelValid(channelIDResponse);
                };
            };
        } catch (error) {
            await interaction.reply(`<@${interaction.user.id}>, houve algum __problema técnico__ comigo.\nPor favor, __entre em contato com o meu suporte__.\n*O(a) usuário(a) não foi advertido*.`)
                .then(setTimeout(() => interaction.deleteReply(), 25000));
            console.error(error);
        };
    };
    comunicateAll();
});

client.login(auth.tokenDiscord);