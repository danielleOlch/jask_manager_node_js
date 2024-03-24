/*
Route: GET '/'
Functionality: Fetches all users.
Returns: Returns a JSON array containing all users.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during database operation.
*/
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: GET '/:id'
Functionality: Fetches a user by ID.
Returns: Returns a JSON object containing the user with the given ID.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during database operation.
*/
router.get('/:id', async (req, res) => {
    try {
        const givenID = req.params.id;
        const wantedUser = await User.findById(givenID);
        res.json(wantedUser);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: GET '/email/:email'
Functionality: Fetches a user by email.
Returns: Returns a JSON object containing the user with the given email.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during database operation.
*/
router.get('/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: POST '/'
Functionality: Creates a new user.
Returns: Sends a status code 201 (Created) upon successful creation.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during user creation or password hashing.
*/
router.post('/', async (req, res) => {
    try {
        const givenPass = req.body.password;
        const hashedPass = await bcrypt.hash(givenPass, 10);

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        };

        await User.create(newUser);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: POST '/login'
Functionality: Logs in a user by checking email and password.
Returns: Returns a JWT token upon successful login.
Error Handling: Sends status codes 400 (Bad Request) or 401 (Unauthorized) for invalid email or password respectively. Sends status code 500 (Internal Server Error) for other errors.
*/
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).send('Unknown email');

        const hashedSaltedPass = user.password;
        const givenPass = req.body.password;

        if (await bcrypt.compare(givenPass, hashedSaltedPass)) {
            const token = jwt.sign({ name: user.name }, '123');
            res.json({ token });
        } else {
            res.status(401).send('Not allowed');
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: POST '/whoami'
Functionality: Fetches the name of the user based on the JWT token provided.
Returns: Returns the name of the user.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during token decoding or retrieval of user name.
*/
router.post('/whoami', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 

        console.log(token);
        const user = jwt.verify(token, '123');
        console.log(user);
        res.send(user.name);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: DELETE '/:id'
Functionality: Deletes a user by ID.
Returns: Sends a message indicating the deletion of the user.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during database operation.
*/
router.delete('/:id', async (req, res) => {
    try {
        const givenID = req.params.id;
        await User.findByIdAndDelete(givenID);
        res.send(`User with id ${givenID} was deleted`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: DELETE '/email/:email'
Functionality: Deletes a user by email.
Returns: Sends a message indicating the deletion of the user.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during database operation.
*/
router.delete('/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        await User.findOneAndDelete({ email });
        res.send(`User with email ${email} was deleted`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: PUT '/:id'
Functionality: Updates a user by ID.
Returns: Sends a message indicating the user update.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during database operation.
*/
router.put('/:id', async (req, res) => {
    try {
        const givenID = req.params.id;
        const updatedUser = req.body;
        await User.findByIdAndUpdate(givenID, updatedUser, { new: true });
        res.send(`User with id ${givenID} was updated`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

/*
Route: PUT '/email/:email'
Functionality: Updates a user by email.
Returns: Sends a message indicating the user update.
Error Handling: Sends a status code 500 (Internal Server Error) if an error occurs during database operation.
*/
router.put('/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updatedUser = req.body;
        await User.findOneAndUpdate({ email }, updatedUser, { new: true });
        res.send(`User with email ${email} was updated`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;
