// fetchPage.js

import { Configuration, OpenAIApi } from "openai";
import homePage from "@/data/homePage";

const pages = {
    'home-page': homePage
}

const defaultLocale = 'en-US';

export default async function fetchPage(slug, locale) {
    if (locale === defaultLocale) return pages[slug];

    const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const translated = {};

    for (const k in pages[slug]) {
        const page = pages[slug];
        const string = "Translate the following to " + locale + ': ' + page[k];

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: string,
            max_tokens: 2048
        });

        const res = completion?.data?.choices[0]?.text;
        translated[k] = res;
    }

    return translated;
}
