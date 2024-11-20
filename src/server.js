import App from "./app.js";


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;
const app = new App(PORT);
app.listen();
