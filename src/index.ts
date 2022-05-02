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
    static options: IGlobalEmbedOptions<any> = defaultOptions;

    constructor(options?: IGlobalEmbedOptions<STRING>) {
        if(options) EasyEmbed.options = options;
    }

    create(type: STRING, textOrEmbedOptions: string | Discord.MessageEmbedOptions, options?: Omit<Discord.InteractionReplyOptions, 'embeds'>) {
        const selectedEmbedType = EasyEmbed.options.types?.find(t => t.name === type);
        if(!selectedEmbedType) throw new Error("This Embed type not exist");

        let result: Discord.MessageEmbedOptions = {}
        
        const selectedSeparator = EasyEmbed.options.separator || defaultOptions.separator;

        if (typeof textOrEmbedOptions === 'string') {
            if(!selectedEmbedType.emoji) {
                if(textOrEmbedOptions.length < 1) return;

                result.title = textOrEmbedOptions;
            } else {
                result.title = `${selectedEmbedType.emoji}${selectedSeparator}${textOrEmbedOptions}`;
            }
            
            result.color = selectedEmbedType.color;
        } else {
            const embed: Discord.MessageEmbedOptions = {
                author: textOrEmbedOptions.author,
                color: selectedEmbedType.color,
                description: textOrEmbedOptions.description,
                fields: textOrEmbedOptions.fields,
                footer: textOrEmbedOptions.footer,
                image: textOrEmbedOptions.image,
                thumbnail: textOrEmbedOptions.thumbnail,
                timestamp: textOrEmbedOptions.timestamp,
                url: textOrEmbedOptions.url,
                video: textOrEmbedOptions.video,
            }
            
            if(!selectedEmbedType.emoji) {
                if(!textOrEmbedOptions.title || textOrEmbedOptions.title.length < 1) return;
                
                result.title = textOrEmbedOptions.title;
            } else {
                result.title = `${selectedEmbedType.emoji}${selectedSeparator}${textOrEmbedOptions}`;
            }

            result = { ...embed }
        }
    
        return { 
            embeds: [result], 
            ...options,
            ephemeral: options?.ephemeral ?? EasyEmbed.options.ephemeral
        };
    }
}

export default EasyEmbed;