const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Company';
const COLLECTION_NAME = 'Companies';

const companySchema = new Schema({
    company_name: { type: String, required: true },
    company_email: { type: String, required: true },
    company_logo: { type: String, required: true },
    company_website: { type: String, required: true },
    company_description: { type: String, required: true },
    company_trading_platform: { type: String, required: true },
    company_finance_code: {type:String, required: true},
    company_leader:{type:Schema.Types.Mixed, required: true},
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

companySchema.index({ company_name: "text", company_finance_code: "text", company_trading_platform: "text" });

const leaderSchema = new Schema({
    leader_name: { type: String, required: true },
    leader_email: { type: String, required: true },
    leader_company: { type: [String], default: [] }
}, {
    timestamps: true,
    collection: 'Leaders'
});

leaderSchema.index({ leader_name:"text" , leader_email: "text" });

const financeReportSchema = new Schema({
    finance_company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    finance_type: { type: String, enum:["Báo cáo tài chính","Bản cáo bạch & BCTN","Nghị quyết","Báo cáo quản trị"], required: true },
    finance_report_data: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'FinanceReports'
});

financeReportSchema.index({ finance_type: "text" });

module.exports = {
    company: model(DOCUMENT_NAME, companySchema),
    financeReport: model('FinanceReports', financeReportSchema),
    leader: model('Leaders', leaderSchema),
};
