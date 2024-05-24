const express=require('express');
const emailRoutes=require('./emailRoutes');
const app = express()
app.use('/api/email',emailRoutes);
