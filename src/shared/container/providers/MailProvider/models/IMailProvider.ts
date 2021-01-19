import ISendMailDTO from "@shared/container/providers/MailProvider/dtos/ISendMailDTO";
export default interface IMailProvider{
    sendMail(data: { subject: string; templateData: { template: string; variables: { name: string; link: string } }; to: { name: string; email: string } }): Promise<void>;
}
