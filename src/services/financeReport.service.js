'use strict';

const {financeReport} = require('../models/company.model')

class FinanceReportService {
    static async createFinanceReport(payload){
        const {finance_company, finance_type, finance_report_data} = payload;
        return await financeReport.create(payload);
    }


}