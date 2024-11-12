import express from 'express';

export class App{
    private app: express.Application;
    private port: number;

    constructor(port: number){
        this.app = express();
        this.port = port;
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`Server started at http://localhost:${this.port}`);
        });
    }
}