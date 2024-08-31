import ticketRepository from "../persistence/mongoDB/ticket.repository.js";
import { v4 as uuidv4 } from 'uuid';
import { respTicketDto } from "../dto/ticket.dto.js";

const createTicket = async (userEmail, totalCart) => {
    if (typeof userEmail !== 'string' || !userEmail.includes('@')) {
        throw new Error('Invalid email address.');
    }

    if (typeof totalCart !== 'number' || totalCart <= 0) {
        throw new Error('Invalid total cart amount.');
    }

    const newTicket = {
        amount: totalCart,
        purchaser: userEmail,
        code: uuidv4().split('-')[0]  // Genera un UUID único
    };

    try {
        const ticket = await ticketRepository.create(newTicket);
        const ticketResponse = respTicketDto(ticket);
        return ticketResponse;
        //return ticket

    } catch (error) {
        console.log(error)
        throw new Error(`Failed to create ticket: ${error.message}`);
    }

};

export default { createTicket };
