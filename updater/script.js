import axios from "axios";
import {XMLParser} from "fast-xml-parser";
import fs from "fs";

const options = {ignoreAttributes: false};
const parser = new XMLParser(options);

axios
    .get(process.env.PODCAST_RSS_URL)
    .then(value => {
        const result = parseRss(value.data)
        fs.writeFileSync("../src/app/constants/PodcastData.json", JSON.stringify(result, null, 4));
    });

function parseRss(rss) {
    return parser
        .parse(rss)
        .rss
        .channel
        .item
        .map(item => {
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
}

function getTimestamps(summary) {
    const regex = /([0-9]{1,2}:[0-9]{1,2}) - (.*)\n/gm;
    let typestamps = []

    let m;
    while ((m = regex.exec(summary)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        typestamps.push({time: m[1], description: m[2]});
    }
    return typestamps;
}