import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import ISendMailDTO from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";

export default class FakeMailProvider implements IMailProvider{
    private messages: ISendMailDTO[] = [];

    public async sendMail(data: { subject: string; templateData: { template: string; variables: { name: string; link: string } }; to: { name: string; email: string } }): Promise<void>{
        this.messages.push(data);
    }
}
