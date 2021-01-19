import {container} from "tsyringe";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "@shared/container/providers/StorageProvider/implementations/DiskStorageProvider";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import EtherealMailPRovider from "@shared/container/providers/MailProvider/implementations/EtherealMailPRovider";
import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";
container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider', container.resolve(EtherealMailPRovider),
);
