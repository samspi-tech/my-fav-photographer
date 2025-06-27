const calcSkipPages = (page, pageSize) => (page - 1) * pageSize;

const calcTotalPages = (total, pageSize) => Math.ceil(total / pageSize);

module.exports = {
    calcSkipPages,
    calcTotalPages,
};
