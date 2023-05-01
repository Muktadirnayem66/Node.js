const collection = require('./tickets')

exports.sellSingleTicket = (req,res)=>{
const {username,price} = req.body
const ticket = collection.create(username,price)
res.status(201).json({message:"Ticket created successfully", ticket})

}

exports.sellBulkTickets = (req, res)=>{
    const {username,price,quantity} = req.body
    const tickets = collection.bulkCreate(username,price,quantity)
    res.status(201).json({message:"Tickets created successfully", tickets})

}

exports.findAll =(_req,res)=>{
    const tickets = collection.find()
    console.log(tickets);
    res.status(200).json({item: tickets, total: tickets.length})
}

exports.findById=(req,res)=>{
    const id = req.params.id
    const ticket = collection.findById(id)
    if(!ticket){
      return  res.status(404).json({message:"404 Not Found"})
    }
    res.status(200).json({message:ticket})
}

exports.findByUsername = (req,res)=>{
    const username = req.params.username
    const ticket = collection.findByUserName(username)
    res.status(200).json({item: ticket, total: ticket.length})
}


//ticket update controller

exports.updateById=(req,res)=>{
    const id = req.params.id
    const ticket = collection.updateById(id, req.body)
    if(!ticket){
        return res.status(404).json({message:"404 Not Found"})
    }
    res.status(200).json({message:ticket})

}


exports.updateByUsername = (req,res)=>{
    const username = req.params.username
    const ticket = collection.bulkUpdate(username, req.body)
    res.status(200).json({item: ticket, total: ticket.length})
}


exports.deleteById = (req,res)=>{
    const id = req.params.id
    const isDelete = collection.deleteById(id)
    if(isDelete){
      return  res.status(204).send()
    }
    res.status(404).json({message:'delete operation failed'})

    
}


exports.deleteByUsername=(req,res)=>{
    const username = req.params.username
    collection.bulkDelete(username)
    res.status(204).send()
}

exports.drawWinners = (req,res)=>{
    const wc = req.query.wc ?? 3
    const winners = collection.draw(wc)
    res.status(200).json({message:winners})

}