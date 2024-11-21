import express from 'express';
import customerRoutes from './routes/customer.routes.js';
import friendRoutes from './routes/friend.routes.js';

class App {

 constructor(port) {
        this.app = express();
        this.port = port;
    }

 listen(){

        this.app.use(express.json());
        this.app.use('/api/customers', customerRoutes);
        this.app.use('/api/friends', friendRoutes);

        this.app.listen(this.port, () => {
            console.log(`Server started at http://localhost:${this.port}`);
        });
    }
}

export default App;