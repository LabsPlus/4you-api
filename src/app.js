import express from 'express';

class App{

 constructor(port) {
        this.app = express();
        this.port = port;
    }

 listen(){
        this.app.listen(this.port, () => {
            console.log(`Server started at http://localhost:${this.port}`);
        });
    }
}

export default App;