
import { NextFunction, Request, Response } from "express";
import Url from "../db";
import path from 'path';

// - @GET - /url get all urls and alias 

export let GetUrl = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const uri: any = await Url.find().sort('-createdAt').lean()
        res.render('page/Urls', { uri })

    } catch (err) {
        
        console.error(err)
        res.render('err/500')
    }
   
}

// - @GET - /home make a new url with auto generated alias

export let GetHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.sendFile(path.join(__dirname + '../../../views/page/Home.html'))
        // if url doesnt follow format of https://google.com and is instead google.com .
        //return error through joi

    } catch (err) {

        console.error(err)
        res.sendFile(path.join(__dirname + '../../../views/err/500.html'))
    }
   
}
// -@POST -/ post a new alias and get a new url
export let PostUrl = async (req: Request, res: Response, next: NextFunction) => {



    try {
        let uri: any = await Url.create(req.body)
        res.render('page/Created', { uri })
        
    } catch (err ) {
        res.render('err/400C', { 
            error : err
         })
        console.error(err)
   }
}
// -@GET -/:alias get a url by alias
export let GetUrlALias = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let url: any = await Url.findOne({ alias: req.params.alias });

        if (!url) {
            res.sendFile(path.join(__dirname + '../../../views/err/404.html'))

        } else {
             const suburi: any = url.url 
                res.redirect(suburi)
            // res.send(url)
         }
    } catch (err) {
        console.error(err)
        res.sendFile(path.join(__dirname + '../../../views/err/500.html'))

    }

}

// // -@PUT -/:alias get a url by id and update it by { the url } 
// export let PutUrlAlias = async (req: Request, res: Response) => {
//     try {

//         let url: any = await Url.findOneAndUpdate({ alias: req.params.alias} ,
//             { url: req.body.url , name: req.body.name }, { new: true } );
//         if (!url) {
//             res.status(404).send('There is no url with the given alias')
//         } else {
//             res.send(url)
//             // const suburi: any = url.url 
//             // res.redirect(suburi)
//         }
    
//     } catch (err: any) {
//         console.error(err)
//         // err.details[0].message
//         res.status(500).send(err)
//     }
// }

// // -@DELETE -/:alias delete a url by alias 
// export let DeleteUrlAlias = async (req: Request, res: Response) => {
//     try {
//         let url: any = await Url.findOneAndDelete({ alias: req.params.alias})

//         if (!url) {
//             res.status(404).send('The movie with the given alais was not found...');
//         } else {
//         res.send(url)
//         }
//     } catch (err) {
//         console.error(err)
//         res.status(500).send(err)
//     }
// }