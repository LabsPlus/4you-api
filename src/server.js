import App from "./app";


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;
const app = new App(PORT);
app.listen();
