import axios from "axios";
import {XMLParser} from "fast-xml-parser";


const options = {ignoreAttributes: false};
const parser = new XMLParser(options);

axios
    .get(process.env.PODCAST_RSS_URL)
    .then(value => {
        parseRss(value.data)
    });

function parseRss(rss) {
    let response = parser.parse(rss).rss;


    let resp = response.channel.item.map(item => {
        return {
            title: item.title,
            season: item["itunes:season"],
            episode: item["itunes:episode"],
            recording_sourse: item.enclosure["@_url"],
            links: [
                {
                    type: "mave",
                    value: item.link
                }
            ],
            timings: getTimestamps(item["itunes:summary"])
        }
    })

    console.log(resp);
}

function getTimestamps(summary) {
    const regex = /([0-9]{1,2}:[0-9]{1,2}) - (.*)\n/gm;
    let rez = []

    let m;
    while ((m = regex.exec(summary)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        rez.push(
            {
                time: m[1],
                description: m[2]
            });
    }

    return rez;
}