import express from "express";
import {ILink} from "../types";
import { nanoid } from 'nanoid';

const linkRouter = express.Router();

import Link from "../models/Link";

linkRouter.get('/:shortURL', async (req, res, next) => {
    const shortURL = req.params.shortURL;

    if (!req.params.shortURL) {
        res.status(404).send('URL not found');
    }

    try {
        const link = await Link.findOne({ shortURL: shortURL });

        if (!link) {
            res.status(404).send('URL not found');
        } else {
            res.status(301).redirect(link.originalURL);
        }

    } catch (e) {
        next(e);
    }
});

linkRouter.post('/links',  async (req, res, next) => {
    const originalURL = req.body.originalURL;

    if (!originalURL) {
        res.status(400).send({error: 'Please send a URL!'});
        return;
    }

    let shortURL = nanoid(7);
    let sameShortLink = await Link.findOne({shortURL});

    while (sameShortLink) {
        shortURL = nanoid(7);
        sameShortLink = await Link.findOne({ shortURL });
    }

    const newLink: ILink = {
        originalURL: req.body.originalURL,
        shortURL: shortURL,
    };

    try {
        const link = new Link(newLink);
        await link.save();
        res.send(link);
    } catch (e) {
        next(e);
    }
});

export default linkRouter;
