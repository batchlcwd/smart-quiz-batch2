const errorHandler = (fn) => {
    console.log("errorHandler");
    return (req, res, next) => {
        fn(req, res, next).catch(next); // Automatically catches rejected promises
    };
};

export default errorHandler