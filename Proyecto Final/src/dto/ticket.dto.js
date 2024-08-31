export const respTicketDto = (ticket) => {
    const fechaCompraFormateada = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(new Date(ticket.purchase_datetime));

    const totalFormateado = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(ticket.amount);

    return {
        codigo: ticket.code,
        fecha_compra: fechaCompraFormateada,
        total: totalFormateado,
        comprador: ticket.purchaser,
    };
};
