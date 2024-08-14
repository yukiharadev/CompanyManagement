const {company, member, leader} = require("../models/company.model");
const {findAllCompany, findCompanyById, searchCompany, findAndDeleteCompany,findCompanyByTradingPlatform} = require("../models/repositories/company.repo");
const {BadRequestError} = require("../core/error.response");

class CompanyFactory {
    static async createCompany(payload) {
        return new Leader(payload).createCompany();
    }

    //HTTP GET
    static async getAllCompany({limit= 30, page = 1, select =[ 'company_name', 'company_email', 'company_logo']}) {
        return await findAllCompany({limit, page, select});
    }

    static async getCompanyById({companyId}) {
        return await findCompanyById({companyId , unSelect: ['__v']});
    }

    static async searchCompany({keySearch}) {
        return await searchCompany({keySearch});
    }

    static async updateCompany({ companyId, payload }) {
        const updatedCompany = await new Company(payload).updateCompany(companyId, payload);

        if (payload.company_leader) {
            const companyData = await company.findById(companyId);
            if (!companyData) throw new BadRequestError("Company not found");

            const updatedLeader = await new Leader(payload).updateLeader(companyData.company_finance_code, payload.company_leader);
            if (!updatedLeader) throw new BadRequestError("Can not update leader");
        }

        return updatedCompany;
    }

    static async deleteCompany(companyId) {
        return await findAndDeleteCompany({companyId});

    }

    static async findCompanyByTradingPlatform({tradingPlatform}) {
        return await findCompanyByTradingPlatform({tradingPlatform});
    }

}

class Company {
    constructor({ company_name, company_email, company_logo, company_website, company_trading_platform, company_description, company_finance_code, company_leader }) {
        this.company_name = company_name;
        this.company_email = company_email;
        this.company_logo = company_logo;
        this.company_website = company_website;
        this.company_trading_platform= company_trading_platform;
        this.company_description = company_description;
        this.company_finance_code = company_finance_code;
        this.company_leader = company_leader;
    }
    async createCompany() {
        return company.create(this);
    }


    async updateCompany(companyId, payload) {
        return company.findByIdAndUpdate(companyId, payload, { new: true });
    }

}

class Leader extends Company {
    async createCompany() {
        const findLeader = await leader.findOne({leader_email: this.company_leader.leader_email, leader_name: this.company_leader.leader_name});
        if (findLeader) {
            await leader.updateOne(
                { leader_email: this.company_leader.leader_email, leader_name: this.company_leader.leader_name },
                { $addToSet: { leader_company: this.company_finance_code } }
            );
        } else {
            const newLeader = await leader.create({ ...this.company_leader, leader_company: [this.company_finance_code] });
            if (!newLeader) throw new Error("Can not create leader");
        }

        return await super.createCompany();
    }

    async updateLeader(companyFinanceCode, leaderPayload) {
        const currentLeader = await leader.findOne({ leader_company: { $in: [companyFinanceCode] } });

        let updatedLeader;
        if (currentLeader && (currentLeader.leader_email !== leaderPayload.leader_email || currentLeader.leader_name !== leaderPayload.leader_name)) {
            updatedLeader = await leader.findOneAndUpdate(
                { leader_email: leaderPayload.leader_email, leader_name: leaderPayload.leader_name },
                { $addToSet: { leader_company: companyFinanceCode } },
                { new: true, upsert: true }
            );
            await currentLeader.updateOne({ $pull: { leader_company: companyFinanceCode } });
        } else {
            updatedLeader = await leader.findOneAndUpdate(
                { leader_email: leaderPayload.leader_email, leader_name: leaderPayload.leader_name },
                { $addToSet: { leader_company: [companyFinanceCode] }, ...leaderPayload },
                { new: true }
            );
        }
        await updatedLeader.save();
        return updatedLeader;
    }
}

module.exports = CompanyFactory;

