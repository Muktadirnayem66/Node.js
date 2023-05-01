const router = require('express').Router()

const {sellSingleTicket, sellBulkTickets, findAll, findById, findByUsername,
updateById, updateByUsername,
deleteById, deleteByUsername, drawWinners} = require('./controllers')


router.route('/t/:id').get(findById).put(updateById).delete(deleteById)

router.route('/u/:username').get(findByUsername).put(updateByUsername).delete(deleteByUsername)

router.post('/bulk', sellBulkTickets)
router.get('/draw', drawWinners)

router.route('/').get(findAll).post(sellSingleTicket)

module.exports = router