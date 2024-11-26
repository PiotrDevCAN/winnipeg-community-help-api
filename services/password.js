const bcrypt = require('bcrypt');

const saltRounds = 10;
const plainPassword = 'M1IHGcYiuj8Vg3eKm2G08kQqly_g2snkk_hFCzOgPvo';

const hashPassword = bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log(`Hashed password: ${hash}`);
    // Save `hash` to the database
    return hash;
});

module.exports = {
    hashPassword,
};