import { intro,outro,text } from "@clack/prompts";
import { cli } from "cleye";


intro('Welcome to autoCommit');

const args = cli({
    name : "greet.js",
    parameters : [
        '<first name>',
        '[last_name]'
    ],

    flags : {
        time : {
            type : String,
            description : "Time of day to greet (morning or evening)",
            default : "morning"
        }
    }
})

const name  = [args._.firstName,args._.lastName].filter(Boolean).join(" ")

if (args.flags.time === 'morning') {
    console.log(`Good morning ${name}!`)
} else {
    console.log(`Good evening ${name}!`)
}

outro('to are all set')