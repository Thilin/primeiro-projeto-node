import nodeMailer, {Transporter} from 'nodemailer';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import ISendMailDTO from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";
import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";
import {inject, injectable} from "tsyringe";

@injectable()
export default class EtherealMailPRovider implements IMailProvider{
    private client: Transporter;

    constructor(

        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        nodeMailer.createTestAccount().then(account =>{
            const transporter = nodeMailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
        });

    }
    public async sendMail(data: { subject: string; templateData: { template: string; variables: { name: string; link: string } }; to: { name: string; email: string } }): Promise<void>{
        await this.client.sendMail({
            from:{
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || 'equipe@gobarber.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}
