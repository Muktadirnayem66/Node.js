const Ticket = require('./Ticket')
const {readFile,writeFile} = require('./utils')

const tickets = Symbol('tickets')

class TicketCollection{
    constructor(){
        (async function(){
            this[tickets]= await readFile()
        }.call(this));
    }

    /**
     * create a new ticket for single user
     * @param {string} username 
     * @param {price} price 
     * @returns {Ticket}
     */

    create(username,price){
        const ticket = new Ticket(username,price);
        this[tickets].push(ticket)
        writeFile(this[tickets])
        return ticket
    }

    /**
     * 
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     */

  bulkCreate(username,price,quantity){
    let result = [];
    for(let i=0;i<quantity;i++){
        let ticket = this.create(username,price)
        result.push(ticket)

    }
    writeFile(this[tickets])
    return result

  }

    /**
     * return all the tickets
     * @returns {Ticket}
     */

    find(){
        return this[tickets]
    }

    /**
     * find a single ticket by a id
     * @param {string} id 
     * @returns {Ticket} 
     */

    findById(id){
        const ticket = this[tickets].find(
            /**
             * @param {Ticket} ticket
             */
            (ticket)=>ticket.id === id
        )
        return ticket

    }

    /**
     * find a user by their username
     * @param {string} userName 
     * @return {Ticket[]}
     */
    findByUserName(userName){
        const ticket = this[tickets].filter(
            /**
             * @param {Ticket} ticket
             */
            (ticket)=> ticket.username === userName
        )
        return ticket

    }
   
    /**
     * 
     * @param {string} ticketId 
     * @param {{username:string, price:number}} ticketBody 
     * @returns {Ticket}
     */

    updateById(ticketId, ticketBody){
        const ticket = this.findById(ticketId);
       if(ticket){
        ticket.username = ticketBody.username ?? ticket.username
        ticket.price = ticketBody.price ?? ticket.price

       }
       writeFile(this[tickets])
        return ticket
    }

    /**
     * 
     * @param {string} username 
     * @param {{username:string, price:number}} ticketBody 
     * @returns {Ticket[]}
     */
    bulkUpdate(username,ticketBody){
        let userTicket = this.findByUserName(username)
        const updatedTickets= userTicket.map(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => this.updateById(ticket.id, ticketBody)
        )
        writeFile(this[tickets])
        return updatedTickets
    }


/**
 * 
 * @param {string} ticketId 
 * @returns {boolean}
 */
    deleteById(ticketId){
        const index = this[tickets].findIndex(
            /**
             * @param {Ticket} ticket
             */
            (ticket)=> ticket.id === ticketId
        )
        if(index == -1){
            return false;
        }else{
            this[tickets].splice(index, 1)
            return true
        }

    
    }


    /**
     * 
     * @param {string} username 
     * @returns {boolean[]}
     */
    bulkDelete(username){
        const userTicket = this.findByUserName(username)
        const deletedResult = userTicket.map(
            /**
             * @param {Ticket} ticket
             */
            (ticket)=> this.deleteById(ticket.id)
        )
        return deletedResult

    }

    /**
     * 
     * @param {number} winnerCount 
     * @returns {Ticket[]}
     */
    draw(winnerCount){
        const winnerIndexes = new Array(winnerCount)

        let winnerIndex = 0
        while (winnerIndex<winnerCount) {
            let ticketIndex = Math.floor(Math.random() * this[tickets].length)
            if(!winnerIndexes.includes(ticketIndex)){
                winnerIndexes[winnerIndex++] = ticketIndex
                continue
            }
            
        }
        const winner = winnerIndexes.map(
            /**
             * @param {number} index
             */
            (index)=> this[tickets][index]
        )
        return winner

    }


}

const collection = new TicketCollection()

module.exports = collection

