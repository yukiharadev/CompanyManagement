const app = require('./src/app');

const PORT = process.env.PORT || 3020;

const  server =app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});