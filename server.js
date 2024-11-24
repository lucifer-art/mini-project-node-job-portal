import app from './index.js';

/**
 * Starts the server and listens on the specified port.
 * 
 * @param {number} port - The port number on which the server will listen.
 * @param {Function} callback - A callback function that is executed once the server starts listening.
 * @returns {void} This function does not return a value.
 */
app.listen(3200, () => {
    console.log('Server is running on port 3200');
})