import {randomUUID} from 'crypto'
export async function debugController(req, res){
    try{

        console.log(req.cookies.userId);
        if (!req.cookies.userId) {
            const userId = randomUUID();
            res.cookie('userId', userId);
        }

        return res.send('ok')
    } catch(e){
        return res.status(500).send('ok')
    }
}