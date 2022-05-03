import EasyEmbed from "../lib";

const createEmbed = new EasyEmbed({
    separator: '-',
    types: [
        {
            name: "erro",
            color: "#ff1745",
            footer: { text: 'gay lussac' }
        }
    ]
}).create;

const a = createEmbed('erro', {
    description: 'teste'
});
console.log(a.embeds)