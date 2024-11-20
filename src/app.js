import express from 'express';
import customerRoutes from './routes/customer.routes.js';
class App {

 constructor(port) {
        this.app = express();
        this.port = port;
    }

 listen(){

        this.app.use(express.json());
        this.app.use('/api/customers', customerRoutes);

        this.app.listen(this.port, () => {
            console.log(`Server started at http://localhost:${this.port}`);
        });
    }
}

export default App;