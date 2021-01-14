import nodeMailer, {Transporter} from 'nodemailer';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";

export default class EtherealMailPRovider implements IMailProvider{
    private client: Transporter;

    constructor() {
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
    public async sendMail(to:string, body: string): Promise<void>{
        await this.client.sendMail({
            from: 'Fernando Cauper <fernando_cauper@hotmail.com>',
            to,
            subject: 'Teste',
            text: body,
        });
    }
}
