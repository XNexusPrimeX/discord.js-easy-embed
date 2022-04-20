import { APIEmbed } from 'discord-api-types';
import Discord, { MessageEmbedOptions } from 'discord.js';

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
    types: (Omit<Discord.MessageEmbedOptions, 'title'> & {
        name: STRING | string, 
        color: Discord.ColorResolvable, 
        emoji?: string,
    })[]
}

const defaultTypes = ['error', 'success', 'common', 'wait'] as const
export const defaultOptions: IGlobalEmbedOptions = {
    ephemeral: true,
    separator: ' | ',
    types: [
        {
            name: defaultTypes[0],
            color: '#ff1745',
            emoji: '❌',
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

    create(type: STRING, textOrEmbedOptions: string | Discord.MessageEmbedOptions, options?: Omit<Discord.InteractionReplyOptions, 'embeds'>) {
        const selectedType = this.options.types?.find(t => t.name === type);
        if(!selectedType) throw new Error("This Embed type not exist");

        const { footer, color, author, description, fields, image, thumbnail, timestamp, url } = selectedType;
        let result: Discord.MessageEmbed = new Discord.MessageEmbed({
            footer, color, author, description, fields, image, thumbnail, timestamp, url
        });
        
        const selectedSeparator = this.options.separator || defaultOptions.separator;

        if (typeof textOrEmbedOptions === 'string') {
            result.setTitle(`${!selectedType.emoji
                ? textOrEmbedOptions
                : `${selectedType.emoji}${selectedSeparator}${textOrEmbedOptions}`
            }`);
            
            result.setColor(selectedType.color);
        } else {
            result.setTitle(`${!selectedType.emoji
                ? textOrEmbedOptions
                : `${selectedType.emoji}${selectedSeparator}${textOrEmbedOptions}`
            }`);
            result.setColor(<Discord.ColorResolvable>selectedType?.color);

            textOrEmbedOptions.footer?.text && result.setFooter({ 
                text: textOrEmbedOptions.footer?.text, 
                iconURL: textOrEmbedOptions.footer?.iconURL 
            });

            textOrEmbedOptions.author?.name && result.setAuthor({
                name: textOrEmbedOptions.author?.name,
                iconURL: textOrEmbedOptions.author?.iconURL,
                url: textOrEmbedOptions.author?.url
            });

            textOrEmbedOptions.description && result.setDescription(textOrEmbedOptions.description);

            textOrEmbedOptions.fields?.forEach(field => result.addField(field.name, field.value, field.inline));

            textOrEmbedOptions.image?.url && result.setImage(textOrEmbedOptions.image?.url);

            textOrEmbedOptions.thumbnail?.url && result.setThumbnail(textOrEmbedOptions.thumbnail?.url);

            textOrEmbedOptions.timestamp && result.setTimestamp(textOrEmbedOptions.timestamp);

            textOrEmbedOptions.url && result.setURL(textOrEmbedOptions.url);
        }
    
        return { 
            embeds: [result], 
            ...options,
            ephemeral: options?.ephemeral ?? this.options.ephemeral
        };
    }
}

export default EasyEmbed;