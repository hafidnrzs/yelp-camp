const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const unsplash = require('./unsplash');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            author: '66eef4dcdb690d452fafb6dd',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas rerum minima nam quod excepturi blanditiis reiciendis nemo atque enim similique, officiis quasi, quisquam quo, animi aspernatur fuga facilis? Qui, minus!',
            price,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { type: 'Point', coordinates: [-113.13265, 47.020008] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbjrhgfzy/image/upload/v1727820611/YelpCamp/yfj5azxy7q0mb2x5ft7j.jpg',
                    filename: 'YelpCamp/yfj5azxy7q0mb2x5ft7j'
                },
                {
                    url: 'https://res.cloudinary.com/dbjrhgfzy/image/upload/v1727821704/YelpCamp/tknvu9bfl5qfrlx4pvdc.jpg',
                    filename: 'YelpCamp/tknvu9bfl5qfrlx4pvdc.jpg'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});