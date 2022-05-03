import EasyEmbed from "../lib";

const createEmbed = new EasyEmbed({
    separator: '-',
    types: [
        {
            name: "erro",
            color: "#ff1745",
        }
    ]
}).create;

const a = createEmbed('erro', {
    description: 'teste'
});
console.log(a)