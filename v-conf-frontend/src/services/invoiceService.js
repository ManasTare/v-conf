import api from './api';

export const invoiceService = {
    // POST /api/invoice/confirm
    // DTO: { userId: Integer, modelId: Integer, qty: Integer, customerDetail: String }
    confirmOrder: async (invoiceRequestDTO) => {
        const response = await api.post('/invoice/confirm', invoiceRequestDTO);
        return response.data;
    }
};
