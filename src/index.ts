import Discord from 'discord.js';

type ifIsEmbed<K extends boolean> = Discord.If<K, Discord.MessageEmbed, Discord.MessageOptions>;

export interface IGlobalEmbedOptions<STRING = undefined> {
    /**
     * Character which is between the emoji and the text
     * @example '|', '❌ | Error'
     */
    separator: string 

    /**
     * Global ephemeral
     */
    ephemeral?: boolean

    /**
     * Types of GlobalEmbed
     * @example { name: 'error', color: 'RED', emoji: '❌' }
     */
    types: { name: STRING | string, color: Discord.ColorResolvable, emoji?: string }[]
}

const defaultTypes = ['error', 'success', 'common', 'wait'] as const
export const defaultOptions: IGlobalEmbedOptions = {
    ephemeral: true,
    separator: ' | ',
    types: [
        {
            name: defaultTypes[0],
            color: '#ff1745',
            emoji: '❌'
        },
        {
            name: defaultTypes[1],
            color: '#34eb6b',
            emoji: '✅'
        },
        {
            name: defaultTypes[2],
            color: '#8c34eb',
        },
        {
            name: defaultTypes[3],
            color: '#b0b0b0',
            emoji: '⌚'
        }
    ]
}

export const EasyEmbed = class<STRING extends string = typeof defaultTypes[number]> {
    options: IGlobalEmbedOptions<STRING | undefined>;

    constructor(options?: IGlobalEmbedOptions<STRING>) {
        this.options = options || defaultOptions;
    }

    create(type: STRING, textOrEmbedOptions?: string | Discord.MessageEmbedOptions, options?: Omit<Discord.InteractionReplyOptions, 'embeds'>) {
        let result: Discord.MessageEmbed;

        const selectedType = this.options.types?.find(t => t.name === type);
        if(!selectedType) throw new Error("This Embed type not exist");

        const selectedSeparator = this.options.separator || defaultOptions.separator;

        if (typeof textOrEmbedOptions === 'string') {
            result = new Discord.MessageEmbed({
                title: `${selectedType?.emoji}${selectedSeparator}${textOrEmbedOptions.length > 40 
                    ? selectedType?.name 
                    : textOrEmbedOptions
                }`,
                description: textOrEmbedOptions.length > 40 
                    ? `${selectedType?.emoji}${selectedSeparator}${textOrEmbedOptions}` 
                    : undefined,
                color: selectedType?.color
            });
        } else {
            const embed = new Discord.MessageEmbed(textOrEmbedOptions);
            embed.setTitle(`${selectedType?.emoji}${selectedSeparator}${textOrEmbedOptions?.title && textOrEmbedOptions?.title.length > 40 
                ? selectedType?.name 
                : textOrEmbedOptions
            }`);
            embed.setColor(<Discord.ColorResolvable>selectedType?.color);
    
            result = embed;
        }
    
        return { embeds: [result], ...options };
    }
}

export default EasyEmbed;