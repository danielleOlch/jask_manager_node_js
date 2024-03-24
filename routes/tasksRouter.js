/*
Route: GET '/'
Functionality: Fetches all tasks.
Returns: Returns a JSON array containing all tasks.
Error Handling: Forwards error to error handling middleware.
*/

router.get('/', async (req, res, next) => {
    try {
        const tasks = await tasksModel.find();
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
});

/*
Route: GET '/category/:category'
Functionality: Fetches tasks by category.
Returns: Returns a JSON array containing tasks of the specified category.
Error Handling: Forwards error to error handling middleware.
*/

router.get('/category/:category', async (req, res, next) => {
    try {
        const tasks = await tasksModel.find({ category: req.params.category });
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
});

/*
Route: GET '/:id'
Functionality: Fetches a task by ID.
Returns: Returns a JSON object containing the task with the specified ID.
Error Handling: Forwards error to error handling middleware.
*/

router.get('/:id', async (req, res, next) => {
    try {
        const task = await tasksModel.findById(req.params.id);
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
});

/*
Route: POST '/'
Functionality: Creates a new task.
Returns: Returns a JSON object containing the newly created task.
Error Handling: Forwards error to error handling middleware.
*/

router.post('/', async (req, res, next) => {
    try {
        const task = await tasksModel.create(req.body);
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
});

/*
Route: DELETE '/:id'
Functionality: Deletes a task by ID.
Returns: Returns a JSON object containing the result of the deletion operation.
Error Handling: Forwards error to error handling middleware.
*/

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await tasksModel.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

/*
Route: DELETE '/category/:category'
Functionality: Deletes tasks by category.
Returns: Returns a JSON object containing the result of the deletion operation.
Error Handling: Forwards error to error handling middleware.
*/

router.delete('/category/:category', async (req, res, next) => {
    try {
        const result = await tasksModel.deleteMany({ category: req.params.category });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

/*
Route: PUT '/:id'
Functionality: Updates a task by ID.
Returns: Returns a JSON object containing the updated task.
Error Handling: Forwards error to error handling middleware.
*/

router.put('/:id', async (req, res, next) => {
    try {
        const result = await tasksModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

/*
Route: PUT '/category/:category'
Functionality: Updates tasks by category.
Returns: Returns a JSON object containing the result of the update operation.
Error Handling: Forwards error to error handling middleware.
*/

router.put('/category/:category', async (req, res, next) => {
    try {
        const result = await tasksModel.updateMany({ category: req.params.category }, req.body);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

/*
Error handling middleware
Functionality: Handles errors occurred in route handlers.
Returns: Sends a status code 500 (Internal Server Error) with an error message.
*/

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

module.exports = router;
